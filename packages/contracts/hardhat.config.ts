import "@nomiclabs/hardhat-etherscan"
import "@nomiclabs/hardhat-waffle"
import "@typechain/hardhat"
import "hardhat-gas-reporter"
import "solidity-coverage"

import * as dotenv from "dotenv"
import { HardhatUserConfig, task } from "hardhat/config"

dotenv.config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (_, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },

  typechain: {
    outDir: "dist",
    target: "ethers-v5",
    alwaysGenerateOverloads: false // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    // externalArtifacts: ["externalArtifacts/*.json"] // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },

  networks: {},

  gasReporter: {
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    currency: "USD"
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
}

if (process.env.RINKEBY_URL) {
  Object.assign(config, {
    rinkeby: {
      url: process.env.RINKEBY_URL
    }
  })
}

export default config
