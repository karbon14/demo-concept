import React from 'react'
import 'isomorphic-unfetch'
import Head from 'next/head'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import ethUtil from 'ethereumjs-util'
import Component from '@reactions/component'
import { Header } from 'Components/Header'
import { LanguageProvider, LanguageContext } from 'Components/SwitcherLang'
import { ProofForm } from 'Components/ProofForm'
import { EthereumProvider } from 'Components/EthereumProvider'
import { toast, ToastContainer } from 'Components/Toast'
import { NavMenu } from 'Components/NavMenu'
import { theme } from 'Common/Core'
import { Signalhub, Ipfs } from 'Providers'

import {
  abi as ProofLifeABI,
  networks as ProofLifeNetworks
} from 'build/contracts/ProofLife.json'

const onSubmit = async ({
  values,
  api,
  accounts,
  web3,
  getTranslation,
  channel,
  broadcast
}) => {
  const proofData = { id: new Date().getTime(), values: JSON.stringify(values) }
  const message = JSON.stringify(proofData)

  const hash = web3.sha3(message)
  const address = accounts.addresses[0]

  web3.eth.sign(address, hash, (err, res) => {
    if (err) {
      api.setSubmitting(false)
      toast.error(getTranslation('poofForm.signedError'), {
        position: toast.POSITION.BOTTOM_LEFT
      })
    }

    if (res) {
      api.resetForm()
      api.setSubmitting(false)
      toast.success(getTranslation('poofForm.signedOK'), {
        position: toast.POSITION.BOTTOM_LEFT
      })

      const signedHash = res

      broadcast(channel, { address, hash, signedHash, message })

      const r = ethUtil.toBuffer(signedHash.slice(0, 66))
      const s = ethUtil.toBuffer('0x' + signedHash.slice(66, 130))
      const v = ethUtil.bufferToInt(
        ethUtil.toBuffer('0x' + signedHash.slice(130, 132))
      )
      const m = ethUtil.toBuffer(hash)
      const pub = ethUtil.ecrecover(m, v, r, s)
      const recoveredSignAdress =
        '0x' + ethUtil.pubToAddress(pub).toString('hex')

      if (address === recoveredSignAdress) {
        // let m = JSON.parse(message)
        // m = { ...m, values: JSON.parse(m.values) }
        // console.log('Sign validation OK. Data: ', m)
      }
    }
  })
}

const updateUI = async ({ deployedContracts, setState }) => {
  const { ProofLife = {} } = deployedContracts
  // Get Data
  await ProofLife.getScribes((err, res) => {
    !err && setState({ scribes: res })
  })
}

const Index = ({ process }) => (
  <div>
    <Head>
      <title>Karbon14 | Demo</title>
    </Head>

    <Signalhub.Provider>
      <Signalhub.Consumer>
        {({ messages, channel, broadcast }) => (
          <EthereumProvider
            contracts={
              process.env.NETWORK
                ? [
                    {
                      name: 'ProofLife',
                      ABI: ProofLifeABI,
                      address: ProofLifeNetworks[process.env.NETWORK]?.address
                    }
                  ]
                : []
            }
          >
            {({ accounts = {}, deployedContracts = {}, web3 }) => (
              <Component
                initialState={{
                  scribes: []
                }}
                deployedContracts={deployedContracts}
                didUpdate={({ props, prevProps, setState }) => {
                  if (
                    !isEqual(
                      props.deployedContracts,
                      prevProps.deployedContracts
                    )
                  )
                    updateUI({ deployedContracts, accounts, setState, web3 })
                }}
                render={({ state }) => (
                  <LanguageProvider>
                    <LanguageContext.Consumer>
                      {({ getTranslation, selectedLanguage }) => (
                        <div>
                          <Header
                            getTranslation={getTranslation}
                            selectedLanguage={selectedLanguage}
                          />

                          <div className="contentWrapper">
                            <NavMenu
                              items={[
                                {
                                  name: getTranslation('navMenu.newProof'),
                                  icon: require('/static/icons/plus.svg'),
                                  route: '/',
                                  selected: true
                                },
                                {
                                  name: getTranslation('navMenu.pastProof'),
                                  icon: require('/static/icons/calendar.svg'),
                                  route: '/history'
                                },
                                {
                                  name: `${getTranslation(
                                    'navMenu.scribes'
                                  )} (${state.scribes.length})`,
                                  icon: require('/static/icons/explore.svg'),
                                  route: '/scribes'
                                },
                                {
                                  name: `${getTranslation(
                                    'navMenu.messages'
                                  )} (${messages.length})`,
                                  icon: require('/static/icons/messages.svg'),
                                  route: '/messages'
                                }
                              ]}
                            />

                            <Ipfs.Provider>
                              <Ipfs.Consumer>
                                {({ addData }) => (
                                  <ProofForm
                                    getTranslation={getTranslation}
                                    onSubmit={(values, api) =>
                                      onSubmit({
                                        values,
                                        api,
                                        accounts,
                                        web3,
                                        getTranslation,
                                        channel,
                                        broadcast,
                                        addData
                                      })
                                    }
                                  />
                                )}
                              </Ipfs.Consumer>
                            </Ipfs.Provider>
                          </div>
                        </div>
                      )}
                    </LanguageContext.Consumer>
                  </LanguageProvider>
                )}
              />
            )}
          </EthereumProvider>
        )}
      </Signalhub.Consumer>
      <ToastContainer theme={theme} hideProgressBar />
    </Signalhub.Provider>
  </div>
)

Index.propTypes = {
  process: PropTypes.object,
  deployedContracts: PropTypes.array
}

export default Index
