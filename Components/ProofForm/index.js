import React from 'react'
import PropTypes from 'prop-types'
import Component from '@reactions/component'
import blobToBase64 from 'blob-to-base64'
import style from './style.scss'
import { toast } from 'Components/Toast'
import { SwitcherForm, FormActions } from './SwitcherForm'
import { Personal, Identification, Service, Scribes } from './Forms'

const getBase64ImageFromUrl = async imageUrl => {
  var res = await fetch(imageUrl)
  var blob = await res.blob()

  return new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.addEventListener(
      'load',
      function() {
        const dataUrl = reader.result
        const base64 = dataUrl.split(',')[1]
        resolve(dataUrl)
      },
      false
    )

    reader.onerror = () => {
      return reject(this)
    }
    reader.readAsDataURL(blob)
  })
}

const sendToNoScribe = async ({
  formsData,
  api,
  successMsg = '',
  errorMsg = ''
}) => {
  const { personal, identification, service, scribes } = formsData
  const { id, idImage, userImage } = identification

  let idImageBase64, userImageBase64
  await blobToBase64(idImage, (error, base64) => console.log('base64', base64))
  await blobToBase64(userImage, __ => (userImageBase64 = __))

  const proofFormData = {
    ...personal,
    id,
    idImageBase64,
    userImageBase64
  }
  console.log('proofFormData: ', proofFormData)

  api.setSubmitting(false)
  toast.info(successMsg, {
    position: toast.POSITION.BOTTOM_LEFT
  })
}

const ProofForm = ({ getTranslation }) => (
  <Component
    initialState={{
      activeForm: 1,
      formsData: {
        personal: {},
        identification: {},
        service: {},
        scribes: {}
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
                      onSubmit={(values, api) => {
                        setState({
                          formsData: { ...state.formsData, personal: values },
                          activeForm: state.activeForm + 1
                        })
                        api.setSubmitting(false)
                      }}
                      getTranslation={getTranslation}
                      formActions={api => (
                        <FormActions
                          formsNumber={4}
                          activeForm={state.activeForm}
                          disabledReset={!api.dirty || api.isSubmitting}
                          disabledSubmit={!api.dirty || api.isSubmitting || Object.keys(api.errors).length}
                          onReset={api.handleReset}
                          onBack={() => {
                            setState({ activeForm: state.activeForm - 1 })
                          }}
                          onSubmit={api.submitForm}
                          getTranslation={getTranslation}
                        />
                      )}
                    />
                  )
                },
                {
                  id: 2,
                  child: (
                    <Identification
                      onSubmit={(values, api) => {
                        setState({
                          formsData: {
                            ...state.formsData,
                            identification: values
                          },
                          activeForm: state.activeForm + 1
                        })
                        api.setSubmitting(false)
                      }}
                      getTranslation={getTranslation}
                      formActions={api => (
                        <FormActions
                          formsNumber={4}
                          activeForm={state.activeForm}
                          disabledReset={!api.dirty || api.isSubmitting}
                          disabledSubmit={
                            !api.dirty ||
                            api.isSubmitting ||
                            Object.keys(api.errors).length
                          }
                          onReset={api.handleReset}
                          onBack={() => {
                            setState({ activeForm: state.activeForm - 1 })
                          }}
                          onSubmit={api.submitForm}
                          getTranslation={getTranslation}
                        />
                      )}
                    />
                  )
                },
                {
                  id: 3,
                  child: (
                    <Service
                      onSubmit={(values, api) => {
                        setState({
                          formsData: {
                            ...state.formsData,
                            service: values
                          },
                          activeForm: state.activeForm + 1
                        })
                        api.setSubmitting(false)
                      }}
                      getTranslation={getTranslation}
                      formActions={api => (
                        <FormActions
                          formsNumber={4}
                          activeForm={state.activeForm}
                          disabledReset={!api.dirty || api.isSubmitting}
                          disabledSubmit={
                            !api.dirty ||
                            api.isSubmitting ||
                            Object.keys(api.errors).length
                          }
                          onReset={api.handleReset}
                          onBack={() => {
                            setState({ activeForm: state.activeForm - 1 })
                          }}
                          onSubmit={api.submitForm}
                          getTranslation={getTranslation}
                        />
                      )}
                    />
                  )
                },
                {
                  id: 4,
                  child: (
                    <Scribes
                      onSubmit={(values, api) => {
                        const formsData = {
                          ...state.formsData,
                          scribes: values
                        }
                        setState({ formsData })
                        sendToNoScribe({ formsData, api })
                      }}
                      getTranslation={getTranslation}
                      formActions={api => (
                        <FormActions
                          formsNumber={4}
                          activeForm={state.activeForm}
                          disabledReset={!api.dirty || api.isSubmitting}
                          disabledSubmit={
                            !api.dirty ||
                            api.isSubmitting ||
                            Object.keys(api.errors).length
                          }
                          onReset={api.handleReset}
                          onBack={() => {
                            setState({ activeForm: state.activeForm - 1 })
                          }}
                          onSubmit={api.submitForm}
                          getTranslation={getTranslation}
                        />
                      )}
                    />
                  )
                }
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
