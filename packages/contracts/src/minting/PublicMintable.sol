// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

import "./Mintable.sol";
import "../extensions/Timing.sol";

abstract contract PublicMintable is Mintable, Timing {
    struct PublicConfig {
        bool enabled;
        uint256 mintPrice; // 0 = free
        uint256 startTime; // 0 = disabled
        uint256 endTime; // 0 = disabled
        uint256 maxPerWallet; // 0 = unlimited
    }

    PublicConfig public publicMinting;

    modifier publicMintAllowed(address _to, uint256 _count) {
        (bool canMint, string memory reason) = _canPublicMint(_to, _count);
        require(canMint, reason);
        _;
    }

    constructor(PublicConfig memory _publicConfig) {
        publicMinting = _publicConfig;
    }

    function _canPublicMint(address _to, uint256 _count)
        internal
        view
        returns (bool, string memory)
    {
        if (!publicMinting.enabled) {
            return (false, "Minting Disabled");
        }

        // can't mint if it hasn't started
        if (_nowIsBefore(publicMinting.startTime)) {
            return (false, "Mint Not Started");
        }

        if (publicMinting.endTime != 0 && _nowIsAfter(publicMinting.endTime)) {
            return (false, "Mint Completed");
        }

        if (
            publicMinting.maxPerWallet != 0 &&
            // @dev - is this right? Should we check total # of mints or just mints for this signature.
            // Perhaps this is where the definitions differ. maxPerWallet = global #, mintsPerSig = # of mints per sig
            (_mintCount(_to) + _count) > publicMinting.maxPerWallet
        ) {
            return (false, "Exceeds Max Per Wallet");
        }

        return (true, "");
    }

    /**
     * @dev Public minting without signature.
     */
    function _publicMint(address _to, uint256 _count)
        internal
        publicMintAllowed(_to, _count)
    {
        require(
            msg.value >= publicMinting.mintPrice * _count,
            "Insufficient Payment"
        );

        _mint(_to, _count);
    }

    /**
     * @dev can the address mint?
     */
    function canPublicMint(address _to, uint256 _count)
        external
        view
        returns (bool)
    {
        (bool _canMint, ) = _canPublicMint(_to, _count);
        return _canMint;
    }

    /**
     * @dev get public minting enabled
     */
    function publicMintEnabled() external view returns (bool) {
        return publicMinting.enabled;
    }

    /**
     * @dev get the mintPrice
     */
    function publicMintPrice() external view returns (uint256) {
        return publicMinting.mintPrice;
    }

    /**
     * @dev get the startTime
     */
    function publicStartTime() external view returns (uint256) {
        return publicMinting.startTime;
    }

    /**
     * @dev get the startTime
     */
    function publicEndTime() external view returns (uint256) {
        return publicMinting.endTime;
    }

    /**
     * @dev get the maxPerWallet
     */
    function publicMaxPerWallet() external view returns (uint256) {
        return publicMinting.maxPerWallet;
    }

    /**
     * @dev Change the mintPrice
     */
    function _setPublicMintEnabled(bool _enabled) internal {
        publicMinting.enabled = _enabled;
    }

    /**
     * @dev Change the mintPrice
     */
    function _setPublicMintPrice(uint256 _mintPrice) internal {
        publicMinting.mintPrice = _mintPrice;
    }

    /**
     * @dev Change the startTime
     */
    function _setPublicStartTime(uint256 _startTime) internal {
        publicMinting.startTime = _startTime;
    }

    /**
     * @dev Change the startTime
     */
    function _setPublicEndTime(uint256 _endTime) internal {
        publicMinting.endTime = _endTime;
    }

    /**
     * @dev Change the maxPerWallet
     */
    function _setPublicMaxPerWallet(uint256 _maxPerWallet) internal {
        publicMinting.maxPerWallet = _maxPerWallet;
    }

    /**
     * @dev Change the public mint config
     */
    function _setPublicMintConfig(PublicConfig memory _publicConfig) internal {
        publicMinting = _publicConfig;
    }
}
