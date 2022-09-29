// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

import "erc721a/contracts/ERC721A.sol";
import "../minting/AccessListMintable.sol";

contract AccessListMintableMock is ERC721A, AccessListMintable {
  constructor(AccessListConfig[] memory _accessLists)
    ERC721A("AccessListMintableMock", "ACCESS_LIST_MINTABLE_MOCK")
    AccessListMintable(_accessLists)
  {}

  function signatureMint(bytes calldata signature, uint256 count)
    external
    payable
  {
    _signatureMint(signature, count);
  }

  function ownerMint(address recipient, uint256 count) external {
    _mint(recipient, count);
  }

  function setAccessList(
    address signer,
    uint256 mintPrice,
    uint64 startTime,
    uint256 maxPerWallet
  ) external {
    _setAccessList(signer, mintPrice, startTime, maxPerWallet);
  }

  function removeAccessList(address signer) external {
    _removeAccessList(signer);
  }

  /**
   * Check if the signature can mint count tokens
   */
  function canSignatureMint(bytes calldata signature, uint256 count)
    external
    view
    returns (bool)
  {
    return _canSignatureMint(signature, count);
  }

  function isGroupStarted(address signer) external view returns (bool) {
    return _hasAccessListStarted(signer);
  }

  function signatureMintCount(address signer) external view returns (uint256) {
    return _accessListCount(signer);
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
