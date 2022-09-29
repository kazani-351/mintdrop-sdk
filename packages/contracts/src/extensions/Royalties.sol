// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/common/ERC2981.sol";

abstract contract Royalties is ERC2981 {
  struct RoyaltyConfig {
    address beneficiary;
    uint96 bips;
  }

  constructor(RoyaltyConfig memory _config) {
    _setRoyalties(_config);
  }

  function _setRoyalties(RoyaltyConfig memory _config) internal {
    if (_config.beneficiary != address(0x0))
      _setDefaultRoyalty(_config.beneficiary, _config.bips);
  }
}
