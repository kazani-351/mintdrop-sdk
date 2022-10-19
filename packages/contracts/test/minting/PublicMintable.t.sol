// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "erc721a/contracts/ERC721A.sol";

import "../../src/minting/Mintable.sol";
import "../../src/minting/PublicMintable.sol";

contract PublicMintingTest is Test {
    PublicMintableMock public mock;

    address private minter = 0x5a6F4E1f1C6Acb70D5F583beF5fAc790e5C401bD;

    function setUp() public {
        vm.deal(minter, 10 ether);

        skip(60);

        mock = new PublicMintableMock(
            PublicMintable.PublicConfig({
                enabled: true,
                mintPrice: 1 ether,
                startTime: 60,
                endTime: 100,
                maxPerWallet: 1
            })
        );
    }

    function testConstructor() public {
        assertEq(mock.publicMintPrice(), 1 ether);
        assertEq(mock.publicStartTime(), 60);
        assertEq(mock.publicMaxPerWallet(), 1);
    }

    function testMint() public {
        assertEq(mock.balanceOf(minter), 0);

        vm.prank(minter);
        assertEq(mock.canPublicMint(minter, 1), true);

        vm.prank(minter);
        mock.publicMint{value: 1 ether}(1);
        assertEq(mock.balanceOf(minter), 1);
    }

    function testMintPrice() public {
        vm.prank(minter);
        vm.expectRevert("Insufficient Payment");
        mock.publicMint{value: 0.2 ether}(1);
        assertEq(mock.balanceOf(minter), 0);

        vm.prank(minter);
        mock.publicMint{value: 1 ether}(1);
        assertEq(mock.balanceOf(minter), 1);
    }

    function testMintingEnabled() public {
        assertEq(mock.balanceOf(minter), 0);
        mock.setPublicMintEnabled(false);

        vm.prank(minter);
        assertEq(mock.canPublicMint(minter, 1), false);

        vm.prank(minter);
        vm.expectRevert("Minting Disabled");
        mock.publicMint{value: 1 ether}(1);
        assertEq(mock.balanceOf(minter), 0);

        mock.setPublicMintEnabled(true);

        vm.prank(minter);
        mock.publicMint{value: 1 ether}(1);
        assertEq(mock.balanceOf(minter), 1);
    }

    function testStartTime() public {
        assertEq(mock.balanceOf(minter), 0);

        rewind(60);

        vm.prank(minter);
        assertEq(mock.canPublicMint(minter, 1), false);

        vm.prank(minter);
        vm.expectRevert("Mint Not Started");
        mock.publicMint{value: 1 ether}(1);
        assertEq(mock.balanceOf(minter), 0);

        skip(60);

        vm.prank(minter);
        mock.publicMint{value: 1 ether}(1);
        assertEq(mock.balanceOf(minter), 1);
    }

    function testEndTime() public {
        assertEq(mock.balanceOf(minter), 0);

        vm.prank(minter);
        assertEq(mock.canPublicMint(minter, 1), true);

        skip(40);

        vm.prank(minter);
        assertEq(mock.canPublicMint(minter, 1), false);

        vm.prank(minter);
        vm.expectRevert("Mint Completed");
        mock.publicMint{value: 1 ether}(1);
        assertEq(mock.balanceOf(minter), 0);

        mock.setPublicEndTime(0);

        vm.prank(minter);
        assertEq(mock.canPublicMint(minter, 1), true);

        rewind(2);
        mock.setPublicEndTime(100);

        vm.prank(minter);
        mock.publicMint{value: 1 ether}(1);
        assertEq(mock.balanceOf(minter), 1);
    }

    function testChangeStartTime() public {
        rewind(59);

        vm.prank(minter);
        vm.expectRevert("Mint Not Started");
        mock.publicMint{value: 1 ether}(1);
        assertEq(mock.balanceOf(minter), 0);

        mock.setPublicStartTime(1);

        vm.prank(minter);
        mock.publicMint{value: 1 ether}(1);
        assertEq(mock.balanceOf(minter), 1);
    }

    function testDisablingMinting() public {
        rewind(59);

        vm.prank(minter);
        vm.expectRevert("Mint Not Started");
        mock.publicMint{value: 1 ether}(1);
        assertEq(mock.balanceOf(minter), 0);

        mock.setPublicStartTime(1);

        vm.prank(minter);
        mock.publicMint{value: 1 ether}(1);
        assertEq(mock.balanceOf(minter), 1);
    }

    function testMaxPerWallet() public {
        assertEq(mock.balanceOf(minter), 0);

        vm.prank(minter);
        assertEq(mock.canPublicMint(minter, 2), false);

        vm.prank(minter);
        vm.expectRevert("Exceeds Max Per Wallet");
        mock.publicMint{value: 1 ether}(2);
        assertEq(mock.balanceOf(minter), 0);

        vm.prank(minter);
        mock.publicMint{value: 1 ether}(1);
        assertEq(mock.balanceOf(minter), 1);
    }

    function testChangeMaxPerWallet() public {
        vm.prank(minter);
        mock.publicMint{value: 1 ether}(1);
        assertEq(mock.balanceOf(minter), 1);

        mock.setPublicMaxPerWallet(3);

        vm.prank(minter);
        mock.publicMint{value: 2 ether}(2);
        assertEq(mock.balanceOf(minter), 3);
    }
}

contract PublicMintableMock is ERC721A, PublicMintable {
    constructor(PublicMintable.PublicConfig memory _PublicConfig)
        ERC721A("AllowListMintableMock", "ACCESS_LIST_MINTABLE_MOCK")
        PublicMintable(_PublicConfig)
    {}

    // function canPublicMint(uint256 count) external view returns (bool) {
    //     (bool canMint, ) = _canPublicMint(msg.sender, count);
    //     return canMint;
    // }

    function publicMint(uint256 count) external payable {
        _publicMint(msg.sender, count);
    }

    function setPublicMintEnabled(bool _enabled) external {
        _setPublicMintEnabled(_enabled);
    }

    function setPublicMintPrice(uint256 _price) external {
        _setPublicMintPrice(_price);
    }

    function setPublicStartTime(uint256 _startTime) external {
        _setPublicStartTime(_startTime);
    }

    function setPublicEndTime(uint256 _endTime) external {
        _setPublicEndTime(_endTime);
    }

    function setPublicMaxPerWallet(uint256 _maxPerWallet) external {
        _setPublicMaxPerWallet(_maxPerWallet);
    }

    // appease the Mintable def
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
