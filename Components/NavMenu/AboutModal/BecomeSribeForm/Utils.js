import Router from 'next/router'
import PropTypes from 'prop-types'
import { toast } from 'Components/Core/Toast'

const Utils = ({ children }) =>
  children({
    onSubmit: async ({
      values,
      api,
      contract,
      web3,
      accountAddress,
      onClose,
      updateUI,
      errorMsg,
      successMsg,
      successBecomeScribeMsg
    }) => {
      const { firstName, lastName } = values
      const { setScribe } = contract

      const onRes = res => {
        api.resetForm()
        api.setSubmitting(false)
        onClose()
        toast.warning(successMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })

        web3.eth.getTransactionReceiptMined(res).then(async () => {
          // Mining is finished
          await updateUI()
          Router.replace('/proof-request', '/proof-request', { shallow: true })
          toast.success(successBecomeScribeMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
        })
      }

      const onErr = () => {
        api.setSubmitting(false)
        toast.error(errorMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
      }

      try {
        if (process.env.NETWORK == 3) {
          await setScribe(accountAddress, firstName, lastName, { from: accountAddress }, (err, res) => {
            if (err) onErr()
            if (res) onRes(res)
          })
        } else if (process.env.NETWORK == 31) {
          await setScribe(accountAddress, firstName, lastName, (err, res) => {
            if (err) onErr()
            if (res) onRes(res)
          })
        }
      } catch (e) {
        onErr()
      }
    }
  })

Utils.propTypes = {
  children: PropTypes.func
}

export { Utils }
