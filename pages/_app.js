import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { RouterNext, Signalhub, Ipfs } from 'Providers'
import { ToastContainer } from 'Components/Toast'
import { theme } from 'Common/Core'
import { LanguageProvider, LanguageContext } from 'Components/SwitcherLang'
import { EthereumProvider } from 'Components/EthereumProvider'
import ReactionComponent from '@reactions/component'
import { isEqual } from 'lodash'
import { abi as ProofLifeABI, networks as ProofLifeNetworks } from 'build/contracts/ProofLife.json'

const getScribe = async (address, ProofLife) => {
  return new Promise(resolve => {
    ProofLife.getScribe(address, (err, res = []) => {
      if (!err) {
        const [firstName = '', lastName = ''] = res

        resolve({
          address,
          firstName,
          lastName
        })
      }
    })
  })
}

const mapScribe = scribes => scribes.map(scribe => ({ address: scribe, firstName: '', lastName: '' }))

const updateUI = async ({ deployedContracts, setState }) => {
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

      setState({ scribes: scribesWithDetails })
    }
  })
}

const getProofLifeContract = (network = []) => {
  return network.length
    ? [
        {
          name: 'ProofLife',
          ABI: ProofLifeABI,
          address: ProofLifeNetworks[network].address
        }
      ]
    : []
}

export default class Karbon14 extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps, pathname: router.pathname, env: process.env }
  }

  render() {
    const { Component, pageProps, pathname, env } = this.props

    return (
      <Container>
        <Head>
          <title>Karbon14 | Demo</title>
        </Head>
        <RouterNext.Provider pathname={pathname}>
          <Signalhub.Provider>
            <Ipfs.Provider>
              <Ipfs.Consumer>
                {({ addData }) => (
                  <RouterNext.Consumer>
                    {({ currentRoute }) => (
                      <LanguageProvider>
                        <LanguageContext.Consumer>
                          {({ getTranslation, selectedLanguage }) => (
                            <Signalhub.Consumer>
                              {({ messages, channel, broadcast }) => (
                                <EthereumProvider contracts={getProofLifeContract(env.NETWORK)}>
                                  {({ accounts = {}, deployedContracts = {}, web3 }) => (
                                    <ReactionComponent
                                      initialState={{
                                        scribes: []
                                      }}
                                      deployedContracts={deployedContracts}
                                      didUpdate={({ props, prevProps, setState }) => {
                                        if (!isEqual(props.deployedContracts, prevProps.deployedContracts))
                                          updateUI({ deployedContracts, accounts, setState, web3 })
                                      }}
                                      render={({ state }) => {
                                        const routerNext = { currentRoute }
                                        const language = { getTranslation, selectedLanguage }
                                        const signalHub = { messages, channel, broadcast }
                                        const ethereum = { accounts, deployedContracts, web3 }
                                        const ipfs = { addData }
                                        const proofLifeContract = { ...state }

                                        const currentProps = {
                                          routerNext,
                                          language,
                                          signalHub,
                                          ethereum,
                                          proofLifeContract,
                                          ipfs,
                                          ...pageProps
                                        }
                                        return <Component {...currentProps} />
                                      }}
                                    />
                                  )}
                                </EthereumProvider>
                              )}
                            </Signalhub.Consumer>
                          )}
                        </LanguageContext.Consumer>
                      </LanguageProvider>
                    )}
                  </RouterNext.Consumer>
                )}
              </Ipfs.Consumer>
              <ToastContainer theme={theme} hideProgressBar />
            </Ipfs.Provider>
          </Signalhub.Provider>
        </RouterNext.Provider>
      </Container>
    )
  }
}
