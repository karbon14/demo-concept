import React from 'react'
import 'isomorphic-unfetch'
import Head from 'next/head'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import Component from '@reactions/component'
import { Header } from 'Components/Header'
import { LanguageProvider, LanguageContext } from 'Components/SwitcherLang'
import { MessagesArea } from 'Components/MessagesArea'
import { EthereumProvider } from 'Components/EthereumProvider'
import { ToastContainer } from 'Components/Toast'
import { NavMenu } from 'Components/NavMenu'
import { theme } from 'Common/Core'
import { Signalhub } from 'Providers'

import {
  abi as ProofLifeABI,
  networks as ProofLifeNetworks
} from 'build/contracts/ProofLife.json'

const updateUI = async ({ deployedContracts, setState }) => {
  const { ProofLife = {} } = deployedContracts
  // Get Data
  await ProofLife.getScribes((err, res) => {
    !err && setState({ scribes: res })
  })
}

const Messages = () => (
  <div>
    <Head>
      <title>Karbon14 | Demo</title>
    </Head>
    <Signalhub.Provider>
      <Signalhub.Consumer>
        {({ messages }) => (
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
            {({ accounts = {}, deployedContracts = {} }) => (
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
                    updateUI({ deployedContracts, accounts, setState })
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
                                  route: '/'
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
                                  route: '/messages',
                                  selected: true
                                }
                              ]}
                            />

                            <MessagesArea getTranslation={getTranslation} />
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

Messages.propTypes = {
  process: PropTypes.object,
  deployedContracts: PropTypes.array
}

export default Messages
