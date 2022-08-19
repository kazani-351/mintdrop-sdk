export function etherscanAddressURL(address, chainId = 1) {
  return etherscanHost(chainId) + "/address/" + address
}

export function etherscanTxURL(hash, chainId = 1) {
  return etherscanHost(chainId) + "/tx/" + hash
}

export function etherscanHost(chainId = 1) {
  switch (chainId) {
    case 1:
      return `https://etherscan.io`
    case 3:
      return `https://ropsten.etherscan.io`
    case 4:
      return `https://rinkeby.etherscan.io`
    case 137:
      return `https://polygonscan.com`
    case 80001:
      return `https://mumbai.polygonscan.com`
  }
}
