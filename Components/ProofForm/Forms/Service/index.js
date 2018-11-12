import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import * as Yup from 'yup'
import style from './style.scss'
import { FileUploader } from 'Components/FileUploader'

const Service = ({ onSubmit, getTranslation, formActions }) => {
  return (
    <Formik
      validateOnChange
      validateOnSubmit
      initialValues={{
        serviceImage: null,
        serviceImageUrl: ''
      }}
      validationSchema={Yup.object().shape({
        serviceImage: Yup.string().required(
          getTranslation('poofForm.requiredValue')
        )
      })}
      onSubmit={(values, api) => onSubmit(values, api)}
    >
      {api => (
        <form onSubmit={api.handleSubmit}>
          <div className="form__container">
            <FileUploader
              label={getTranslation('poofForm.serviceImage')}
              dropLabel={getTranslation('poofForm.serviceImageDrop')}
              onUpload={async files => {
                api.setFieldValue('serviceImage', files[0])
                api.setFieldValue(
                  'serviceImageUrl',
                  URL.createObjectURL(files[0])
                )
              }}
              preview={
                api.values.serviceImageUrl
                  ? {
                      name:
                        (api.values.serviceImage &&
                          api.values.serviceImage.name) ||
                        api.values.serviceImageUrl,
                      url: api.values.serviceImageUrl,
                      onClear: () => {
                        api.setFieldValue('serviceImage', null)
                        api.setFieldValue('serviceImageUrl', '')
                      }
                    }
                  : null
              }
            />

            <p>{getTranslation('poofForm.serviceDisclaimer', true)}</p>
            <ul>{getTranslation('poofForm.serviceDisclaimer2', true)}</ul>
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
