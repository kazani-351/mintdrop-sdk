// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "erc721a/contracts/ERC721A.sol";
import "hardhat/console.sol";

import "../extensions/Royalties.sol";

contract RoyaltiesMock is ERC721A, Royalties {
  constructor(address payable beneficiary, uint96 bips)
    ERC721A("MetadataMock", "METADATA_MOCK")
    Royalties(beneficiary, bips)
  {}

  function fakeMint() external {
    _mint(msg.sender, 1);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721A, ERC2981)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}
