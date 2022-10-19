// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "../utils/Math.sol";

error WithdrawFailed();

abstract contract Payouts is Math {
    address[] private withdrawAddresses;
    uint96[] private withdrawShares;

    modifier hasCorrectSum(uint96[] memory _shares) {
        uint256 i;
        uint96 sum = 0;

        for (i = 0; i < _shares.length; i++) sum = sum + _shares[i];

        require(sum == 10000, "Payouts: Shares do not add up to 10000");

        _;
    }

    constructor(address[] memory _payees, uint96[] memory _shares)
        hasCorrectSum(_shares)
    {
        withdrawAddresses = _payees;
        withdrawShares = _shares;
    }

    /**
     * @dev Withdraw balance and distribute to all share holders.
     */
    function _withdraw() internal {
        uint256 balance = address(this).balance;

        for (uint256 i; i < withdrawAddresses.length; i++) {
            _withdrawTo(
                withdrawAddresses[i],
                (balance * withdrawShares[i]) / 10000
            );
        }
    }

    function _withdrawTo(address _address, uint256 _amount) private {
        (bool success, ) = _address.call{value: _amount}("");
        if (!success) revert WithdrawFailed();
    }
}
