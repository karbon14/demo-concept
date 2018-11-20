import React from 'react'
import PropTypes from 'prop-types'
import Component from '@reactions/component'
import style from './style.scss'
import { Utils } from './Utils'
import { SwitcherForm, FormActions } from './SwitcherForm'
import { Personal, Identification, Service, Scribes } from './Forms'

const ProofForm = ({ getTranslation, scribes, signalHub, accounts, web3 }) => (
  <Utils>
    {({ blobToBase64, prepareData, onSendToScribe }) => (
      <Component
        initialState={{
          activeForm: 1,
          formsData: {
            personal: {},
            identification: {},
            service: {},
            scribes: {}
          }
        }}
        render={({ state, setState }) => (
          <section>
            <div className="container">
              <h3>{getTranslation('poofForm.title')}</h3>

              <div className="card">
                <SwitcherForm
                  forms={[
                    {
                      id: 1,
                      child: (
                        <Personal
                          onSubmit={(values, api) => {
                            setState({
                              formsData: { ...state.formsData, personal: values },
                              activeForm: state.activeForm + 1
                            })
                            api.setSubmitting(false)
                          }}
                          getTranslation={getTranslation}
                          formActions={api => (
                            <FormActions
                              formsNumber={4}
                              activeForm={state.activeForm}
                              disabledReset={!api.dirty || api.isSubmitting}
                              disabledSubmit={!api.dirty || api.isSubmitting || Object.keys(api.errors).length}
                              onReset={api.handleReset}
                              onBack={() => {
                                setState({ activeForm: state.activeForm - 1 })
                              }}
                              onSubmit={api.submitForm}
                              getTranslation={getTranslation}
                            />
                          )}
                        />
                      )
                    },
                    {
                      id: 2,
                      child: (
                        <Identification
                          onSubmit={(values, api) => {
                            setState({
                              formsData: {
                                ...state.formsData,
                                identification: values
                              },
                              activeForm: state.activeForm + 1
                            })
                            api.setSubmitting(false)
                          }}
                          getTranslation={getTranslation}
                          formActions={api => (
                            <FormActions
                              formsNumber={4}
                              activeForm={state.activeForm}
                              disabledReset={!api.dirty || api.isSubmitting}
                              disabledSubmit={!api.dirty || api.isSubmitting || Object.keys(api.errors).length}
                              onReset={api.handleReset}
                              onBack={() => {
                                setState({ activeForm: state.activeForm - 1 })
                              }}
                              onSubmit={api.submitForm}
                              getTranslation={getTranslation}
                            />
                          )}
                        />
                      )
                    },
                    {
                      id: 3,
                      child: (
                        <Service
                          onSubmit={(values, api) => {
                            setState({
                              formsData: {
                                ...state.formsData,
                                service: values
                              },
                              activeForm: state.activeForm + 1
                            })
                            api.setSubmitting(false)
                          }}
                          getTranslation={getTranslation}
                          formActions={api => (
                            <FormActions
                              formsNumber={4}
                              activeForm={state.activeForm}
                              disabledReset={!api.dirty || api.isSubmitting}
                              disabledSubmit={!api.dirty || api.isSubmitting || Object.keys(api.errors).length}
                              onReset={api.handleReset}
                              onBack={() => {
                                setState({ activeForm: state.activeForm - 1 })
                              }}
                              onSubmit={api.submitForm}
                              getTranslation={getTranslation}
                            />
                          )}
                        />
                      )
                    },
                    {
                      id: 4,
                      child: (
                        <Scribes
                          scribes={scribes}
                          onSubmit={async (values, api) => {
                            const formsData = {
                              ...state.formsData,
                              scribes: values
                            }
                            setState({ formsData })
                            const successMsg = getTranslation('poofForm.submitOK')
                            const errorMsg = getTranslation('poofForm.submitError')

                            const proof = await prepareData({
                              formsData,
                              api,
                              blobToBase64,
                              onSendToScribe,
                              errorMsg
                            })

                            if (proof) {
                              const { proofFormData, selectedScribe } = proof
                              onSendToScribe({
                                proofFormData,
                                selectedScribe,
                                api,
                                signalHub,
                                accounts,
                                web3,
                                successMsg,
                                errorMsg
                              })
                            }
                          }}
                          getTranslation={getTranslation}
                          formActions={api => (
                            <FormActions
                              formsNumber={4}
                              activeForm={state.activeForm}
                              disabledReset={!api.dirty || api.isSubmitting}
                              disabledSubmit={!api.dirty || api.isSubmitting || Object.keys(api.errors).length}
                              onReset={api.handleReset}
                              onBack={() => {
                                setState({ activeForm: state.activeForm - 1 })
                              }}
                              onSubmit={api.submitForm}
                              getTranslation={getTranslation}
                            />
                          )}
                        />
                      )
                    }
                  ]}
                  activeForm={state.activeForm}
                />
              </div>
            </div>
            <style jsx>{style}</style>
          </section>
        )}
      />
    )}
  </Utils>
)

ProofForm.propTypes = {
  getTranslation: PropTypes.func,
  scribes: PropTypes.array,
  signalHub: PropTypes.object,
  accounts: PropTypes.object,
  web3: PropTypes.object
}

ProofForm.defaultProps = {
  scribes: []
}

export { ProofForm }
