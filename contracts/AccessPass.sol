// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.9;

import "./Mintdrop721A.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@divergencetech/ethier/contracts/erc721/BaseTokenURI.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract AccessPass is Mintdrop721A, ERC2981, BaseTokenURI {
  constructor(
    string memory name,
    string memory symbol,
    string memory baseTokenURI,
    uint256 _maxSupply,
    uint256 _price,
    uint96 royalties,
    address payable beneficiary
  )
    Mintdrop721A(name, symbol, _maxSupply, _price, royalties, beneficiary)
    BaseTokenURI(baseTokenURI)
  {
    maxSupply = _maxSupply;
    price = _price;

    if (beneficiary != address(0)) {
      ERC2981._setDefaultRoyalty(beneficiary, royalties);
    }
  }

  // @dev Minting based on access-list inclusion.
  function groupMint(bytes calldata signature, uint256 count) external payable {
    _groupMint(signature, msg.sender, count);
  }

  /**
    TODO - Make this configurable, which means we probably need to generate and compile the contract
    @dev Override ERC721A's initial token index.
     */
  function _startTokenId() internal pure override returns (uint256) {
    return 0;
  }

  // @dev: Include a mechanism to withdraw ether on the contract
  function withdraw() external onlyOwner {
    uint256 balance = address(this).balance;
    Address.sendValue(payable(owner()), balance);
  }

  // Metadata

  /**
  @notice If set, contract to which tokenURI() calls are proxied.
   */
  ITokenURIGenerator public renderingContract;

  /**
  @notice Sets the optional tokenURI override contract.
   */
  function setRenderingContract(ITokenURIGenerator _contract)
    external
    onlyOwner
  {
    renderingContract = _contract;
  }

  /**
  @notice If renderingContract is set then returns its tokenURI(tokenId)
  return value, otherwise returns the standard baseTokenURI + tokenId.
   */
  function tokenURI(uint256 tokenId)
    public
    view
    override
    returns (string memory)
  {
    if (address(renderingContract) != address(0)) {
      return renderingContract.tokenURI(tokenId);
    }
    return super.tokenURI(tokenId);
  }

  /** 
  @dev override multiple baseURI functions to use the BaseTokenURI lib
   */
  function _baseURI()
    internal
    view
    virtual
    override(BaseTokenURI, ERC721A)
    returns (string memory)
  {
    return BaseTokenURI.baseTokenURI;
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(Mintdrop721A, ERC2981)
    returns (bool)
  {
    return super.supportsInterface(interfaceId);
  }
}

interface ITokenURIGenerator {
  function tokenURI(uint256 tokenId) external view returns (string memory);
}
