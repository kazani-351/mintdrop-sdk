// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "./Mintable.sol";
import "../crypto/SharedSigners.sol";
import "../extensions/Timing.sol";

error InvalidSignature();

abstract contract AccessListMintable is SharedSigners, Mintable, Timing {
  struct AccessListConfig {
    address signer;
    uint256 mintPrice;
    uint64 startTime;
    uint256 maxPerWallet;
  }

  struct AccessListSigner {
    uint256 mintPrice;
    uint64 startTime;
    uint256 maxPerWallet;
    bool exists;
    uint256 mintCount;
  }

  mapping(address => AccessListSigner) public accessLists;
  mapping(bytes => uint256) internal usedSignatures;

  constructor(AccessListConfig[] memory _accessLists) {
    for (uint256 i = 0; i < _accessLists.length; i++) {
      AccessListConfig memory input = _accessLists[i];
      _setAccessList(
        input.signer,
        input.mintPrice,
        input.startTime,
        input.maxPerWallet
      );
    }
  }

  function _hasAccessListStarted(address signer) internal view returns (bool) {
    AccessListSigner memory list = accessLists[signer];
    if (list.startTime != 0 && _isBeforeTimestamp(list.startTime)) {
      return false;
    }
    return true;
  }

  function _canSignatureMint(bytes calldata signature, uint256 count)
    internal
    view
    returns (bool)
  {
    address signer = _recoverSigner(signature);
    AccessListSigner memory _list = accessLists[signer];
    if (!_list.exists) revert InvalidSignature();

    if (
      _list.maxPerWallet != 0 &&
      // @dev - is this right? Should we check total # of mints or just mints for this signature.
      // Perhaps this is where the definitions differ. maxPerWallet = global #, mintsPerSig = # of mints per sig
      (_mintCount(msg.sender) + count) > _list.maxPerWallet
    ) {
      revert ExceedsMaxPerWallet();
    }

    if (!_hasAccessListStarted(signer)) {
      revert MintNotStarted();
    }

    return true;
  }

  function _signatureMint(bytes calldata signature, uint256 count) internal {
    require(_canSignatureMint(signature, count));
    address signer = _recoverSigner(signature);

    uint256 _mintPrice = accessLists[signer].mintPrice;
    if (msg.value < _mintPrice * count) {
      revert InsufficientPayment();
    }

    accessLists[signer].mintCount += count;
    usedSignatures[bytes(signature)] += count;

    _mint(msg.sender, count);
  }

  /**
    @notice Returns the mint count for the list.
     */
  function _accessListCount(address signer) internal view returns (uint256) {
    return accessLists[signer].mintCount;
  }

  /**
  @notice Add a list.
  */
  function _setAccessList(
    address signer,
    uint256 mintPrice,
    uint64 startTime,
    uint256 maxPerWallet
  ) internal {
    accessLists[signer].exists = true;
    accessLists[signer].mintCount = 0;
    accessLists[signer].mintPrice = mintPrice;
    accessLists[signer].startTime = startTime;
    accessLists[signer].maxPerWallet = maxPerWallet;
  }

  /**
    @notice Remove a list.
    */
  function _removeAccessList(address signer) internal {
    accessLists[signer].exists = false;
  }
}
