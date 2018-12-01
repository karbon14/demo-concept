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
    prepareData: async ({ formsData, api, blobToBase64, errorMsg, env }) => {
      const { personal, identification, service, scribes } = formsData
      const { id, idImage, userImage } = identification
      const { serviceImage } = service
      const { selectedScribe } = scribes

      try {
        const idImageBase64 = env.MOCKED ? '' : await blobToBase64(idImage)
        const userImageBase64 = env.MOCKED ? '' : await blobToBase64(userImage)
        const serviceImageBase64 = env.MOCKED ? '' : await blobToBase64(serviceImage)

        const proofFormData = {
          ...personal,
          id,
          idImageBase64,
          userImageBase64,
          serviceImageBase64
        }

        return { proofFormData, selectedScribe }
      } catch (e) {
        api.setSubmitting(false)
        toast.error(errorMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
      }
    },
    onSendToScribe: async ({ proofFormData, selectedScribe, api, socketIO, accounts, web3, successMsg, errorMsg }) => {
      const { channel, broadcast } = socketIO
      const proofData = { id: new Date().getTime(), values: JSON.stringify(proofFormData) }
      const message = JSON.stringify(proofData)

      const hash = web3.sha3(message)
      const address = accounts.addresses[0]

      web3.eth.sign(address, hash, (err, res) => {
        if (err) {
          api.setSubmitting(false)
          toast.error(errorMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
        }

        if (res) {
          api.setSubmitting(false)
          toast.info(successMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })

          const payload = {
            selectedScribe,
            proof: {
              message,
              address,
              signedHash: res
            }
          }
          broadcast(channel, payload)
        }
      })
    }
  })

Utils.propTypes = {
  children: PropTypes.func
}

export { Utils }
