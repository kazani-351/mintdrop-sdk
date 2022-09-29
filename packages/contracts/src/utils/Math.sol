// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

abstract contract Math {
  function _sum(uint96[] memory ary) internal pure returns (uint96) {
    uint256 i;
    uint96 sum = 0;
    for (i = 0; i < ary.length; i++) sum = sum + ary[i];
    return sum;
  }

  function _sum(uint256[] memory ary) internal pure returns (uint256) {
    uint256 i;
    uint256 sum = 0;
    for (i = 0; i < ary.length; i++) sum = sum + ary[i];
    return sum;
  }
}