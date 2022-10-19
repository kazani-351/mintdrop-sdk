// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "erc721a/contracts/ERC721A.sol";

import "../../src/minting/MaxSupply.sol";

contract MaxSupplyTest is Test {
    MaxSupplyMock public mock;

    address private minter = 0x5a6F4E1f1C6Acb70D5F583beF5fAc790e5C401bD;

    function setUp() public {
        vm.deal(minter, 100 ether);
        mock = new MaxSupplyMock(10);
    }

    function testConstructor() public {
        assertEq(mock.maxSupply(), 10);
    }

    function testMint() public {
        assertEq(mock.balanceOf(minter), 0);

        vm.prank(minter);
        mock.mint{value: 1 ether}(1);
        assertEq(mock.balanceOf(minter), 1);

        vm.prank(minter);
        mock.mint{value: 9 ether}(9);
        assertEq(mock.balanceOf(minter), 10);

        vm.prank(minter);
        vm.expectRevert("Exceeds Max Supply");
        mock.mint{value: 1 ether}(1);
    }
}

contract MaxSupplyMock is ERC721A, MaxSupply {
    constructor(uint256 _maxSupply)
        ERC721A("AllowListMintableMock", "ACCESS_LIST_MINTABLE_MOCK")
        MaxSupply(_maxSupply)
    {}

    function mint(uint256 count) external payable wontExceedMaxSupply(count) {
        _mint(msg.sender, count);
    }

    function _mint(address to, uint256 quantity)
        internal
        override(ERC721A, Mintable)
    {
        ERC721A._mint(to, quantity);
    }

    // appease the Mintable def
    function _mintCount(address owner)
        internal
        view
        override
        returns (uint256)
    {
        return ERC721A._numberMinted(owner);
    }

    function _totalCount() internal view override returns (uint256) {
        return ERC721A._totalMinted();
    }
}
