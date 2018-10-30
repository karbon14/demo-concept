import React from 'react'
import 'isomorphic-unfetch'
import Head from 'next/head'
import { Header } from 'Components/Header'
import { LanguageProvider, LanguageContext } from 'Components/SwitcherLang'
import { ProofForm } from 'Components/ProofForm'
import { EthereumProvider } from 'Components/EthereumProvider'
import { toast, ToastContainer } from 'Components/Toast'
import { NavMenu } from 'Components/NavMenu'
import { theme } from 'Common/Core'
import { Signalhub, Ipfs } from 'Providers'

const onSubmit = async ({
  values,
  api,
  accounts,
  web3,
  getTranslation,
  channel,
  broadcast
}) => {
  const message = {
    id: new Date().getTime(),
    value: JSON.stringify(values)
  }

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

      broadcast(channel, { address, message: res })
    }
  })
}

const Index = () => (
  <div>
    <Head>
      <title>Karbon14 | Demo</title>
    </Head>

    <Signalhub.Provider>
      <Signalhub.Consumer>
        {({ messages, channel, broadcast }) => (
          <EthereumProvider contracts={[]}>
            {({ accounts = {}, web3 }) => {
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
                                route: '/',
                                selected: true
                              },
                              {
                                name: getTranslation('navMenu.pastProof'),
                                icon: require('/static/icons/calendar.svg'),
                                route: '/history'
                              },
                              {
                                name: getTranslation('navMenu.notaries'),
                                icon: require('/static/icons/explore.svg'),
                                route: '/notaries'
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
              )
            }}
          </EthereumProvider>
        )}
      </Signalhub.Consumer>
      <ToastContainer theme={theme} hideProgressBar />
    </Signalhub.Provider>
  </div>
)

export default Index
