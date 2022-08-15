// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

import "../Mintdrop721A.sol";

contract GroupsMock is Mintdrop721A {
  constructor(string memory name, string memory symbol)
    Mintdrop721A(name, symbol, 10000, 0, 0, payable(0x0))
  {}

  function addGroup(
    address signer,
    uint64 startTimestamp,
    uint256 reserveCount,
    uint256 maxPerWallet
  ) external {
    _addGroup(signer, startTimestamp, reserveCount, maxPerWallet);
  }

  function removeGroup(address signer) external {
    _removeGroup(signer);
  }

  function groupCount(address group) external view returns (uint256) {
    return _groupMintCount(group);
  }
}
