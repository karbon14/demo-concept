import PropTypes from 'prop-types'
import { toast } from 'Components/Toast'

const Utils = ({ children }) =>
  children({
    blobToBase64: blob => {
      const toString = Object.prototype.toString
      const isBlob = x => {
        return x instanceof Blob || toString.call(x) === '[object Blob]'
      }

      return new Promise((resolve, reject) => {
        if (!window.FileReader) reject(new Error('no fileReader object available'))
        if (!isBlob(blob)) reject(new Error('provided argument is not blob'))

        const reader = new window.FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => resolve(reader.result)
      })
    },
    prepareData: async ({ formsData, api, blobToBase64, onSendToScribe, successMsg = '', errorMsg = '' }) => {
      const { personal, identification, service, scribes } = formsData
      const { id, idImage, userImage } = identification
      const { serviceImage } = service
      const { selectedScibe } = scribes

      try {
        const idImageBase64 = await blobToBase64(idImage)
        const userImageBase64 = await blobToBase64(userImage)
        const serviceImageBase64 = await blobToBase64(serviceImage)

        const proofFormData = {
          ...personal,
          id,
          idImageBase64,
          userImageBase64,
          serviceImageBase64
        }

        onSendToScribe({ proofFormData, selectedScibe, api, successMsg, errorMsg })
      } catch (e) {
        api.setSubmitting(false)
        toast.error(errorMsg, { position: toast.POSITION.BOTTOM_LEFT })
      }
    },
    onSendToScribe: async ({ proofFormData, selectedScibe, api, successMsg, errorMsg }) => {
      console.log('proofFormData: ', proofFormData)
      console.log('selectedScibe: ', selectedScibe)

      api.setSubmitting(false)
      toast.info(successMsg, { position: toast.POSITION.BOTTOM_LEFT })
    }
  })

Utils.propTypes = {
  children: PropTypes.func
}

export { Utils }
