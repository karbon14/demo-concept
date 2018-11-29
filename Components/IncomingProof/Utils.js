import PropTypes from 'prop-types'
import Router from 'next/router'
import { toast } from 'Components/Toast'

const Utils = ({ children }) =>
  children({
    onSave: async ({
      owner,
      proof,
      hash,
      socketIO,
      ipfs,
      web3,
      deployedContracts,
      setSaving,
      updateUI,
      successMsg,
      successBuyMsg,
      errorMsg
    }) => {
      const { ProofLife = {} } = deployedContracts
      const { address, signedHash } = proof
      const { removeMessage } = socketIO
      const { addData } = ipfs

      setSaving(true)
      try {
        const payload = { address, hash: `'${signedHash}'` }
        const ipfsFile = await addData(payload)

        await ProofLife.setProof(ipfsFile[0].path, hash, { from: owner }, (err, res) => {
          if (err) {
            setSaving(false)
            toast.error(errorMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
          }

          if (res) {
            setSaving(false)
            removeMessage(proof)
            toast.warning(successMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })

            const href = '/incoming-proof'
            const as = href
            Router.push(href, as, { shallow: true })

            web3.eth.getTransactionReceiptMined(res).then(async () => {
              // Mining is finished
              await updateUI()
              toast.success(successBuyMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
            })
          }
        })
      } catch (e) {
        setSaving(false)
        toast.error(errorMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
      }
    }
  })

Utils.propTypes = {
  children: PropTypes.func
}

export { Utils }
