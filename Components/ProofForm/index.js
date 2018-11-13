import React from 'react'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import style from './style.scss'
import { theme } from 'Common/Core'
import { Select } from 'Components/Select'
import { Button } from '@react-core/button'
import { TextField } from '@react-core/textfield'

const ProofForm = ({ getTranslation, onSubmit }) => (
  <section>
    <Formik
      validateOnChange
      validateOnSubmit
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        adress: '',
        country: ''
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
      {api => {
        const countries = getTranslation('countries') || []
        const states = getTranslation('states') || []
        return (
          <div className="container">
            <h3>{getTranslation('poofForm.title')}</h3>

            <form onSubmit={api.handleSubmit}>
              <div className="line">
                <div className="item">
                  <TextField
                    type="text"
                    name="firstName"
                    label={getTranslation('poofForm.firstName')}
                    placeholder={api.errors.firstName}
                    theme={theme}
                    value={api.values.firstName}
                    onKeyUp={new Function()}
                    onChange={api.handleChange}
                    onBlur={api.handleBlur}
                    data-invalid={api.touched.firstName && !!api.errors.firstName}
                  />
                </div>

                <div className="item">
                  <TextField
                    type="text"
                    name="lastName"
                    label={getTranslation('poofForm.lastName')}
                    placeholder={api.errors.lastName}
                    theme={theme}
                    value={api.values.lastName}
                    onKeyUp={new Function()}
                    onChange={api.handleChange}
                    onBlur={api.handleBlur}
                    data-invalid={api.touched.lastName && !!api.errors.lastName}
                  />
                </div>
              </div>

              <TextField
                type="text"
                name="email"
                label={getTranslation('poofForm.email')}
                placeholder={api.errors.email}
                theme={theme}
                value={api.values.email}
                onKeyUp={new Function()}
                onChange={api.handleChange}
                onBlur={api.handleBlur}
                data-invalid={api.touched.email && !!api.errors.email}
              />

              <TextField
                type="email"
                name="adress"
                label={getTranslation('poofForm.adress')}
                placeholder={api.errors.adress}
                theme={theme}
                value={api.values.adress}
                onKeyUp={new Function()}
                onChange={api.handleChange}
                onBlur={api.handleBlur}
                data-invalid={api.touched.adress && !!api.errors.adress}
              />

              <div className="line">
                <div className="item">
                  <Select
                    name="country"
                    theme={theme}
                    value={api.values.country}
                    data-invalid={api.touched.country && !!api.errors.country}
                    defaultLabel={getTranslation('poofForm.country')}
                    options={countries.map(e => ({
                      label: e.name,
                      key: e.code,
                      value: e.code
                    }))}
                    onBlur={api.handleBlur}
                    onChange={e =>
                      api.setValues({
                        ...api.values,
                        country: e.target.value,
                        state: ''
                      })
                    }
                  />
                </div>

                <div className="item">
                  <Select
                    name="state"
                    theme={theme}
                    value={api.values.country}
                    data-invalid={api.touched.country && !!api.errors.country}
                    defaultLabel={getTranslation('poofForm.state')}
                    options={
                      api.values.country && states[api.values.country]
                        ? states[api.values.country].map(e => ({
                            label: e.name,
                            key: e.code ? e.code : e.name,
                            value: e.code ? e.code : e.name
                          }))
                        : []
                    }
                    onBlur={api.handleBlur}
                    disabled={!api.values.country}
                  />
                </div>
              </div>

              <div className="actions">
                <Button
                  theme={theme}
                  label={getTranslation('poofForm.resetLabel')}
                  type="primary"
                  onClick={api.handleReset}
                  disabled={!api.dirty || api.isSubmitting}
                />

                <Button
                  theme={theme}
                  label={getTranslation('poofForm.submitLabel')}
                  type="button"
                  disabled={!api.dirty || api.isSubmitting || Object.keys(api.errors).length}
                  onClick={api.submitForm}
                />
              </div>
            </form>
          </div>
        )
      }}
    </Formik>
    <style jsx>{style}</style>
  </section>
)

ProofForm.propTypes = {
  getTranslation: PropTypes.func,
  onSubmit: PropTypes.func
}

export { ProofForm }
