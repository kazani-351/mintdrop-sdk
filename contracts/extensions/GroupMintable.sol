// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "./Timing.sol";

error InvalidSignature();
error ExceedsGroupMaxPerWallet();

contract GroupMintable is Timing {
  struct Group {
    bool exists;
    uint64 startTimestamp;
    uint256 reservedSupply;
    uint256 mintCount;
    uint256 maxPerWallet;
    uint256 price;
  }

  // Mapping of signer -> Group
  mapping(address => Group) public groups;
  mapping(bytes32 => bool) public usedMessages;

  constructor() {}

  // function _requireGroupReservedSupply(address signer, uint256 count) {
  //   Group memory group = groups[signer];
  //   // @todo - make sure reserve count is < mint count
  //   // if (
  //   //   group.reservedSupply != 0 &&
  //   //   _totalMinted() - group.reservedSupply + quantity > MAX_PUBLIC_SUPPLY
  //   // ) revert ExceedsReservedSupply();
  // }

  function _isGroupPaymentCorrect(address signer, uint256 count)
    internal
    view
    returns (bool)
  {
    Group memory group = groups[signer];
    if (group.price != 0 && msg.value < group.price * count) return false;
    return true;
  }

  function _isMaxPerWallet(address signer, uint256 count)
    internal
    view
    returns (bool)
  {
    Group memory group = groups[signer];
    if (group.maxPerWallet != 0 && count > group.maxPerWallet) return false;
    return true;
  }

  function _isGroupTimeCorrect(address signer) internal view returns (bool) {
    Group memory group = groups[signer];
    if (group.startTimestamp != 0 && _isBeforeTimestamp(group.startTimestamp)) {
      return false;
    }
    return true;
  }

  /**
    @notice Returns the mint count for the group.
     */
  function _groupMintCount(address signer) internal view returns (uint256) {
    return groups[signer].mintCount;
  }

  /**
    @notice Inc the mint count for the group.
     */
  function _incGroupCount(address signer) internal {
    ++groups[signer].mintCount;
  }

  /**
    @notice Add a group.
    */
  function _addGroup(
    address signer,
    uint64 startTimestamp,
    uint256 reservedSupply,
    uint256 maxPerWallet
  ) internal {
    groups[signer].exists = true;
    groups[signer].startTimestamp = startTimestamp;
    groups[signer].reservedSupply = reservedSupply;
    groups[signer].maxPerWallet = maxPerWallet;
  }

  /**
    @notice Add a group with no max per wallet restrictions.
    */
  function _addGroup(
    address signer,
    uint64 startTimestamp,
    uint256 reservedSupply
  ) internal {
    _addGroup(signer, startTimestamp, reservedSupply, 0);
  }

  /**
    @notice Add a group with no reserved supply.
    */
  function _addGroup(address signer, uint64 startTimestamp) internal {
    _addGroup(signer, startTimestamp, 0, 0);
  }

  /**
    @notice Add a group with no start time restrictions.
    */
  function _addGroup(address signer) internal {
    _addGroup(signer, 0, 0, 0);
  }

  /**
    @notice Remove a group.
    */
  function _removeGroup(address signer) internal {
    groups[signer].exists = false;
  }

  /**
    @notice Generate a Recover the signer address for the signature.
    */
  function _recoverSigner(bytes calldata signature)
    internal
    view
    returns (address)
  {
    bytes32 message = _generateMessage(msg.sender);
    address signer = _recover(message, signature);
    if (!groups[signer].exists) revert InvalidSignature();
    return signer;
  }

  /**
    @notice Recover the signer address for the signature.
    */
  function _recover(bytes32 message, bytes calldata signature)
    internal
    pure
    returns (address)
  {
    return ECDSA.recover(message, signature);
  }

  /**
    @notice Generates a message for a given data input that will be signed
    off-chain using ECDSA.
     */
  function _generateMessage(address to) internal pure returns (bytes32) {
    bytes32 hash = keccak256(abi.encodePacked(to));
    return ECDSA.toEthSignedMessageHash(hash);
  }
}
