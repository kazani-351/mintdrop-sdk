// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "erc721a/contracts/ERC721A.sol";
import "hardhat/console.sol";

import "../extensions/Metadata.sol";

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
