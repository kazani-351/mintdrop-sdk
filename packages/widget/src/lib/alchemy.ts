// @todo - move me into shared pnpm packages lib

export function getChain(chainId: number) {
  return CHAINS.find((chain) => chain.chainId === chainId)
}

export const CHAINS = [
  {
    chainId: 1,
    name: "Ethereum",
    description: "The gold standard in blockchains.",
    image: "/logos/ethereum.svg",
    httpUrl:
      "https://eth-mainnet.g.alchemy.com/v2/t6QZvf2vDFtPpsrDA08xHFyQkLuJuran",
    wsUrl: "wss://eth-mainnet.g.alchemy.com/v2/t6QZvf2vDFtPpsrDA08xHFyQkLuJuran"
  },
  {
    testnet: true,
    chainId: 4,
    name: "Rinkeby",
    description:
      "PoA testnet started by the Ethereum team. Uses Clique PoA consensus protocol.",
    image: "/logos/ethereum.svg",
    httpUrl:
      "https://eth-rinkeby.g.alchemy.com/v2/t6QZvf2vDFtPpsrDA08xHFyQkLuJuran",
    wsUrl: "wss://eth-rinkeby.g.alchemy.com/v2/t6QZvf2vDFtPpsrDA08xHFyQkLuJuran"
  },
  {
    testnet: true,
    chainId: 5,
    name: "Goerli",
    description:
      "A cross-client proof-of-authority testing network for Ethereum.",
    image: "/logos/ethereum.svg",
    httpUrl:
      "https://eth-goerli.g.alchemy.com/v2/t6QZvf2vDFtPpsrDA08xHFyQkLuJuran",
    wsUrl: "wss://eth-goerli.g.alchemy.com/v2/t6QZvf2vDFtPpsrDA08xHFyQkLuJuran"
  }
  // We'll do Polygon and L2's shortly.
  // {
  //   chainId: 137,
  //   name: "Polygon",
  //   description: "A sidechain alternative that is much cheaper to deploy.",
  //   image: "/logos/polygon.svg"
  // },
  // {
  //   testnet: true,
  //   chainId: 80001,
  //   name: "Mumbai",
  //   description:
  //     "Mumbai Testnet replicates the Polygon Mainnet, which is to be used for testing.",
  //   image: "/logos/polygon.svg"
  // }
]
