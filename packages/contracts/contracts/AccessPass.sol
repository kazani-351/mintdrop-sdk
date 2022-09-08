// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

import "erc721a/contracts/ERC721A.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

import "./extensions/Metadata.sol";
import "./extensions/SignatureMintable.sol";
import "./extensions/Timing.sol";
import "./extensions/Payouts.sol";
import "./extensions/Royalties.sol";

import "./gen/Version.sol";

error ContractsCannotMint();
error ExceedsMaxSupply();
error ExceedsMaxPerWallet();
error InsufficientPayment();
error MintNotStarted();
error MintCompleted();
error PublicMintDisabled();

contract AccessPass is
  ERC721A,
  Royalties,
  SignatureMintable,
  Ownable,
  Pausable,
  Payouts,
  Metadata,
  Version
{
  uint256 public maxSupply; // 0 = no limit
  uint256 public maxPerWallet; // 0 = no limit

  MintConfig public mintConfig;

  struct MintConfig {
    uint256 mintPrice; // 0 = free
    uint64 startTime; // 0 = disabled
    uint64 endTime; // 0 = no ending time
  }

  struct AccessListConfig {
    address signer;
    uint256 mintPrice;
    uint64 startTime;
    uint256 maxPerWallet;
  }

  modifier requireValidCount(uint256 count) {
    if (maxSupply != 0 && _totalMinted() + count > maxSupply)
      revert ExceedsMaxSupply();
    _;
  }

  modifier noContracts() {
    if (msg.sender != tx.origin) revert ContractsCannotMint();
    _;
  }

  constructor(
    string memory name,
    string memory symbol,
    string memory baseTokenURI,
    uint256 _maxSupply,
    PayoutsConfig memory payouts,
    address payable beneficiary,
    uint96 bips,
    MintConfig memory _mintConfig,
    AccessListConfig[] memory accessLists
  )
    ERC721A(name, symbol)
    Metadata(baseTokenURI)
    Payouts(payouts)
    Royalties(beneficiary, bips)
  {
    maxSupply = _maxSupply;
    mintConfig = _mintConfig;

    for (uint256 i = 0; i < accessLists.length; i++) {
      AccessListConfig memory input = accessLists[i];
      _addGroup(
        input.signer,
        input.mintPrice,
        input.startTime,
        input.maxPerWallet
      );
    }
  }

  function _canPublicMint(uint256 count) internal view returns (bool) {
    // startTime = 0 means public disabled
    if (mintConfig.startTime == 0) revert PublicMintDisabled();

    // can't mint if it hasn't started
    if (_isBeforeTimestamp(mintConfig.startTime)) {
      revert MintNotStarted();
    }

    // if endTime set and now > endTime, can't mint
    if (mintConfig.endTime != 0 && _isAfterTimestamp(mintConfig.endTime)) {
      revert MintCompleted();
    }

    // if will be greater than maxSupply, can't mint
    if (maxSupply != 0 && _totalMinted() + count > maxSupply) {
      revert ExceedsMaxSupply();
    }

    // if will be greater than maxPerWallet, can't mint
    if (maxPerWallet != 0 && _numberMinted(msg.sender) + count > maxPerWallet) {
      revert ExceedsMaxPerWallet();
    }

    return true;
  }

  /**
   * @notice Check if the msg.sender can mint count tokens
   */
  function canPublicMint(uint256 count) external view returns (bool) {
    return _canPublicMint(count);
  }

  /**
   * @dev Public minting without signature.
   */
  function publicMint(uint256 count)
    external
    payable
    whenNotPaused
    requireValidCount(count)
    noContracts
  {
    if (msg.value < mintConfig.mintPrice * count) {
      revert InsufficientPayment();
    }

    require(_canPublicMint(count));

    _mint(msg.sender, count);
  }

  function _canGroupMint(bytes calldata signature, uint256 count)
    internal
    view
    returns (bool)
  {
    address group = _recoverSigner(signature);

    if (!_isValidMaxPerWallet(group, _numberMinted(msg.sender) + count)) {
      revert ExceedsMaxPerWallet();
    }

    if (!_isGroupStarted(group)) {
      revert MintNotStarted();
    }

    if (!_isBeforeTimestamp(mintConfig.endTime)) {
      revert MintCompleted();
    }

    if (maxSupply != 0 && _totalMinted() + count > maxSupply) {
      revert ExceedsMaxSupply();
    }

    return true;
  }

  /**
   * @notice Check if the signature can mint count tokens
   */
  function canGroupMint(bytes calldata signature, uint256 count)
    external
    view
    returns (bool)
  {
    return _canGroupMint(signature, count);
  }

  /**
   * @notice _mint for specific group signature
   */
  function groupMint(bytes calldata signature, uint256 count)
    external
    payable
    whenNotPaused
    requireValidCount(count)
    noContracts
  {
    require(_canGroupMint(signature, count));

    address group = _recoverSigner(signature);

    // Group mint counts are counted separately.
    groups[group].mintCount += count;
    usedSignatures[bytes(signature)] += count;

    _mint(msg.sender, count);
  }

  /**
   * @dev Owner of contract can mint whatever they want.
   */
  function ownerMint(address recipient, uint256 count)
    external
    onlyOwner
    requireValidCount(count)
  {
    _mint(recipient, count);
  }

  /**
   * @dev Override ERC721A's initial token index.
   *
   * This might frustrate a lot of people, but the Mintdrop (opinionated) view is that this is a human convention not a machine convention.
   * It's about perception of a set of tokens to humans, not an array index. If it were the latter it would 100000% start at 0.
   * Humans have a hard time with things that start at 0. Even in Europe (and most of the world for that matter), floor 0 = base floor. 1st floor is still 1 in this case.
   */
  function _startTokenId() internal pure override returns (uint256) {
    return 1;
  }

  /**
   * @notice Changes the public mint config
   */
  function setMintConfig(MintConfig memory _config) external onlyOwner {
    mintConfig = _config;
  }

  /**
   * @dev Pause minting globally
   */
  function pause() external onlyOwner {
    _pause();
  }

  /**
   * @dev Unpause minting globally
   */
  function unpause() external onlyOwner {
    _unpause();
  }

  /**
   * @dev Withdraw and distribute contract funds
   */
  function withdraw() external onlyOwner {
    _withdraw();
  }

  /**
  @dev override multiple baseURI functions to use the BaseTokenURI lib
   */
  function _baseURI() internal view virtual override returns (string memory) {
    return Metadata.baseTokenURI;
  }

  function setBaseTokenURI(string memory _uri) public onlyOwner {
    _setBaseTokenURI(_uri);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721A, ERC2981)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
