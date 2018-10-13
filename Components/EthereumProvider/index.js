import React from 'react'
import PropTypes from 'prop-types'
import Component from '@reactions/component'
import getTransactionReceiptMined from './Helpers'

const EthereumContext = React.createContext()

const deployContract = async (web3, contract) => {
  return web3.eth.contract(contract.ABI).at(contract.address)
}

const EthereumProvider = ({ contracts = [], children }) => (
  <EthereumContext.Consumer>
    {() => (
      <Component
        initialState={{
          connected: false,
          web3: undefined,
          accounts: { loading: true, addresses: [] },
          monitorErrors: [],
          contracts,
          deployedContracts: []
        }}
        didMount={({ state, setState }) => {
          window.addEventListener('load', () => {
            if (window.web3) {
              window.web3.eth.getTransactionReceiptMined = getTransactionReceiptMined

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
          })
        }}
        render={({ state }) => {
          const {
            connected,
            web3,
            accounts,
            monitorErrors,
            contracts,
            deployedContracts
          } = state
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
  children: PropTypes.any.isRequired,
  contracts: PropTypes.array
}

export { EthereumProvider }
