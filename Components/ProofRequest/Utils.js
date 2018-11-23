import PropTypes from 'prop-types'
import Router from 'next/router'
import { toast } from 'Components/Toast'

const Utils = ({ children }) =>
  children({
    onReject: async ({ proof, signalHub, successMsg, errorMsg }) => {
      try {
        const { removeMessage } = signalHub
        removeMessage({ ...proof, selectedScribe: null })

        const href = '/proof-request'
        const as = href
        Router.push(href, as, { shallow: true })

        toast.info(successMsg, { position: toast.POSITION.BOTTOM_LEFT })
      } catch (e) {
        toast.error(errorMsg, { position: toast.POSITION.BOTTOM_LEFT })
      }
    },
    onApprove: async ({ proof, signalHub, accounts, web3, successMsg, errorMsg }) => {
      const { removeMessage } = signalHub
      const address = accounts.addresses[0]
      const { message } = proof
      const hash = web3.sha3(message)

      web3.eth.sign(address, hash, (err, res) => {
        if (err) {
          toast.error(errorMsg, { position: toast.POSITION.BOTTOM_LEFT })
        }

        if (res) {
          toast.success(successMsg, { position: toast.POSITION.BOTTOM_LEFT })
          removeMessage({ ...proof, selectedScribe: null })

          const href = '/proof-request'
          const as = href
          Router.push(href, as, { shallow: true })
        }
      })
    }
  })

Utils.propTypes = {
  children: PropTypes.func
}

export { Utils }
