// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

abstract contract Version {
  function __mintdrop() external pure returns (string memory) {
    return "0.4.4";
  }
}