import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import { Providers } from 'Providers'
import { ToastContainer } from 'Components/Toast'
import { theme } from 'Common/Core'
import ReactionComponent from '@reactions/component'
import { isEqual } from 'lodash'
import { abi as ProofLifeABI, networks as ProofLifeNetworks } from 'build/contracts/ProofLife.json'

const getScribe = async (address, ProofLife) => {
  return new Promise(resolve => {
    ProofLife.getScribe(address, (err, res = []) => {
      if (!err) {
        const [firstName = '', lastName = ''] = res
        resolve({ address, firstName, lastName })
      }
    })
  })
}

const getProofLifeContract = (network = []) => {
  return network.length ? [{ name: 'ProofLife', ABI: ProofLifeABI, address: ProofLifeNetworks[network].address }] : []
}

const mapScribe = scribes => scribes.map(scribe => ({ address: scribe, firstName: '', lastName: '' }))

const updateUI = async ({ deployedContracts, accounts, setState }) => {
  const { ProofLife = {} } = deployedContracts

  ProofLife.getScribes(async (err, res) => {
    if (!err) {
      const scribes = mapScribe(res)
      setState({ scribes })

      const scribesWithDetails = []
      for (let x = 0; x < scribes.length; x++) {
        const scribeWithDetail = await getScribe(scribes[x].address, ProofLife)
        scribesWithDetails.push(scribeWithDetail)
      }

      const scribeData = scribesWithDetails.find(_ => _.address === accounts.addresses[0]) || {}
      const isScribe = scribeData.address ? true : false

      setState({
        scribes: scribesWithDetails,
        isScribe,
        scribeData,
        accountsAddress: accounts.addresses[0],
        contractDataLoaded: true
      })
    }
  })
}

export default class Karbon14 extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx)
    return { pageProps, pathname: router.pathname, env: process.env, query: router.query }
  }

  render() {
    const { Component, pageProps, pathname, env, query } = this.props

    return (
      <Container>
        <Head>
          <title>Karbon14 | Demo</title>
        </Head>

        <Providers contract={getProofLifeContract(env.NETWORK)} pathname={pathname}>
          {({ translations, ethereum, routerNext, signalHub, ipfs }) => {
            const { accounts = {}, deployedContracts = {}, web3 } = ethereum

            return (
              <React.Fragment>
                <ReactionComponent
                  initialState={{
                    scribes: [],
                    isScribe: undefined,
                    scribeData: {},
                    contractDataLoaded: false,
                    web3Updater: false
                  }}
                  deployedContracts={deployedContracts}
                  accounts={accounts}
                  didUpdate={({ props, prevProps, state, prevState, setState }) => {
                    if (state.contractDataLoaded !== prevState.contractDataLoaded) {
                      // Set signalHub listener
                      const receivedMsg = translations.getTranslation('proofRequest.receivedMsg')
                      signalHub.setReceivedMsg(receivedMsg)
                      signalHub.subscribe(signalHub.channel).on('data', message => {
                        if (message.selectedScribe === accounts.addresses[0]) signalHub.saveMessage(message)
                      })
                    }

                    if (!isEqual(props.accounts, prevProps.accounts)) {
                      // Update UI if Metamask Account is changed
                      if (deployedContracts.ProofLife) updateUI({ deployedContracts, accounts, setState, web3 })
                    }

                    if (
                      state.contractDataLoaded !== prevState.contractDataLoaded ||
                      state.isScribe !== prevState.isScribe
                    ) {
                      // Verify route for Metamask Account
                      // If no correct, redidect to a valid one
                      const isScribeRoute = routerNext.currentRoute.indexOf('proof-request') !== -1
                      if (state.isScribe && !isScribeRoute) {
                        Router.push('/proof-request', '/proof-request', { shallow: true })
                      } else if (!state.isScribe && isScribeRoute) {
                        Router.push('/', '/', { shallow: true })
                      }
                    }
                  }}
                  render={({ state }) => {
                    const proofLifeContract = { ...state }

                    const currentProps = {
                      translations,
                      ethereum,
                      routerNext: { pathname, query, ...routerNext },
                      signalHub,
                      proofLifeContract,
                      ipfs,
                      ...pageProps
                    }
                    return <Component {...currentProps} />
                  }}
                />

                <ToastContainer theme={theme} hideProgressBar />
              </React.Fragment>
            )
          }}
        </Providers>
      </Container>
    )
  }
}
