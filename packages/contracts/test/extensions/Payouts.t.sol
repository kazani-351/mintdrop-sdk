// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "forge-std/Test.sol";
import "erc721a/contracts/ERC721A.sol";

import "../../src/extensions/Payouts.sol";

contract PayoutsTest is Test {
    PayoutsMock mock;

    address private first = 0x1234567890123456789012345678901234567890;
    address private second = 0x0987654321098765432109876543210987654321;

    function setUp() public {
        address[] memory beneficiaries = new address[](2);
        uint96[] memory shares = new uint96[](2);

        beneficiaries[0] = address(first);
        shares[0] = 9800;

        beneficiaries[1] = address(second);
        shares[1] = 200;

        mock = new PayoutsMock(beneficiaries, shares);

        vm.deal(address(mock), 100 ether);
    }

    function testErroneousSum() public {
        address[] memory beneficiaries = new address[](1);
        uint96[] memory shares = new uint96[](1);

        beneficiaries[0] = address(first);
        shares[0] = 10001;

        vm.expectRevert("Payouts: Shares do not add up to 10000");
        mock = new PayoutsMock(beneficiaries, shares);
    }

    function testWithdraw() public {
        assertEq(address(first).balance, 0);
        assertEq(address(second).balance, 0);
        assertEq(address(mock).balance, 100 ether);

        mock.withdraw();

        assertEq(address(first).balance, 98 ether);
        assertEq(address(second).balance, 2 ether);
        assertEq(address(mock).balance, 0);
    }
}

contract PayoutsMock is Payouts {
    constructor(address[] memory _payees, uint96[] memory _shares)
        Payouts(_payees, _shares)
    {}

    function withdraw() external {
        _withdraw();
    }
}
