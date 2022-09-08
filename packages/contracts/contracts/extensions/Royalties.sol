// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/common/ERC2981.sol";

abstract contract Royalties is ERC2981 {
  constructor(address payable beneficiary, uint96 bips) {
    if (beneficiary != address(0)) {
      ERC2981._setDefaultRoyalty(beneficiary, bips);
    }
  }
}
