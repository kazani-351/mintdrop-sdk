// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

import "erc721a/contracts/ERC721A.sol";
import "../minting/PublicMintable.sol";

contract PublicMintableMock is ERC721A, PublicMintable {
  constructor(MintingConfig memory _mintConfig)
    ERC721A("AccessListMintableMock", "ACCESS_LIST_MINTABLE_MOCK")
    PublicMintable(_mintConfig)
  {}

  function mint(uint256 count) external payable {
    _publicMint(count);
  }

  /**
   * Check if the signature can mint count tokens
   */
  function canPublicMint(uint256 count) external view returns (bool) {
    (bool canMint, ) = _canPublicMint(count);
    return canMint;
  }

  // appease the Mintable def
  function _mint(address to, uint256 quantity)
    internal
    override(ERC721A, Mintable)
  {
    ERC721A._mint(to, quantity);
  }

  // appease the Mintable def
  function _mintCount(address owner) internal view override returns (uint256) {
    return ERC721A._numberMinted(owner);
  }
}
