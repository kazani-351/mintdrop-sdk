// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "erc721a/contracts/ERC721A.sol";

import "../../src/minting/Mintable.sol";
import "../../src/minting/AllowListMintable.sol";

contract SharedSignersTest is Test {
    SharedSignersMock mock;

    function setUp() public {
        mock = new SharedSignersMock();
    }

    address private signer = 0x36fE6d80cB2C4828d63e4bC4337E3632845701D7;
    address private minter = 0x5a6F4E1f1C6Acb70D5F583beF5fAc790e5C401bD;
    bytes private signature =
        hex"6a793055d6bf1e108c687fc80e7f9617f60fc00237b590cfe7fa5e02f757eaf92cf72017b8688bf80e2210e710684172181ae7cd78f1b5181baaee7e01e98d431c";

    function testRecoverSigner() public {
        vm.prank(minter);
        address recovered = mock.recoverSigner(signature);
        assertEq(signer, recovered);
    }
}

contract SharedSignersMock is SharedSigners {
    function recoverSigner(bytes memory signature)
        public
        view
        returns (address)
    {
        return _recoverSigner(signature);
    }
}
