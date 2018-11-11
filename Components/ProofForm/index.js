import React from 'react'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import Component from '@reactions/component'
import style from './style.scss'
import { SwitcherForm } from './SwitcherForm'
import { Personal } from './Forms'

const ProofForm = ({ getTranslation, onSubmit }) => (
  <Component
    initialState={{
      activeForm: 1
    }}
    render={({ state, setState }) => (
      <section>
        <Formik
          validateOnChange
          validateOnSubmit
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            adress: '',
            country: '',
            state: ''
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string()
              .typeError(getTranslation('poofForm.invalidValue'))
              .required(getTranslation('poofForm.requiredValue')),
            lastName: Yup.string()
              .typeError(getTranslation('poofForm.invalidValue'))
              .required(getTranslation('poofForm.requiredValue')),
            email: Yup.string()
              .email()
              .typeError(getTranslation('poofForm.invalidValue'))
              .required(getTranslation('poofForm.requiredValue')),
            adress: Yup.string()
              .typeError(getTranslation('poofForm.invalidValue'))
              .required(getTranslation('poofForm.requiredValue')),
            country: Yup.string().required(getTranslation('poofForm.requiredValue')),
            state: Yup.string().required(getTranslation('poofForm.requiredValue'))
          })}
          onSubmit={(values, api) => onSubmit(values, api)}
        >
          {api => (
            <div className="container">
              <h3>{getTranslation('poofForm.title')}</h3>

              <form onSubmit={api.handleSubmit}>
                <SwitcherForm
                  forms={[
                    {
                      id: 1,
                      child: <Personal api={api} getTranslation={getTranslation} />
                    },
                    { id: 2, child: <p>Second</p> },
                    { id: 3, child: <p>Third</p> }
                  ]}
                  activeForm={state.activeForm}
                  disabledReset={!api.dirty || api.isSubmitting}
                  disabledSubmit={!api.dirty || api.isSubmitting || Object.keys(api.errors).length}
                  onChangeForm={() => new Function()}
                  onReset={api.handleReset}
                  onBack={() => {
                    setState({ activeForm: state.activeForm - 1 })
                  }}
                  onSubmit={() => {
                    setState({ activeForm: state.activeForm + 1 })
                  }}
                  getTranslation={getTranslation}
                />
              </form>
            </div>
          )}
        </Formik>
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
