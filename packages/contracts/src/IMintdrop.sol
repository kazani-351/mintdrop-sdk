// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

import "./minting/PublicMintable.sol";

/**
 * Mintdrop Interface
 *
 * This represents the bare-minimum set of functions necessary for a ERC721 contract to be used on the Mintdrop service.
 */
interface IMintdrop {
  // Contracts must define a public mint option
  function canPublicMint(uint256 count) external returns (bool);

  function publicMint(uint256 count) external payable;

  function setPublicMinting(MintingConfig memory _config) external;

  // Contracts must be able to group mint option
  function canSignatureMint(bytes calldata signature, uint256 count)
    external
    returns (bool);

  function signatureMint(bytes calldata signature, uint256 count)
    external
    payable;

  // Owner abillities

  function ownerMint(address recipient, uint256 count) external;
  function airdrop(address[] calldata recipients, uint256[] calldata counts) external;

  function pause() external;

  function unpause() external;

  function withdraw() external;

  // TODO

  // function setRoyaltyInfo(address _royaltyAddress, uint96 _percentage)
  // function setBaseTokenURI(string memory _uri) public onlyOwner {
}
