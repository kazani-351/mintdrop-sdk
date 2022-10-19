// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "./Mintable.sol";
import "../signing/SharedSigners.sol";
import "../extensions/Timing.sol";

abstract contract AllowListMintable is SharedSigners, Mintable, Timing {
    struct AllowListConfig {
        address signer;
        uint256 mintPrice;
        uint256 startTime;
        uint256 endTime;
        uint256 maxPerWallet;
    }

    struct AllowList {
        bool exists;
        uint256 mintCount;
        uint256 mintPrice;
        uint256 startTime;
        uint256 endTime;
        uint256 maxPerWallet;
    }

    mapping(address => AllowList) public allowLists;
    mapping(bytes => uint256) internal usedSignatures;

    modifier signatureMintAllowed(
        address _to,
        bytes calldata _signature,
        uint256 _count
    ) {
        (bool canMint, string memory reason) = _canSignatureMint(
            _to,
            _signature,
            _count
        );
        require(canMint, reason);
        _;
    }

    constructor(AllowListConfig[] memory _lists) {
        for (uint256 i = 0; i < _lists.length; i++) {
            AllowListConfig memory input = _lists[i];
            _setAllowList(
                input.signer,
                input.mintPrice,
                input.startTime,
                input.endTime,
                input.maxPerWallet
            );
        }
    }

    function _canSignatureMint(
        address _to,
        bytes calldata _signature,
        uint256 _count
    ) internal view returns (bool, string memory) {
        address signer = _recoverSigner(_signature);

        if (signer == address(0x0)) return (false, "Invalid Signature");

        AllowList memory _list = allowLists[signer];

        if (!_list.exists) {
            return (false, "Unknown List");
        }

        // Eventually we want to support control over multi-use signatures. As for now they are single use.
        if (usedSignatures[bytes(_signature)] != 0)
            return (false, "Signature Already Used");

        if (
            _list.maxPerWallet != 0 &&
            // @dev - is this right? Should we check total # of mints or just mints for this signature.
            // Perhaps this is where the definitions differ. maxPerWallet = global #, mintsPerSig = # of mints per sig
            (_mintCount(_to) + _count) > _list.maxPerWallet
        ) {
            return (false, "Exceeds Max Per Wallet");
        }

        if (_list.startTime != 0 && _nowIsBefore(_list.startTime)) {
            return (false, "Mint Not Started");
        }

        if (_list.endTime != 0 && _nowIsAfter(_list.endTime)) {
            return (false, "Mint Completed");
        }

        return (true, "");
    }

    function _signatureMint(
        address _to,
        bytes calldata _signature,
        uint256 _count
    ) internal signatureMintAllowed(_to, _signature, _count) {
        address signer = _recoverSigner(_signature);
        uint256 _mintPrice = allowLists[signer].mintPrice;

        require(msg.value >= _mintPrice * _count, "Insufficient Payment");

        allowLists[signer].mintCount += _count;
        usedSignatures[bytes(_signature)] += _count;

        _mint(_to, _count);
    }

    /**
     * @dev can the address mint?
     */
    function canSignatureMint(
        address to,
        bytes calldata signature,
        uint256 count
    ) external view returns (bool) {
        (bool canMint, ) = _canSignatureMint(to, signature, count);
        return canMint;
    }

    /**
    @notice Returns the mint count for the list.
     */
    function allowListMintCount(address signer)
        external
        view
        returns (uint256)
    {
        return allowLists[signer].mintCount;
    }

    /**
     @notice Add a list.
    */
    function _setAllowList(
        address signer,
        uint256 mintPrice,
        uint256 startTime,
        uint256 endTime,
        uint256 maxPerWallet
    ) internal {
        allowLists[signer].exists = true;
        allowLists[signer].mintCount = 0;
        allowLists[signer].mintPrice = mintPrice;
        allowLists[signer].startTime = startTime;
        allowLists[signer].endTime = endTime;
        allowLists[signer].maxPerWallet = maxPerWallet;
    }

    /**
    @notice Remove a list.
    */
    function _removeAllowList(address signer) internal {
        allowLists[signer].exists = false;
    }
}
