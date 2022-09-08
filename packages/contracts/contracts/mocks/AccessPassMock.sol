// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

import "hardhat/console.sol";

import "../AccessPass.sol";

contract AccessPassMock is AccessPass {
  constructor(
    string memory name,
    string memory symbol,
    uint256 _maxSupply,
    PayoutsConfig memory payoutConfig,
    MintConfig memory mintConfig,
    AccessListConfig[] memory accessListConfig
  )
    AccessPass(
      name,
      symbol,
      "https://mintdrop.example/",
      _maxSupply,
      payoutConfig,
      payable(address(0)),
      0,
      mintConfig,
      accessListConfig
    )
  {}

  function addGroup(
    address signer,
    uint256 mintPrice,
    uint64 startTime,
    uint256 maxPerWallet
  ) external {
    _addGroup(signer, mintPrice, startTime, maxPerWallet);
  }

  function removeGroup(address signer) external {
    _removeGroup(signer);
  }

  function groupCount(address group) external view returns (uint256) {
    return _groupMintCount(group);
  }
}
