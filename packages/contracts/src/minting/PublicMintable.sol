// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

import "./Mintable.sol";
import "../extensions/Timing.sol";

struct MintingConfig {
  uint256 mintPrice; // 0 = free
  uint64 startTime; // 0 = disabled
  uint256 maxPerWallet; // 0 = disabled
}

abstract contract PublicMintable is Mintable, Timing {
  MintingConfig public mintConfig;

  modifier publicMintAllowed(uint256 count) {
    (bool canMint, string memory reason) = _canPublicMint(count);
    require(canMint, reason);
    _;
  }

  constructor(MintingConfig memory _config) {
    mintConfig = _config;
  }

  function _canPublicMint(uint256 count)
    internal
    view
    returns (bool, string memory)
  {
    // startTime = 0 means public disabled
    if (mintConfig.startTime == 0) {
      return (false, "Public Minting Disabled");
    }

    // can't mint if it hasn't started
    if (_isBeforeTimestamp(mintConfig.startTime)) {
      return (false, "Public Minting Has Not Started");
    }

    if (
      mintConfig.maxPerWallet != 0 &&
      // @dev - is this right? Should we check total # of mints or just mints for this signature.
      // Perhaps this is where the definitions differ. maxPerWallet = global #, mintsPerSig = # of mints per sig
      (_mintCount(msg.sender) + count) > mintConfig.maxPerWallet
    ) {
      return (false, "Exceeds Max Per Wallet");
    }

    return (true, "");
  }

  /**
   * @dev Public minting without signature.
   */
  function _publicMint(uint256 count) internal publicMintAllowed(count) {
    if (msg.value < mintConfig.mintPrice * count) {
      revert InsufficientPayment();
    }
    _mint(msg.sender, count);
  }

  /**
   * @dev Changes the public mint config
   */
  function _setPublicMinting(MintingConfig memory _config) internal {
    mintConfig = _config;
  }
}
