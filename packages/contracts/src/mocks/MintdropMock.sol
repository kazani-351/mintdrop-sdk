// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

import "../Mintdrop.sol";

contract MintdropMock is Mintdrop {
  constructor(
    string memory name,
    string memory symbol,
    string memory _baseTokenURI,
    uint256 _maxSupply,
    uint64 _mintEnds,
    MintingConfig memory _mintConfig,
    AccessListConfig[] memory _accessLists,
    PayoutsConfig memory _payouts,
    RoyaltyConfig memory _royalties
  )
    Mintdrop(
      name,
      symbol,
      _baseTokenURI,
      _maxSupply,
      _mintEnds,
      _mintConfig,
      _accessLists,
      _payouts,
      _royalties
    )
  {}
}
