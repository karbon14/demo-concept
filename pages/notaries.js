import React from 'react'
import 'isomorphic-unfetch'
import Head from 'next/head'
import { Header } from 'Components/Header'
import { LanguageProvider, LanguageContext } from 'Components/SwitcherLang'
import { CriptoNotaries } from 'Components/CriptoNotaries'
import { EthereumProvider } from 'Components/EthereumProvider'
import { ToastContainer } from 'Components/Toast'
import { NavMenu } from 'Components/NavMenu'
import { theme } from 'Common/Core'
import { Signalhub } from 'Providers'

const Notaries = () => (
  <div>
    <Head>
      <title>Karbon14 | Demo</title>
    </Head>
    <Signalhub.Provider>
      <Signalhub.Consumer>
        {({ messages }) => (
          <EthereumProvider contracts={[]}>
            {() => {
              return (
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
                                name: getTranslation('navMenu.notaries'),
                                icon: require('/static/icons/explore.svg'),
                                route: '/notaries',
                                selected: true
                              },
                              {
                                name: `${getTranslation('navMenu.messages')} (${
                                  messages.length
                                })`,
                                icon: require('/static/icons/messages.svg'),
                                route: '/messages'
                              }
                            ]}
                          />

                          <CriptoNotaries getTranslation={getTranslation} />
                        </div>
                      </div>
                    )}
                  </LanguageContext.Consumer>
                </LanguageProvider>
              )
            }}
          </EthereumProvider>
        )}
      </Signalhub.Consumer>
      <ToastContainer theme={theme} hideProgressBar />
    </Signalhub.Provider>
  </div>
)

export default Notaries
