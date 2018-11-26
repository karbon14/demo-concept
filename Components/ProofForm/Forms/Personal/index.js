import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import style from './style.scss'
import { theme } from 'Common/Core'
import { Select } from 'Components/Select'
import { TextField } from '@react-core/textfield'

const Personal = ({ onSubmit, getTranslation, formActions, env, mock }) => {
  const countries = getTranslation('countries') || []
  const states = getTranslation('states') || []

  return (
    <Formik
      validateOnChange
      validateOnSubmit
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        country: '',
        countryName: '',
        state: '',
        ...(env.MOCKED ? mock : {})
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string()
          .typeError(getTranslation('proofForm.invalidValue'))
          .required(getTranslation('proofForm.requiredValue')),
        lastName: Yup.string()
          .typeError(getTranslation('proofForm.invalidValue'))
          .required(getTranslation('proofForm.requiredValue')),
        email: Yup.string()
          .email()
          .typeError(getTranslation('proofForm.invalidValue'))
          .required(getTranslation('proofForm.requiredValue')),
        address: Yup.string()
          .typeError(getTranslation('proofForm.invalidValue'))
          .required(getTranslation('proofForm.requiredValue')),
        country: Yup.string().required(getTranslation('proofForm.requiredValue')),
        state: Yup.string().required(getTranslation('proofForm.requiredValue'))
      })}
      onSubmit={(values, api) => onSubmit(values, api)}
    >
      {api => (
        <form onSubmit={api.handleSubmit}>
          <div className="form__container">
            <div className="line">
              <div className="item">
                <TextField
                  type="text"
                  name="firstName"
                  label={getTranslation('proofForm.firstName')}
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
                  label={getTranslation('proofForm.lastName')}
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
              label={getTranslation('proofForm.email')}
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
              name="address"
              label={getTranslation('proofForm.address')}
              placeholder={api.errors.address}
              theme={theme}
              value={api.values.address}
              onKeyUp={new Function()}
              onChange={api.handleChange}
              onBlur={api.handleBlur}
              data-invalid={api.touched.address && !!api.errors.address}
            />

            <div className="line">
              <div className="item">
                <Select
                  name="country"
                  theme={theme}
                  value={api.values.country}
                  data-invalid={api.touched.country && !!api.errors.country}
                  defaultLabel={getTranslation('proofForm.country')}
                  options={countries.map(e => ({
                    label: e.name,
                    key: e.code,
                    value: e.code
                  }))}
                  onBlur={api.handleBlur}
                  onChange={e => {
                    const countryStates = states[e.target.value].map(e => ({
                      label: e.name,
                      key: e.code ? e.code : e.name,
                      value: e.code ? e.code : e.name
                    }))

                    const country = countries.find(_ => _.code === e.target.value)

                    api.setValues({
                      ...api.values,
                      country: e.target.value,
                      countryName: country.name,
                      state: countryStates.length ? countryStates[0].key : ''
                    })
                  }}
                />
              </div>

              <div className="item">
                <Select
                  name="state"
                  theme={theme}
                  value={api.values.state}
                  data-invalid={api.touched.state && !!api.errors.state}
                  defaultLabel={getTranslation('proofForm.state')}
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
                  onChange={api.handleChange}
                  disabled={!api.values.country}
                />
              </div>
            </div>
          </div>

          {formActions(api)}
          <style jsx>{style}</style>
        </form>
      )}
    </Formik>
  )
}

Personal.propTypes = {
  onSubmit: PropTypes.func,
  getTranslation: PropTypes.func,
  formActions: PropTypes.any,
  env: PropTypes.object,
  mock: PropTypes.object
}

Personal.defaultProps = {
  mock: {
    firstName: 'Mock',
    lastName: 'Data',
    email: 'test@gmail.com',
    address: 'Mock 1234',
    country: 'AR',
    countryName: 'Argentina',
    state: 'Buenos Aires'
  }
}

export { Personal }
