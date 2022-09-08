// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "erc721a/contracts/ERC721A.sol";
import "hardhat/console.sol";

import "../extensions/Payouts.sol";

contract PayoutsMock is ERC721A, Payouts {
  constructor(PayoutsConfig memory payouts)
    ERC721A("PayoutsMock", "PAYOUTS_MOCK")
    Payouts(payouts)
  {
    // do nothing
  }

  function mint() external payable {
    _mint(msg.sender, 1);
  }

  function withdraw() external {
    _withdraw();
  }
}
