// SPDX-License-Identifier: MIT
pragma solidity >=0.8.9;

import "erc721a/contracts/ERC721A.sol";

// error ContractsCannotMint();
// error ExceedsMaxSupply();
// error ExceedsMaxPerWallet();
// error InsufficientPayment();
// error MintNotStarted();
// error MintCompleted();
// error PublicMintDisabled();

abstract contract Mintable {
    function _mint(address to, uint256 quantity) internal virtual;

    function _mintCount(address owner) internal view virtual returns (uint256);

    function _totalCount() internal view virtual returns (uint256);
}
