// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "hardhat/console.sol";

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./extensions/GroupMintable.sol";
import "./extensions/Timing.sol";

error ContractsCannotMint();
error ExceedsMaxSupply();
error ExceedsMaxPerWallet();
error InsufficientPayment();
error MintNotStarted();
error MintCompleted();

contract Mintdrop721A is ERC721A, Ownable, GroupMintable {
  uint256 public maxSupply; // 0 = no limit
  uint256 public maxPerWallet; // 0 = no limit
  uint256 public price; // 0 = free

  uint64 public startTime; // 0 = no time requirement
  uint64 public endTime; // 0 = no time requirement

  modifier noContracts() {
    if (msg.sender != tx.origin) revert ContractsCannotMint();
    _;
  }

  constructor(
    string memory name,
    string memory symbol,
    uint256 _maxSupply,
    uint256 _price,
    uint96 royalties,
    address payable beneficiary
  ) ERC721A(name, symbol) {}

  // @notice _mint for specific group signature
  function _groupMint(
    bytes calldata signature,
    address to,
    uint256 quantity
  ) internal {
    address group = _recoverSigner(signature);

    // Note - we probably want to move this check into the _groupMint function,
    // to provide the ability for discounting on group mints (ala CPG POP, etc)
    // if (msg.value < price * count) revert InsufficientPayment();

    require(_isGroupPaymentCorrect(group, quantity), "InsufficientPayment");
    require(
      _isMaxPerWallet(group, _numberMinted(msg.sender) + quantity),
      "ExceedsGroupMaxPerWallet"
    );
    require(_isGroupTimeCorrect(group), "MintNotStarted");

    _incGroupCount(group);
    _mint(to, quantity);
  }

  // @dev Public minting without signature.
  function publicMint(uint256 count) external payable {
    if (_totalMinted() + count > maxSupply) revert ExceedsMaxSupply();
    if (msg.value < price * count) revert InsufficientPayment();

    // Is public minting active?
    _isBeforeTimestamp(startTime);
    _isAfterTimestamp(endTime);

    uint256 numberMinted = _numberMinted(msg.sender);
    if (maxPerWallet != 0 && numberMinted + count > maxPerWallet)
      revert ExceedsMaxPerWallet();

    _mint(msg.sender, count);
  }

  // @dev Owner of contract can mint whatever they want.
  function ownerMint(address recipient, uint256 count) external onlyOwner {
    if (maxSupply != 0 && totalSupply() + count > maxSupply)
      revert ExceedsMaxSupply();
    _mint(recipient, count);
  }

  /**
    @dev ERC165 standard
     */
  function supportsInterface(bytes4 interfaceId)
    public
    view
    virtual
    override(ERC721A)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
