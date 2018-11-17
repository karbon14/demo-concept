import React from 'react'
import 'isomorphic-unfetch'
import PropTypes from 'prop-types'
import ethUtil from 'ethereumjs-util'
import { ProofForm } from 'Components/ProofForm'
import { toast } from 'Components/Toast'
import { Dashboard } from 'Templates'

const onSubmit = async ({ values, api, accounts, web3, language, signalHub }) => {
  const { getTranslation } = language
  const { channel, broadcast } = signalHub
  const proofData = { id: new Date().getTime(), values: JSON.stringify(values) }
  const message = JSON.stringify(proofData)

  const hash = web3.sha3(message)
  const address = accounts.addresses[0]

  web3.eth.sign(address, hash, (err, res) => {
    if (err) {
      api.setSubmitting(false)
      toast.error(getTranslation('poofForm.signedError'), {
        position: toast.POSITION.BOTTOM_LEFT
      })
    }

    if (res) {
      api.resetForm()
      api.setSubmitting(false)
      toast.success(getTranslation('poofForm.signedOK'), {
        position: toast.POSITION.BOTTOM_LEFT
      })

      const signedHash = res

      broadcast(channel, { address, hash, signedHash, message })

      const r = ethUtil.toBuffer(signedHash.slice(0, 66))
      const s = ethUtil.toBuffer('0x' + signedHash.slice(66, 130))
      const v = ethUtil.bufferToInt(ethUtil.toBuffer('0x' + signedHash.slice(130, 132)))
      const m = ethUtil.toBuffer(hash)
      const pub = ethUtil.ecrecover(m, v, r, s)
      const recoveredSignAdress = '0x' + ethUtil.pubToAddress(pub).toString('hex')

      if (address === recoveredSignAdress) {
        // let m = JSON.parse(message)
        // m = { ...m, values: JSON.parse(m.values) }
        // console.log('Sign validation OK. Data: ', m)
      }
    }
  })
}

const Index = ({
  language,
  signalHub,
  proofLifeContract,
  routerNext,
  ethereum: { accounts, web3 },
  ipfs: { addData }
}) => (
  <Dashboard language={language} signalHub={signalHub} proofLifeContract={proofLifeContract} routerNext={routerNext}>
    <ProofForm
      getTranslation={language.getTranslation}
      onSubmit={(values, api) =>
        onSubmit({
          values,
          api,
          accounts,
          web3,
          language,
          signalHub,
          addData
        })
      }
    />
  </Dashboard>
)

Index.propTypes = {
  process: PropTypes.object,
  language: PropTypes.object,
  signalHub: PropTypes.object,
  ethereum: PropTypes.object,
  ipfs: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object
}

export default Index
