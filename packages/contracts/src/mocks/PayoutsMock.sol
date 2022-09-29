// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "erc721a/contracts/ERC721A.sol";
import "hardhat/console.sol";

import "../extensions/Payouts.sol";

contract PayoutsMock is Payouts {
  constructor(PayoutsConfig memory _payouts) Payouts(_payouts) {}

  function mint() external payable {
    // do nothing
  }

  function withdraw() external {
    _withdraw();
  }
}
