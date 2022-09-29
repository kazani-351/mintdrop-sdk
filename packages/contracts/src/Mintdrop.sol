// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "hardhat/console.sol";

import "erc721a/contracts/ERC721A.sol";
import "./IMintdrop.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./minting/AccessListMintable.sol";
import "./minting/PublicMintable.sol";

import "./extensions/Metadata.sol";
import "./extensions/Timing.sol";
import "./extensions/Payouts.sol";
import "./extensions/Royalties.sol";

import "./utils/Math.sol";

import "./gen/Version.sol";

// ERC721A,
contract Mintdrop is
  IMintdrop,
  ERC721A,
  Math,
  Metadata,
  Payouts,
  Royalties,
  Versioned,
  Ownable,
  Pausable,
  ReentrancyGuard,
  PublicMintable,
  AccessListMintable
{
  /**
   * @dev Global options that span across both public and access list minting.
   */
  uint256 public maxSupply; // 0 = no limit
  uint64 private endTime; // 0 = no ending time

  /**
   * Instantiate a new Mintdrop ERC721.
   *
   * @param _name ERC721 name
   * @param _symbol ERC721 symbol
   * @param _baseTokenURI Base URI for computing {tokenURI}
   * @param _maxSupply Maximum number of tokens. Use 0 for no maximum.
   * @param _endTime End date for minting. Use 0 for no limit.
   * @param _mintConfig Configuration for public minting, see {MintConfig}
   * @param _accessLists Configuration for access list minting, see {AccessListConfig}
   * @param _payouts Configuration for payouts, see {PayoutConfig}
   * @param _royalties Configuration for royalties, see {RoyaltyConfig}
   */
  constructor(
    string memory _name,
    string memory _symbol,
    string memory _baseTokenURI,
    uint256 _maxSupply,
    uint64 _endTime,
    MintingConfig memory _mintConfig,
    AccessListConfig[] memory _accessLists,
    PayoutsConfig memory _payouts,
    RoyaltyConfig memory _royalties
  )
    ERC721A(_name, _symbol)
    PublicMintable(_mintConfig)
    AccessListMintable(_accessLists)
    Metadata(_baseTokenURI)
    Payouts(_payouts)
    Royalties(_royalties)
  {
    maxSupply = _maxSupply;
    endTime = _endTime;
  }

  /**
   * @dev Override ERC721A's initial token index.
   *
   * This might frustrate a lot of people, but the Mintdrop (opinionated) view is that this is a human convention not a machine convention.
   * It's about perception of a set of tokens to humans, not an array index. If it were the latter it would 100000% start at 0.
   * Humans have a hard time with things that start at 0. Even in Europe (and most of the world for that matter), floor 0 = base floor. 1st floor is still 1 in this case.
   */
  function _startTokenId() internal pure virtual override returns (uint256) {
    return 1;
  }

  /**
   * @dev override multiple baseURI functions to use the BaseTokenURI lib
   */
  function _baseURI() internal view virtual override returns (string memory) {
    return Metadata.baseTokenURI;
  }

  /**
   * @dev Internal _mint function for Mintable calls
   */
  function _mint(address to, uint256 quantity)
    internal
    override(ERC721A, Mintable)
  {
    ERC721A._mint(to, quantity);
  }

  function _mintCount(address to) internal view override returns (uint256) {
    return _numberMinted(to);
  }

  // ========================================
  // Public Minting
  // ========================================

  /**
   * @notice Check if the msg.sender can mint count tokens
   */
  function canPublicMint(uint256 count) external view returns (bool) {
    if (paused()) return false;
    if (_hasMintEnded()) return false;
    if (_willExceedMaxSupply(count)) return false;

    (bool canMint, ) = _canPublicMint(count);
    return canMint;
  }

  function publicMint(uint256 count)
    public
    payable
    whenNotPaused
    beforeMintEnds
    wontExceedMaxSupply(count)
    noContracts
  {
    (bool canMint, string memory reason) = _canPublicMint(count);
    if (!canMint) revert(reason);
    _publicMint(count);
  }

  // ========================================
  // Access List Minting
  // ========================================

  /**
   * Check if the signature can mint count tokens
   */
  function canSignatureMint(bytes calldata signature, uint256 count)
    external
    view
    whenNotPaused
    beforeMintEnds
    wontExceedMaxSupply(count)
    returns (bool)
  {
    return _canSignatureMint(signature, count);
  }

  /**
   * group minting via shared signatures
   */
  function signatureMint(bytes calldata signature, uint256 count)
    external
    payable
    whenNotPaused
    beforeMintEnds
    wontExceedMaxSupply(count)
    noContracts
  {
    _signatureMint(signature, count);
  }

  // ========================================
  // Owner Controls
  // ========================================

  /**
   * Owner of contract can mint whatever they want.
   */
  function ownerMint(address recipient, uint256 count)
    external
    onlyOwner
    wontExceedMaxSupply(count)
  {
    _mint(recipient, count);
  }

  function airdrop(address[] calldata recipients, uint256[] calldata counts) 
    external
    onlyOwner
    wontExceedMaxSupply(Math._sum(counts))
  {
    require(recipients.length == counts.length, "Recipients and counts are diff sizes");
    
    for (uint256 i; i < recipients.length; i++) {
      _mint(recipients[i], counts[i]);
    }
  }

  /**
   * Change the public mint config
   */
  function setPublicMinting(MintingConfig memory _config) external onlyOwner {
    _setPublicMinting(_config);
  }

  /**
   * Add/set access list for signer
   */
  function setAccessList(
    address _signer,
    uint256 _mintPrice,
    uint64 _startTime,
    uint256 _maxPerWallet
  ) external onlyOwner {
    _setAccessList(_signer, _mintPrice, _startTime, _maxPerWallet);
  }

  /**
   * Remove access list for signer
   */
  function removeAccessList(address signer) external onlyOwner {
    _removeAccessList(signer);
  }

  /**
   * Change the token URI.
   */
  function setBaseTokenURI(string memory _uri) public onlyOwner {
    _setBaseTokenURI(_uri);
  }

  // /**
  //  * Change royalties beneficiary and/or BIPs.
  //  */
  function setRoyaltyInfo(address _beneficiary, uint96 _bips)
    external
    onlyOwner
  {
    _setRoyalties(RoyaltyConfig({beneficiary: _beneficiary, bips: _bips}));
  }

  /**
   * Pause minting globally
   */
  function pause() external onlyOwner {
    _pause();
  }

  /**
   * Unpause minting globally
   */
  function unpause() external onlyOwner {
    _unpause();
  }

  /**
   * Withdraw and distribute contract funds
   */
  function withdraw() external onlyOwner nonReentrant {
    _withdraw();
  }

  /**
   * @dev override both ERC721A and ERC2981
   */
  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721A, ERC2981)
    returns (bool)
  {
    return
      ERC721A.supportsInterface(interfaceId) ||
      ERC2981.supportsInterface(interfaceId);
  }

  // ========================================
  // Global mint checks
  // ========================================

  function _willExceedMaxSupply(uint256 quantity) internal view returns (bool) {
    return maxSupply != 0 && _totalMinted() + quantity > maxSupply;
  }

  function _hasMintEnded() internal view returns (bool) {
    return endTime != 0 && _isAfterTimestamp(endTime);
  }

  // ========================================
  // Modifiers
  // ========================================

  /**
   * @dev Global max supply check
   */
  modifier wontExceedMaxSupply(uint256 quantity) {
    require(!_willExceedMaxSupply(quantity), "Exceeds Max Supply");
    _;
  }

  /**
   * @dev Global mint end check
   */
  modifier beforeMintEnds() {
    require(!_hasMintEnded(), "Mint Completed");
    _;
  }

  /**
   * @dev disallow contracts from minting.
   */
  modifier noContracts() {
    if (msg.sender != tx.origin) revert ContractsCannotMint();
    _;
  }
}
