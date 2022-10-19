// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "./Mintable.sol";

abstract contract MaxSupply is Mintable {
    uint256 public maxSupply; // 0 = no limit

    constructor(uint256 _maxSupply) {
        maxSupply = _maxSupply;
    }

    /**
     * @dev Global max supply check
     */
    modifier wontExceedMaxSupply(uint256 quantity) {
        // require(!_willExceedMaxSupply(quantity), "Exceeds Max Supply");
        require(
            maxSupply == 0 || _totalCount() + quantity <= maxSupply,
            "Exceeds Max Supply"
        );
        _;
    }
}
