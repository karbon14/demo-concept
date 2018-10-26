import React from 'react'
import { Formik } from 'formik'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import style from './style.scss'
import { theme } from 'Common/Core'
import { Button } from '@react-core/button'
import { TextField } from '@react-core/textfield'

const ProofForm = ({ getTranslation, onSubmit }) => (
  <section className="formContainer">
    <Formik
      validateOnChange
      validateOnSubmit
      initialValues={{ email: '' }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email()
          .typeError(getTranslation('poofForm.invalidValue'))
          .required(getTranslation('poofForm.requiredValue'))
      })}
      onSubmit={(values, api) => onSubmit(values, api)}
    >
      {api => {
        const disabled = !api.values.email || api.errors.email
        return (
          <form onSubmit={api.handleSubmit}>
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
                disabled={api.isSubmitting || disabled}
                onClick={api.submitForm}
              />
            </div>
          </form>
        )
      }}
    </Formik>
    <style jsx>{style}</style>
  </section>
)

ProofForm.propTypes = {
  selectedLanguage: PropTypes.string,
  getTranslation: PropTypes.func,
  onSubmit: PropTypes.func
}

export { ProofForm }
