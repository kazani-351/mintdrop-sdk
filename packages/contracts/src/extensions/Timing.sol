// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "hardhat/console.sol";

contract Timing {
  constructor() {}

  function _isBeforeTimestamp(uint64 timestamp) internal view returns (bool) {
    return block.timestamp < timestamp;
  }

  function _isAfterTimestamp(uint64 timestamp) internal view returns (bool) {
    return block.timestamp >= timestamp;
  }
}
