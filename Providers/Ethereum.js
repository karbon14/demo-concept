import React from 'react'
import PropTypes from 'prop-types'
import Component from '@reactions/component'

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
          accounts: { loading: true, addresses: [] },
          monitorErrors: [],
          contracts,
          deployedContracts: {}
        }}
        didMount={({ state, setState }) => {
          if (window.web3) {
            // getTransactionReceipt Helper
            window.web3.eth.getTransactionReceiptMined = (txHash, interval) => {
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

            // Save Web3 State
            const web3State = { connected: true, web3: window.web3 }
            setState({ ...web3State })

            // Deploy Contracts
            let deployedContracts = {}
            state.contracts.map(async c => {
              const contract = await deployContract(window.web3, c)
              deployedContracts = { ...deployedContracts, [c.name]: contract }
            })

            // Get available Accounts
            window.web3.eth.getAccounts((err, addresses) => {
              const accounts = {
                loading: false,
                addresses,
                locked: !addresses.length
              }
              setState({ accounts, deployedContracts })
            })
          } else {
            setState({
              monitorErrors: [...state.monitorErrors, 'Not found web3']
            })
          }
        }}
        render={({ state }) => {
          const { connected, web3, accounts, monitorErrors, contracts, deployedContracts } = state
          return children({
            connected,
            web3,
            accounts,
            monitorErrors,
            contracts,
            deployedContracts
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
