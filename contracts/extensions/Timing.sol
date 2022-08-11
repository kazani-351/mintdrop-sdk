// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

contract Timing {
  constructor() {}

  function _isBeforeTimestamp(uint64 timestamp) internal view returns (bool) {
    if (timestamp != 0 && timestamp <= block.timestamp) return false;
    return true;
  }

  function _isAfterTimestamp(uint64 timestamp) internal view returns (bool) {
    if (timestamp != 0 && timestamp >= block.timestamp) return false;
    return true;
  }
}
