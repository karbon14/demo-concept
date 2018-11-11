import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import style from './style.scss'
import { theme } from 'Common/Core'
import { TextField } from '@react-core/textfield'

const Service = ({ onSubmit, getTranslation, formActions }) => {
  return (
    <Formik
      validateOnChange
      validateOnSubmit
      initialValues={{
        service: ''
      }}
      validationSchema={Yup.object().shape({
        service: Yup.string()
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
              name="service"
              label={getTranslation('poofForm.id')}
              placeholder={api.errors.service}
              theme={theme}
              value={api.values.service}
              onKeyUp={new Function()}
              onChange={api.handleChange}
              onBlur={api.handleBlur}
              data-invalid={api.touched.service && !!api.errors.service}
            />
          </div>

          {formActions(api)}
          <style jsx>{style}</style>
        </form>
      )}
    </Formik>
  )
}

Service.propTypes = {
  onSubmit: PropTypes.func,
  getTranslation: PropTypes.func,
  formActions: PropTypes.any
}

export { Service }
