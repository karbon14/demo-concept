import PropTypes from 'prop-types'
import Router from 'next/router'
import { toast } from 'Components/Toast'

const Utils = ({ children }) =>
  children({
    onSave: async ({ owner, proof, hash, signalHub, ipfs, deployedContracts, setSaving, successMsg, errorMsg }) => {
      const { ProofLife = {} } = deployedContracts
      const { address, signedHash } = proof
      const { removeMessage } = signalHub
      const { addData } = ipfs

      setSaving(true)
      try {
        const payload = { address, hash: signedHash }
        const ipfsFile = await addData(payload)

        await ProofLife.setProof(ipfsFile[0].path, hash, { from: owner }, err => {
          if (err) {
            setSaving(false)
            toast.error(errorMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
          } else {
            setSaving(false)
            removeMessage(proof)
            toast.success(successMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })

            const href = '/incoming-proof'
            const as = href
            Router.push(href, as, { shallow: true })
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
