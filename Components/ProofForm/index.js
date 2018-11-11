import React from 'react'
import PropTypes from 'prop-types'
import Component from '@reactions/component'
import style from './style.scss'
import { SwitcherForm, FormActions } from './SwitcherForm'
import { Personal } from './Forms'

const ProofForm = ({ getTranslation }) => (
  <Component
    initialState={{
      activeForm: 1,
      formsData: {
        personal: {}
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
                      initialValues={state.formsData.personal}
                      onSubmit={values =>
                        setState({
                          formsData: { ...state.formsData, personal: values }
                        })
                      }
                      getTranslation={getTranslation}
                      formActions={api => (
                        <FormActions
                          formsNumber={5}
                          activeForm={state.activeForm}
                          disabledReset={!api.dirty || api.isSubmitting}
                          disabledSubmit={!api.dirty || api.isSubmitting || Object.keys(api.errors).length}
                          onReset={api.handleReset}
                          onBack={() => {
                            setState({ activeForm: state.activeForm - 1 })
                          }}
                          onSubmit={() => {
                            setState({ activeForm: state.activeForm + 1 })
                          }}
                          getTranslation={getTranslation}
                        />
                      )}
                    />
                  )
                },
                { id: 2, child: <p>Second</p> },
                { id: 3, child: <p>Third</p> }
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
