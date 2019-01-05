import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { Utils } from './Utils'
import * as Yup from 'yup'
import { TextField } from 'Components/Core/TextField'
import { Button } from 'Components/Core/Button'
import style from './style.scss'

const BecomeSribeForm = ({ scribes, contract, getTranslation, web3, accountAddress, onClose, updateUI }) => (
  <Utils>
    {({ onSubmit }) => (
      <Formik
        validateOnChange
        validateOnSubmit
        initialValues={{ firstName: '', lastName: '' }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string()
            .typeError(getTranslation('proofForm.invalidValue'))
            .required(getTranslation('proofForm.requiredValue')),
          lastName: Yup.string()
            .typeError(getTranslation('proofForm.invalidValue'))
            .required(getTranslation('proofForm.requiredValue'))
        })}
        onSubmit={(values, api) =>
          onSubmit({
            values,
            api,
            contract,
            web3,
            accountAddress,
            onClose,
            updateUI,
            errorMsg: getTranslation('navMenu.becomeScribeErrorMsg'),
            successMsg: getTranslation('navMenu.becomeScribeSuccessMsg'),
            successBecomeScribeMsg: getTranslation('navMenu.areScribeSuccessMsg')
          })
        }
      >
        {api => (
          <form className={style.BecomeSribeForm} onSubmit={api.handleSubmit}>
            <div className="form__container">
              <TextField
                type="text"
                name="firstName"
                label={getTranslation('proofForm.firstName')}
                placeholder={api.errors.firstName}
                value={api.values.firstName}
                onKeyUp={new Function()}
                onChange={api.handleChange}
                onBlur={api.handleBlur}
                disabled={!scribes.length}
                data-invalid={api.touched.firstName && !!api.errors.firstName}
              />

              <TextField
                type="text"
                name="lastName"
                label={getTranslation('proofForm.lastName')}
                placeholder={api.errors.lastName}
                value={api.values.lastName}
                onKeyUp={new Function()}
                onChange={api.handleChange}
                onBlur={api.handleBlur}
                disabled={!scribes.length}
                data-invalid={api.touched.lastName && !!api.errors.lastName}
              />
            </div>

            <div className="submit__container">
              <Button
                type="button"
                label={getTranslation('navMenu.submitScribeLabel')}
                disabled={!scribes.length || !api.dirty || api.isSubmitting || Object.keys(api.errors).length}
                onClick={api.submitForm}
              />
            </div>
          </form>
        )}
      </Formik>
    )}
  </Utils>
)

BecomeSribeForm.propTypes = {
  scribes: PropTypes.array,
  contract: PropTypes.object,
  web3: PropTypes.object,
  accountAddress: PropTypes.string,
  onClose: PropTypes.func,
  updateUI: PropTypes.func,
  getTranslation: PropTypes.func
}

export { BecomeSribeForm }
