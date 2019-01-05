import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import { Providers } from 'Providers'
import ReactionComponent from '@reactions/component'
import { isEqual } from 'lodash'
import { toast } from 'Components/Core/Toast'
import { ToastContainer } from 'Components/Core/Toast'
import { abi as ProofLifeABI, networks as ProofLifeNetworks } from '../build/contracts/ProofLife.json'
import 'Common/index.scss'

const getProof = async (index, ProofLife) => {
  return new Promise(resolve => {
    ProofLife.getProof(index, (err, res = []) => {
      if (!err) {
        const [ipfs = '', hash = ''] = res
        resolve({ ipfs, hash })
      }
    })
  })
}

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
  const accountAddress = accounts.addresses[0]

  ProofLife.getScribes(async (err, res) => {
    if (!err) {
      const scribes = mapScribe(res)
      setState({ scribes })

      const scribesWithDetails = []
      for (let x = 0; x < scribes.length; x++) {
        const scribeWithDetail = await getScribe(scribes[x].address, ProofLife)
        scribesWithDetails.push(scribeWithDetail)
      }

      const scribeData = scribesWithDetails.find(_ => _.address === accountAddress) || {}
      const isScribe = scribeData.address ? true : false

      setState({
        scribes: scribesWithDetails,
        isScribe,
        scribeData,
        accountAddress,
        contractDataLoaded: true
      })
    }
  })

  await ProofLife.getCountProof({ from: accountAddress }, async (err, res) => {
    if (!err) {
      const proofWithDetails = []
      for (let x = 0; x < res.toNumber(); x++) {
        const prrofDetail = await getProof(x, ProofLife)
        proofWithDetails.push(prrofDetail)
      }

      setState({
        proofsCount: res.toNumber(),
        proofs: proofWithDetails.reverse()
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

  componentDidMount() {
    // TODO: workaround to fix Next.js version 7 issue
    // https://github.com/zeit/next-plugins/issues/282#issuecomment-446379427
    Router.events.on('routeChangeComplete', () => {
      if (process.env.NODE_ENV !== 'production') {
        const els = document.querySelectorAll('link[href*="/_next/static/chunks/styles.chunk.css"]')
        const timestamp = new Date().valueOf()
        els[0].href = '/_next/static/chunks/styles.chunk.css?v=' + timestamp
      }
    })
  }

  render() {
    const { Component, pageProps, pathname, env, query } = this.props

    return (
      <Container>
        <Head>
          <title>Karbon14 | Demo</title>
        </Head>

        <Providers contract={getProofLifeContract(env.NETWORK)} pathname={pathname}>
          {({ translations, ethereum, routerNext, socketIO, ipfs }) => {
            const { accounts = {}, deployedContracts = {}, web3, monitorErrors } = ethereum

            if (monitorErrors.length) {
              toast.error(translations.getTranslation('proofForm.metamaskError'), {
                pauseOnFocusLoss: false,
                position: toast.POSITION.BOTTOM_LEFT
              })
            }

            return (
              <React.Fragment>
                <ReactionComponent
                  initialState={{
                    scribes: [],
                    isScribe: undefined,
                    scribeData: {},
                    proofsCount: '',
                    proofs: [],
                    contractDataLoaded: false
                  }}
                  deployedContracts={deployedContracts}
                  accounts={accounts}
                  didUpdate={({ props, prevProps, state, prevState, setState }) => {
                    if (state.contractDataLoaded !== prevState.contractDataLoaded) {
                      // Set socketIO listener
                      socketIO.subscribe(socketIO.channel, message => {
                        if (state.isScribe) {
                          // If is a scribe
                          socketIO.setReceivedMsg(translations.getTranslation('proofRequest.receivedMsg'))
                          if (message.selectedScribe === accounts.addresses[0]) socketIO.saveMessage(message)
                        } else {
                          // If is not a scribe
                          socketIO.setReceivedMsg(translations.getTranslation('incomingProof.receivedMsg'))
                          if (message.approvedUser === accounts.addresses[0]) socketIO.saveMessage(message)
                        }
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

                      socketIO.getMessages(accounts.addresses[0], state.isScribe)
                    }
                  }}
                  render={({ state, setState }) => {
                    const proofLifeContract = { ...state, deployedContracts }

                    const currentProps = {
                      translations,
                      ethereum,
                      routerNext: { pathname, query, ...routerNext },
                      socketIO,
                      proofLifeContract,
                      ipfs,
                      env,
                      updateUI: () => updateUI({ deployedContracts, accounts, setState }),
                      ...pageProps
                    }
                    return <Component {...currentProps} />
                  }}
                />

                <ToastContainer hideProgressBar />
              </React.Fragment>
            )
          }}
        </Providers>
      </Container>
    )
  }
}
