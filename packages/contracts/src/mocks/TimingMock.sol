// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "../extensions/Timing.sol";

contract TimingMock is Timing {
  constructor() {}

  function isBeforeTimestamp(uint64 timestamp) view external returns (bool) {
    return _isBeforeTimestamp(timestamp);
  }

  function isAfterTimestamp(uint64 timestamp) view external returns (bool) {
    return _isAfterTimestamp(timestamp);
  }
}
