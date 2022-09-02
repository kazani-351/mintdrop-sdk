// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

import "../extensions/SignatureMintable.sol";

contract SignatureMintableMock is SignatureMintable {
  constructor() {}

  function addGroup(
    address signer,
    uint256 mintPrice,
    uint64 startTime,
    uint256 maxPerWallet
  ) external {
    _addGroup(signer, mintPrice, startTime, maxPerWallet);
  }

  function removeGroup(address signer) external {
    _removeGroup(signer);
  }

  function groupCount(address group) external view returns (uint256) {
    return _groupMintCount(group);
  }

  function isGroupPaymentCorrect(address signer, uint256 count)
    external
    view
    returns (bool)
  {
    return _isGroupPaymentCorrect(signer, count);
  }

  function isValidMaxPerWallet(address signer, uint256 count)
    external
    view
    returns (bool)
  {
    return _isValidMaxPerWallet(signer, count);
  }

  function isGroupStarted(address signer) external view returns (bool) {
    return _isGroupStarted(signer);
  }

  function groupMintCount(address signer) external view returns (uint256) {
    return _groupMintCount(signer);
  }

  function recoverSigner(bytes calldata signature)
    external
    view
    returns (address)
  {
    return _recoverSigner(signature);
  }

  function generateMessage(address to) internal pure returns (bytes32) {
    return _generateMessage(to);
  }
}
