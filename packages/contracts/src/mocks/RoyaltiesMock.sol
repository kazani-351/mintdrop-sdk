// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "erc721a/contracts/ERC721A.sol";

import "../extensions/Royalties.sol";

contract RoyaltiesMock is ERC721A, Royalties {
  constructor(address payable _beneficiary, uint96 _bips)
    ERC721A("MetadataMock", "METADATA_MOCK")
    Royalties(RoyaltyConfig({beneficiary: _beneficiary, bips: _bips}))
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
    return
      ERC721A.supportsInterface(interfaceId) ||
      ERC2981.supportsInterface(interfaceId);
  }
}
