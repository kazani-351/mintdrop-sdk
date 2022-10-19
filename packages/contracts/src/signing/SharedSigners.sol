// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

error SignatureError(string reason);

abstract contract SharedSigners {
    /**
    @notice Generate a Recover the signer address for the signature.
    */
    function _recoverSigner(bytes memory signature)
        internal
        view
        returns (address)
    {
        if (signature.length != 65)
            revert SignatureError("Invalid Signature Length");
        bytes32 _msg = _generateMessage(msg.sender);
        (address _signer, ) = ECDSA.tryRecover(_msg, signature);

        return _signer;
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
