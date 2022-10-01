// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

abstract contract Versioned {
  function __mintdrop() external pure returns (string memory) {
    return "0.5.6";
  }
}