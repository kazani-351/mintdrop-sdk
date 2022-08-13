// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "../Mintdrop721A.sol";

contract SignersMock is Mintdrop721A {
  constructor() Mintdrop721A("SignersMock", "", 10000, 0, 0, payable(0x0)) {}

  function check(bytes calldata signature) public view returns (address) {
    bytes32 message = _generateMessage(msg.sender);
    return _recover(message, signature);
  }
}
