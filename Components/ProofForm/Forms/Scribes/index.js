import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import classnames from 'classnames'
import { theme } from 'Common/Core'
import { Checkbox } from '@react-core/checkbox'
import { ScribeProfile } from 'Components/CryptoScribes/ScribeProfile'
import style from './style.scss'

const Scribes = ({ scribes, onSubmit, getTranslation, formActions }) => {
  return (
    <Formik
      validateOnChange
      validateOnSubmit
      initialValues={{
        selectedScribe: ''
      }}
      validationSchema={Yup.object().shape({
        selectedScribe: Yup.string().required(getTranslation('poofForm.requiredValue'))
      })}
      onSubmit={(values, api) => onSubmit(values, api)}
    >
      {api => (
        <form onSubmit={api.handleSubmit}>
          <div className="form__container">
            <label>{getTranslation('poofForm.selectScribe')}</label>

            {scribes.map((scribe, index) => (
              <div
                key={index}
                className={classnames({
                  scribe: true,
                  selected: scribe.address === api.values.selectedScribe
                })}
              >
                <Checkbox
                  theme={theme}
                  name={scribe.address}
                  label={getTranslation('intro.USAInvestDisclaimer')}
                  onBlur={api.handleBlur}
                  value={api.values[scribe.address] || false}
                  onChange={({ target }) => {
                    const { checked } = target
                    api.resetForm()
                    api.setFieldValue([scribe.address], checked)
                    api.setFieldValue('selectedScribe', checked ? scribe.address : '')
                  }}
                />

                <ScribeProfile scribe={scribe} getTranslation={getTranslation} />
              </div>
            ))}
          </div>

          {formActions(api)}
          <style jsx>{style}</style>
        </form>
      )}
    </Formik>
  )
}

Scribes.propTypes = {
  scribes: PropTypes.array,
  onSubmit: PropTypes.func,
  getTranslation: PropTypes.func,
  formActions: PropTypes.any
}

export { Scribes }
