// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "forge-std/Test.sol";
import "erc721a/contracts/ERC721A.sol";

import "../../src/extensions/Royalties.sol";

contract RoyaltiesTest is Test {
    RoyaltiesMock mock;

    function setUp() public {
        mock = new RoyaltiesMock(
            address(0x1234567890123456789012345678901234567890),
            250
        );
    }

    function testERC2981RoyaltyInfo() public {
        (address _bene, uint256 _amt) = mock.royaltyInfo(0, 100 ether);
        assertEq(_bene, 0x1234567890123456789012345678901234567890);
        assertEq(_amt, 2.5 ether);
    }

    function testSupportsInterface() public {
        // ERC2981
        assertEq(mock.supportsInterface(0x2a55205a), true);

        // fake
        assertEq(mock.supportsInterface(0x00000000), false);
    }
}

contract RoyaltiesMock is Royalties {
    constructor(address _recipient, uint96 _bips)
        Royalties(_recipient, _bips)
    {}
}
