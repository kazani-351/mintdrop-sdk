// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "forge-std/Test.sol";
import "erc721a/contracts/ERC721A.sol";

import "../../src/extensions/Timing.sol";

contract TimingTest is Test {
    TimingMock mock;

    function setUp() public {
        mock = new TimingMock();
    }

    function testIsBefore() public {
        assertEq(block.timestamp, 1);
        assertEq(mock.nowIsBefore(0), false);
        assertEq(mock.nowIsBefore(1), false); // we use < not <=
        assertEq(mock.nowIsBefore(2), true);
    }

    function testIsAfter() public {
        assertEq(block.timestamp, 1);
        assertEq(mock.nowIsAfter(0), true);
        assertEq(mock.nowIsAfter(1), true); // we use <=
        assertEq(mock.nowIsAfter(2), false);
    }
}

contract TimingMock is Timing {
    function nowIsBefore(uint256 _time) external view returns (bool) {
        return _nowIsBefore(_time);
    }

    function nowIsAfter(uint256 _time) external view returns (bool) {
        return _nowIsAfter(_time);
    }
}
