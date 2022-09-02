// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "./Timing.sol";

error InvalidSignature();

abstract contract SignatureMintable is Timing {
  struct SigningGroupConfig {
    uint256 mintPrice;
    uint64 startTime;
    uint256 maxPerWallet;
    bool exists;
    uint256 mintCount;
  }

  mapping(address => SigningGroupConfig) public groups;
  mapping(bytes => uint256) internal usedSignatures;

  function _isGroupPaymentCorrect(address signer, uint256 count)
    internal
    view
    returns (bool)
  {
    SigningGroupConfig memory group = groups[signer];
    if (group.mintPrice != 0 && msg.value < group.mintPrice * count)
      return false;
    return true;
  }

  function _isValidMaxPerWallet(address signer, uint256 count)
    internal
    view
    returns (bool)
  {
    SigningGroupConfig memory group = groups[signer];
    if (group.maxPerWallet != 0 && count > group.maxPerWallet) return false;
    return true;
  }

  function _isGroupStarted(address signer) internal view returns (bool) {
    SigningGroupConfig memory group = groups[signer];
    if (group.startTime != 0 && _isBeforeTimestamp(group.startTime)) {
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
  @notice Add a group.
  */
  function _addGroup(
    address signer,
    uint256 mintPrice,
    uint64 startTime,
    uint256 maxPerWallet
  ) internal {
    groups[signer].exists = true;
    groups[signer].mintCount = 0;
    groups[signer].mintPrice = mintPrice;
    groups[signer].startTime = startTime;
    groups[signer].maxPerWallet = maxPerWallet;
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
