export const DROP_ID = "fakefakefakefakefakefake123"

export default {
  id: DROP_ID,
  mintPrice: 0,
  maxSupply: 1111,
  startsAt: "2022-10-17T23:00:00.000Z",
  startTime: 1666047600,
  endsAt: null,
  endTime: 0,
  groups: [
    {
      name: "AllowList",
      mintPrice: 0.01,
      startTime: 1665990000
    }
  ],
  chainId: 5,
  address: "0x664822D98b146c0Bb5fF8FC2612Eddc68462624b",
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "_name",
          type: "string",
          internalType: "string"
        },
        {
          name: "_symbol",
          type: "string",
          internalType: "string"
        },
        {
          name: "_baseTokenURI",
          type: "string",
          internalType: "string"
        },
        {
          name: "_publicMinting",
          type: "tuple",
          components: [
            {
              name: "enabled",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "mintPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "startTime",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "maxPerWallet",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          internalType: "struct PublicMintable.PublicConfig"
        },
        {
          name: "_allowLists",
          type: "tuple[]",
          components: [
            {
              name: "signer",
              type: "address",
              internalType: "address"
            },
            {
              name: "mintPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "startTime",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "maxPerWallet",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          internalType: "struct AllowListMintable.AllowListConfig[]"
        },
        {
          name: "_payees",
          type: "address[]",
          internalType: "address[]"
        },
        {
          name: "_shares",
          type: "uint96[]",
          internalType: "uint96[]"
        },
        {
          name: "_beneficiary",
          type: "address",
          internalType: "address"
        },
        {
          name: "_bips",
          type: "uint96",
          internalType: "uint96"
        }
      ],
      stateMutability: "nonpayable"
    },
    {
      name: "ApprovalCallerNotOwnerNorApproved",
      type: "error",
      inputs: []
    },
    {
      name: "ApprovalQueryForNonexistentToken",
      type: "error",
      inputs: []
    },
    {
      name: "BalanceQueryForZeroAddress",
      type: "error",
      inputs: []
    },
    {
      name: "ContractsCannotMint",
      type: "error",
      inputs: []
    },
    {
      name: "MintERC2309QuantityExceedsLimit",
      type: "error",
      inputs: []
    },
    {
      name: "MintToZeroAddress",
      type: "error",
      inputs: []
    },
    {
      name: "MintZeroQuantity",
      type: "error",
      inputs: []
    },
    {
      name: "OwnerQueryForNonexistentToken",
      type: "error",
      inputs: []
    },
    {
      name: "OwnershipNotInitializedForExtraData",
      type: "error",
      inputs: []
    },
    {
      name: "SignatureError",
      type: "error",
      inputs: [
        {
          name: "reason",
          type: "string",
          internalType: "string"
        }
      ]
    },
    {
      name: "TransferCallerNotOwnerNorApproved",
      type: "error",
      inputs: []
    },
    {
      name: "TransferFromIncorrectOwner",
      type: "error",
      inputs: []
    },
    {
      name: "TransferToNonERC721ReceiverImplementer",
      type: "error",
      inputs: []
    },
    {
      name: "TransferToZeroAddress",
      type: "error",
      inputs: []
    },
    {
      name: "URIQueryForNonexistentToken",
      type: "error",
      inputs: []
    },
    {
      name: "WithdrawFailed",
      type: "error",
      inputs: []
    },
    {
      name: "Approval",
      type: "event",
      inputs: [
        {
          name: "owner",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "approved",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "tokenId",
          type: "uint256",
          indexed: true,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      name: "ApprovalForAll",
      type: "event",
      inputs: [
        {
          name: "owner",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "operator",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "approved",
          type: "bool",
          indexed: false,
          internalType: "bool"
        }
      ],
      anonymous: false
    },
    {
      name: "ConsecutiveTransfer",
      type: "event",
      inputs: [
        {
          name: "fromTokenId",
          type: "uint256",
          indexed: true,
          internalType: "uint256"
        },
        {
          name: "toTokenId",
          type: "uint256",
          indexed: false,
          internalType: "uint256"
        },
        {
          name: "from",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "to",
          type: "address",
          indexed: true,
          internalType: "address"
        }
      ],
      anonymous: false
    },
    {
      name: "OwnershipTransferred",
      type: "event",
      inputs: [
        {
          name: "previousOwner",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "newOwner",
          type: "address",
          indexed: true,
          internalType: "address"
        }
      ],
      anonymous: false
    },
    {
      name: "Paused",
      type: "event",
      inputs: [
        {
          name: "account",
          type: "address",
          indexed: false,
          internalType: "address"
        }
      ],
      anonymous: false
    },
    {
      name: "Transfer",
      type: "event",
      inputs: [
        {
          name: "from",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "to",
          type: "address",
          indexed: true,
          internalType: "address"
        },
        {
          name: "tokenId",
          type: "uint256",
          indexed: true,
          internalType: "uint256"
        }
      ],
      anonymous: false
    },
    {
      name: "Unpaused",
      type: "event",
      inputs: [
        {
          name: "account",
          type: "address",
          indexed: false,
          internalType: "address"
        }
      ],
      anonymous: false
    },
    {
      name: "__mintdrop",
      type: "function",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string"
        }
      ],
      stateMutability: "pure"
    },
    {
      name: "allowListMintCount",
      type: "function",
      inputs: [
        {
          name: "signer",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "allowLists",
      type: "function",
      inputs: [
        {
          name: "",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [
        {
          name: "exists",
          type: "bool",
          internalType: "bool"
        },
        {
          name: "mintCount",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "mintPrice",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "startTime",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "maxPerWallet",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "approve",
      type: "function",
      inputs: [
        {
          name: "to",
          type: "address",
          internalType: "address"
        },
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [],
      stateMutability: "payable"
    },
    {
      name: "balanceOf",
      type: "function",
      inputs: [
        {
          name: "owner",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "baseTokenURI",
      type: "function",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "canPublicMint",
      type: "function",
      inputs: [
        {
          name: "_to",
          type: "address",
          internalType: "address"
        },
        {
          name: "_count",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "canSignatureMint",
      type: "function",
      inputs: [
        {
          name: "to",
          type: "address",
          internalType: "address"
        },
        {
          name: "signature",
          type: "bytes",
          internalType: "bytes"
        },
        {
          name: "count",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "getApproved",
      type: "function",
      inputs: [
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "isApprovedForAll",
      type: "function",
      inputs: [
        {
          name: "owner",
          type: "address",
          internalType: "address"
        },
        {
          name: "operator",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "name",
      type: "function",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "owner",
      type: "function",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "ownerOf",
      type: "function",
      inputs: [
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "pause",
      type: "function",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      name: "paused",
      type: "function",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "publicMaxPerWallet",
      type: "function",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "publicMint",
      type: "function",
      inputs: [
        {
          name: "_to",
          type: "address",
          internalType: "address"
        },
        {
          name: "_count",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [],
      stateMutability: "payable"
    },
    {
      name: "publicMintEnabled",
      type: "function",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "publicMintPrice",
      type: "function",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "publicMinting",
      type: "function",
      inputs: [],
      outputs: [
        {
          name: "enabled",
          type: "bool",
          internalType: "bool"
        },
        {
          name: "mintPrice",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "startTime",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "maxPerWallet",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "publicStartTime",
      type: "function",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "removeAccessList",
      type: "function",
      inputs: [
        {
          name: "signer",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      name: "renounceOwnership",
      type: "function",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      name: "royaltyInfo",
      type: "function",
      inputs: [
        {
          name: "_tokenId",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "_salePrice",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address"
        },
        {
          name: "",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "safeTransferFrom",
      type: "function",
      inputs: [
        {
          name: "from",
          type: "address",
          internalType: "address"
        },
        {
          name: "to",
          type: "address",
          internalType: "address"
        },
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [],
      stateMutability: "payable"
    },
    {
      name: "safeTransferFrom",
      type: "function",
      inputs: [
        {
          name: "from",
          type: "address",
          internalType: "address"
        },
        {
          name: "to",
          type: "address",
          internalType: "address"
        },
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "_data",
          type: "bytes",
          internalType: "bytes"
        }
      ],
      outputs: [],
      stateMutability: "payable"
    },
    {
      name: "setAllowList",
      type: "function",
      inputs: [
        {
          name: "_signer",
          type: "address",
          internalType: "address"
        },
        {
          name: "_mintPrice",
          type: "uint256",
          internalType: "uint256"
        },
        {
          name: "_startTime",
          type: "uint64",
          internalType: "uint64"
        },
        {
          name: "_maxPerWallet",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      name: "setApprovalForAll",
      type: "function",
      inputs: [
        {
          name: "operator",
          type: "address",
          internalType: "address"
        },
        {
          name: "approved",
          type: "bool",
          internalType: "bool"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      name: "setPublicMintConfix",
      type: "function",
      inputs: [
        {
          name: "_config",
          type: "tuple",
          components: [
            {
              name: "enabled",
              type: "bool",
              internalType: "bool"
            },
            {
              name: "mintPrice",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "startTime",
              type: "uint256",
              internalType: "uint256"
            },
            {
              name: "maxPerWallet",
              type: "uint256",
              internalType: "uint256"
            }
          ],
          internalType: "struct PublicMintable.PublicConfig"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      name: "signatureMint",
      type: "function",
      inputs: [
        {
          name: "_to",
          type: "address",
          internalType: "address"
        },
        {
          name: "_sig",
          type: "bytes",
          internalType: "bytes"
        },
        {
          name: "_count",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [],
      stateMutability: "payable"
    },
    {
      name: "supportsInterface",
      type: "function",
      inputs: [
        {
          name: "interfaceId",
          type: "bytes4",
          internalType: "bytes4"
        }
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "symbol",
      type: "function",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "tokenURI",
      type: "function",
      inputs: [
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [
        {
          name: "",
          type: "string",
          internalType: "string"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "totalSupply",
      type: "function",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      stateMutability: "view"
    },
    {
      name: "transferFrom",
      type: "function",
      inputs: [
        {
          name: "from",
          type: "address",
          internalType: "address"
        },
        {
          name: "to",
          type: "address",
          internalType: "address"
        },
        {
          name: "tokenId",
          type: "uint256",
          internalType: "uint256"
        }
      ],
      outputs: [],
      stateMutability: "payable"
    },
    {
      name: "transferOwnership",
      type: "function",
      inputs: [
        {
          name: "newOwner",
          type: "address",
          internalType: "address"
        }
      ],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      name: "unpause",
      type: "function",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable"
    },
    {
      name: "withdraw",
      type: "function",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable"
    }
  ]
}
