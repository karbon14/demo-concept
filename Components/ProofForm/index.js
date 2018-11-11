import React from 'react'
import PropTypes from 'prop-types'
import Component from '@reactions/component'
import style from './style.scss'
import { SwitcherForm, FormActions } from './SwitcherForm'
import { Personal, Identification, Service } from './Forms'

const ProofForm = ({ getTranslation }) => (
  <Component
    initialState={{
      activeForm: 1,
      formsData: {
        personal: {},
        identification: {},
        service: {}
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
                          formsNumber={3}
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
                          formsNumber={3}
                          activeForm={state.activeForm}
                          disabledReset={!api.dirty || api.isSubmitting}
                          disabledSubmit={
                            !api.dirty ||
                            api.isSubmitting ||
                            Object.keys(api.errors).length
                          }
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
                          }
                        })
                        api.setSubmitting(false)
                      }}
                      getTranslation={getTranslation}
                      formActions={api => (
                        <FormActions
                          formsNumber={3}
                          activeForm={state.activeForm}
                          disabledReset={!api.dirty || api.isSubmitting}
                          disabledSubmit={
                            !api.dirty ||
                            api.isSubmitting ||
                            Object.keys(api.errors).length
                          }
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
)

ProofForm.propTypes = {
  getTranslation: PropTypes.func,
  onSubmit: PropTypes.func
}

export { ProofForm }
