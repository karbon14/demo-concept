import React from 'react'
import PropTypes from 'prop-types'
import Component from '@reactions/component'

const getTransactionReceiptMined = function(txHash, interval) {
  const self = this
  const transactionReceiptAsync = function(resolve, reject) {
    self.getTransactionReceipt(txHash, (error, receipt) => {
      if (error) {
        reject(error)
      } else if (receipt == null) {
        setTimeout(() => transactionReceiptAsync(resolve, reject), interval ? interval : 500)
      } else {
        resolve(receipt)
      }
    })
  }

  if (Array.isArray(txHash)) {
    return Promise.all(txHash.map(oneTxHash => self.getTransactionReceiptMined(oneTxHash, interval)))
  } else if (typeof txHash === 'string') {
    return new Promise(transactionReceiptAsync)
  } else {
    throw new Error('Invalid Type: ' + txHash)
  }
}

const deployContract = async (web3, contract) => {
  return web3.eth.contract(contract.ABI).at(contract.address)
}

const EthereumContext = React.createContext({ web3: {} })

const EthereumProvider = ({ contracts = [], children }) => (
  <EthereumContext.Consumer>
    {() => (
      <Component
        initialState={{
          connected: false,
          web3: {},
          network: undefined,
          accounts: { loading: true, addresses: [] },
          monitorErrors: [],
          contracts,
          deployedContracts: {},
          getAccounts: ({ setState }) => {
            window.web3.eth.getAccounts((err, addresses) => {
              const accounts = { loading: false, addresses, locked: !addresses.length }
              setState({ accounts })
            })
          },
          getContracts: ({ state, setState }) => {
            let deployedContracts = {}
            state.contracts.map(async c => {
              const contract = await deployContract(window.web3, c)
              deployedContracts = { ...deployedContracts, [c.name]: contract }
              setState({ deployedContracts })
            })
          }
        }}
        didMount={({ state, setState }) => {
          if (window.web3) {
            // getTransactionReceipt Helper
            window.web3.eth.getTransactionReceiptMined = getTransactionReceiptMined

            // Save Web3 State
            const web3State = { connected: true, web3: window.web3 }
            setState({ ...web3State })

            // Deploy Contracts
            state.getContracts({ state, setState })

            // Get available Accounts
            state.getAccounts({ setState })
            window.web3.currentProvider.publicConfigStore.on('update', async () => {
              state.getAccounts({ setState })
            })

            // Get network by netId
            window.web3.version.getNetwork((err, netId) => {
              const networks = { '1': 'Mainnet', '2': 'Morden', '3': 'Ropsten', '4': 'Rinkevy', '42': 'Kovan' }
              if (!err && netId) setState({ network: networks[netId] })
            })
          } else {
            setState({
              monitorErrors: [...state.monitorErrors, 'Not found web3']
            })
          }
        }}
        render={({ state, setState }) => {
          const { connected, web3, network, accounts, monitorErrors, contracts, deployedContracts } = state
          return children({
            connected,
            web3,
            network,
            accounts,
            monitorErrors,
            contracts,
            deployedContracts,
            getContracts: () => state.getContracts({ state, setState }),
            getAccounts: () => state.getAccounts({ setState })
          })
        }}
      />
    )}
  </EthereumContext.Consumer>
)

EthereumProvider.propTypes = {
  children: PropTypes.any,
  contracts: PropTypes.array
}

export { EthereumProvider }
