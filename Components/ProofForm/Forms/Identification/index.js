import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import style from './style.scss'
import { theme } from 'Common/Core'
import { TextField } from '@react-core/textfield'

const Identification = ({ onSubmit, getTranslation, formActions }) => {
  return (
    <Formik
      validateOnChange
      validateOnSubmit
      initialValues={{
        id: ''
      }}
      validationSchema={Yup.object().shape({
        id: Yup.string()
          .typeError(getTranslation('poofForm.invalidValue'))
          .required(getTranslation('poofForm.requiredValue'))
      })}
      onSubmit={(values, api) => onSubmit(values, api)}
    >
      {api => (
        <form onSubmit={api.handleSubmit}>
          <div className="form__container">
            <TextField
              type="text"
              name="id"
              label={getTranslation('poofForm.id')}
              placeholder={api.errors.id}
              theme={theme}
              value={api.values.id}
              onKeyUp={new Function()}
              onChange={api.handleChange}
              onBlur={api.handleBlur}
              data-invalid={api.touched.id && !!api.errors.id}
            />
          </div>

          {formActions(api)}
          <style jsx>{style}</style>
        </form>
      )}
    </Formik>
  )
}

Identification.propTypes = {
  onSubmit: PropTypes.func,
  getTranslation: PropTypes.func,
  formActions: PropTypes.any
}

export { Identification }
