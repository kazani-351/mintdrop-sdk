// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "hardhat/console.sol";

import "../extensions/SignatureMintable.sol";

contract SignersMock is SignatureMintable {
  constructor() {}

  function check(bytes calldata signature) public view returns (address) {
    bytes32 message = _generateMessage(msg.sender);
    return _recover(message, signature);
  }
}
