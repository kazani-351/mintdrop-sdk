// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "erc721a/contracts/ERC721A.sol";

import "../../src/minting/Mintable.sol";
import "../../src/minting/AllowListMintable.sol";

contract AllowListMintingTest is Test {
    AllowListMintableMock public mock;

    address private signer = 0x36fE6d80cB2C4828d63e4bC4337E3632845701D7;
    address private minter = 0x5a6F4E1f1C6Acb70D5F583beF5fAc790e5C401bD;
    bytes private signature =
        hex"6a793055d6bf1e108c687fc80e7f9617f60fc00237b590cfe7fa5e02f757eaf92cf72017b8688bf80e2210e710684172181ae7cd78f1b5181baaee7e01e98d431c";

    function setUp() public {
        vm.deal(minter, 10 ether);

        AllowListMintable.AllowListConfig[]
            memory lists = new AllowListMintable.AllowListConfig[](1);

        skip(60);

        lists[0] = AllowListMintable.AllowListConfig({
            signer: signer,
            mintPrice: 1 ether,
            startTime: 60,
            endTime: 100,
            maxPerWallet: 1
        });

        mock = new AllowListMintableMock(lists);
    }

    function testConstructor() public {
        assertEq(mock.listExists(address(0x0)), false);
        assertEq(mock.listExists(signer), true);
    }

    function testMint() public {
        assertEq(mock.balanceOf(minter), 0);
        assertEq(mock.allowListMintCount(signer), 0);

        vm.prank(minter);
        assertEq(mock.canSignatureMint(minter, signature, 1), true);

        vm.prank(minter);
        mock.signatureMint{value: 1 ether}(signature, 1);
        assertEq(mock.balanceOf(minter), 1);
        assertEq(mock.allowListMintCount(signer), 1);
    }

    function testAddAllowList() public {
        address _signer = 0x9999999999999999999999999999999999999999;
        assertEq(mock.listExists(_signer), false);
        mock.addAllowList(_signer, 0, 0, 0, 0);
        assertEq(mock.listExists(_signer), true);
    }

    function testRemoveAllowList() public {
        assertEq(mock.listExists(signer), true);

        vm.prank(minter);
        assertEq(mock.canSignatureMint(minter, signature, 1), true);

        mock.removeAllowList(signer);
        assertEq(mock.listExists(signer), false);

        vm.prank(minter);
        assertEq(mock.canSignatureMint(minter, signature, 1), false);
    }

    function testWrongMinterAddress() public {
        address fake_addy = address(0x1234567890123456789012345678901234567890);

        assertEq(mock.balanceOf(minter), 0);
        assertEq(mock.balanceOf(fake_addy), 0);

        vm.prank(fake_addy);
        assertEq(mock.canSignatureMint(fake_addy, signature, 1), false);

        vm.prank(fake_addy);
        vm.expectRevert("Unknown List");
        mock.signatureMint(signature, 1);

        assertEq(mock.balanceOf(minter), 0);
        assertEq(mock.balanceOf(fake_addy), 0);
    }

    function testWrongSignature() public {
        assertEq(mock.balanceOf(minter), 0);

        bytes
            memory fake_sig = hex"0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

        vm.prank(minter);
        assertEq(mock.canSignatureMint(minter, fake_sig, 1), false);

        vm.prank(minter);
        vm.expectRevert("Invalid Signature");
        mock.signatureMint(fake_sig, 1);

        assertEq(mock.balanceOf(minter), 0);
    }

    function testMultipleSignatureUse() public {
        assertEq(mock.balanceOf(minter), 0);

        vm.prank(minter);
        mock.signatureMint{value: 1 ether}(signature, 1);
        assertEq(mock.balanceOf(minter), 1);

        vm.prank(minter);
        assertEq(mock.canSignatureMint(minter, signature, 1), false);

        vm.prank(minter);
        vm.expectRevert("Signature Already Used");
        mock.signatureMint{value: 1 ether}(signature, 1);

        assertEq(mock.balanceOf(minter), 1);
    }

    function testMaxPerWallet() public {
        assertEq(mock.balanceOf(minter), 0);

        vm.prank(minter);
        assertEq(mock.canSignatureMint(minter, signature, 2), false);

        vm.prank(minter);
        vm.expectRevert("Exceeds Max Per Wallet");
        mock.signatureMint{value: 1 ether}(signature, 2);
        assertEq(mock.balanceOf(minter), 0);

        vm.prank(minter);
        mock.signatureMint{value: 1 ether}(signature, 1);
        assertEq(mock.balanceOf(minter), 1);
    }

    function testStartTime() public {
        assertEq(mock.balanceOf(minter), 0);

        rewind(60);

        vm.prank(minter);
        assertEq(mock.canSignatureMint(minter, signature, 1), false);

        vm.prank(minter);
        vm.expectRevert("Mint Not Started");
        mock.signatureMint{value: 1 ether}(signature, 1);
        assertEq(mock.balanceOf(minter), 0);

        skip(60);

        vm.prank(minter);
        mock.signatureMint{value: 1 ether}(signature, 1);
        assertEq(mock.balanceOf(minter), 1);
    }

    function testEndTime() public {
        assertEq(mock.balanceOf(minter), 0);

        vm.prank(minter);
        assertEq(mock.canSignatureMint(minter, signature, 1), true);

        skip(40);

        vm.prank(minter);
        assertEq(mock.canSignatureMint(minter, signature, 1), false);

        vm.prank(minter);
        vm.expectRevert("Mint Completed");
        mock.signatureMint{value: 1 ether}(signature, 1);
        assertEq(mock.balanceOf(minter), 0);

        mock.addAllowList(signer, 1 ether, 60, 0, 1);

        vm.prank(minter);
        assertEq(mock.canSignatureMint(minter, signature, 1), true);

        rewind(2);
        mock.addAllowList(signer, 1 ether, 60, 100, 1);

        vm.prank(minter);
        mock.signatureMint{value: 1 ether}(signature, 1);
        assertEq(mock.balanceOf(minter), 1);
    }

    function testPayment() public {
        vm.prank(minter);
        vm.expectRevert("Insufficient Payment");
        mock.signatureMint{value: 0.2 ether}(signature, 1);
        assertEq(mock.balanceOf(minter), 0);

        vm.prank(minter);
        mock.signatureMint{value: 1 ether}(signature, 1);
        assertEq(mock.balanceOf(minter), 1);
    }
}

contract AllowListMintableMock is ERC721A, AllowListMintable {
    constructor(AllowListMintable.AllowListConfig[] memory _accessLists)
        ERC721A("AllowListMintableMock", "ACCESS_LIST_MINTABLE_MOCK")
        AllowListMintable(_accessLists)
    {}

    // function canSignatureMint(bytes calldata signature, uint256 count)
    //     external
    //     view
    //     returns (bool)
    // {
    //     (bool canMint, ) = _canSignatureMint(msg.sender, signature, count);
    //     return canMint;
    // }

    function signatureMint(bytes calldata signature, uint256 count)
        external
        payable
    {
        _signatureMint(msg.sender, signature, count);
    }

    function addAllowList(
        address signer,
        uint256 mintPrice,
        uint64 startTime,
        uint64 endTime,
        uint256 maxPerWallet
    ) external {
        _setAllowList(signer, mintPrice, startTime, endTime, maxPerWallet);
    }

    function removeAllowList(address signer) external {
        _removeAllowList(signer);
    }

    // function listCount(address signer) external view returns (uint256) {
    //     return allowListMintCount(signer);
    // }

    function listExists(address signer) external view returns (bool) {
        return allowLists[signer].exists;
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
