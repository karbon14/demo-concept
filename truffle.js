const HDWalletProvider = require('truffle-hdwallet-provider')
const { ROPSTEN_MNEMONIC, MAINNET_MNEMONIC, RSK_TESTNET_MNEMONIC, INFURA_API_KEY } = process.env

module.exports = {
  migrations_directory: './migrations',
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    ropsten: {
      provider: () => new HDWalletProvider(ROPSTEN_MNEMONIC, `https://ropsten.infura.io/v3/${INFURA_API_KEY}`),
      gas: 4698712,
      network_id: '3'
    },
    live: {
      provider: () => new HDWalletProvider(MAINNET_MNEMONIC, `https://mainnet.infura.io/v3/${INFURA_API_KEY}`),
      gas: 4698712,
      network_id: '1'
    },
    rpc: {
      host: '127.0.0.1',
      port: 8545
    },
    RSKtestnet: {
      provider: () => new HDWalletProvider(RSK_TESTNET_MNEMONIC, 'https://public-node.testnet.rsk.co:443'),
      network_id: '*',
      gas: 2500000,
      gasPrice: 183000
    },
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
