// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

error WithdrawFailed();

abstract contract Payouts {
  address[] public withdrawAddresses;
  uint256[] public withdrawPercentages;

  struct PayoutsConfig {
    address[] payees;
    uint256[] shares;
  }

  constructor(PayoutsConfig memory payouts) {
    withdrawAddresses = payouts.payees;
    withdrawPercentages = payouts.shares;
  }

  /**
   * @dev Withdraw balance and distribute to all share holders.
   */
  function _withdraw() internal {
    uint256 balance = address(this).balance;

    for (uint256 i; i < withdrawAddresses.length; i++) {
      _withdrawTo(
        withdrawAddresses[i],
        (balance * withdrawPercentages[i]) / 10000
      );
    }
  }

  function _withdrawTo(address _address, uint256 _amount) private {
    (bool success, ) = _address.call{value: _amount}("");
    if (!success) revert WithdrawFailed();
  }
}
