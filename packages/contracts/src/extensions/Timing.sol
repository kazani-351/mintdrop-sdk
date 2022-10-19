// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

contract Timing {
    constructor() {}

    function _nowIsBefore(uint256 timestamp) internal view returns (bool) {
        return block.timestamp < timestamp;
    }

    function _nowIsAfter(uint256 timestamp) internal view returns (bool) {
        return block.timestamp >= timestamp;
    }
}
