// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "forge-std/Test.sol";
import "erc721a/contracts/ERC721A.sol";

import "../../src/extensions/Metadata.sol";

contract MetadataTest is Test {
    MetadataMock mock;

    function setUp() public {
        mock = new MetadataMock();
    }

    function testConstructor() public {
        string memory tokenURI = mock.baseTokenURI();
        assertEq(tokenURI, "https://meta.mintdrop.xyz/123/");
    }

    function testSetBaseTokenURI() public {
        mock.setBaseTokenURI("https://test.com/");
        string memory tokenURI = mock.baseTokenURI();
        assertEq(tokenURI, "https://test.com/");
    }

    function testTokenURI() public {
        mock.fakeMint();
        assertEq(mock.totalSupply(), 1);

        string memory tokenURI = mock.tokenURI(1);
        assertEq(tokenURI, "https://meta.mintdrop.xyz/123/1");
    }
}

contract MetadataMock is ERC721A, Metadata {
    constructor()
        ERC721A("MetadataMock", "METADATA_MOCK")
        Metadata("https://meta.mintdrop.xyz/123/")
    {}

    function fakeMint() external {
        _mint(msg.sender, 1);
    }

    function setBaseTokenURI(string memory uri) external {
        _setBaseTokenURI(uri);
    }

    function _startTokenId() internal pure override returns (uint256) {
        return 1;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return Metadata.baseTokenURI;
    }
}
