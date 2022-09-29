// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

abstract contract SharedSigners {
  /**
    @notice Generate a Recover the signer address for the signature.
    */
  function _recoverSigner(bytes calldata signature)
    internal
    view
    returns (address)
  {
    bytes32 message = _generateMessage(msg.sender);
    address signer = _recover(message, signature);
    return signer;
  }

  /**
    @notice Recover the signer address for the signature.
    */
  function _recover(bytes32 message, bytes calldata signature)
    internal
    pure
    returns (address)
  {
    return ECDSA.recover(message, signature);
  }

  /**
    @notice Generates a message for a given data input that will be signed
    off-chain using ECDSA.
     */
  function _generateMessage(address to) internal pure returns (bytes32) {
    bytes32 hash = keccak256(abi.encodePacked(to));
    return ECDSA.toEthSignedMessageHash(hash);
  }
}
