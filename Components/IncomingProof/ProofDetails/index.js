import React from 'react'
import PropTypes from 'prop-types'
import ethUtil from 'ethereumjs-util'
import Component from '@reactions/component'
import { theme } from 'Common/Core'
import { Button } from '@react-core/button'
import { Accordion } from './Accordion'
import style from './style.scss'

const ProofDetails = ({ active, signalHub, web3, deployedContracts, ipfs, onSave, getTranslation }) => (
  <Component
    initialState={{
      proof: {},
      message: {},
      values: {},
      hash: undefined,
      signed: false,
      saving: false
    }}
    didMount={({ setState }) => {
      const { proof = {} } = active
      const { address, signedHash } = proof
      const hash = web3.sha3(proof.message)
      let message = {}
      let values = {}
      let signed = false

      if (signedHash) {
        message = JSON.parse(proof.message)
        values = JSON.parse(message.values)
        try {
          const r = ethUtil.toBuffer(signedHash.slice(0, 66))
          const s = ethUtil.toBuffer('0x' + signedHash.slice(66, 130))
          const v = ethUtil.bufferToInt(ethUtil.toBuffer('0x' + signedHash.slice(130, 132)))
          const m = ethUtil.toBuffer(hash)
          const pub = ethUtil.ecrecover(m, v, r, s)
          const recoveredSignAdress = '0x' + ethUtil.pubToAddress(pub).toString('hex')

          if (address === recoveredSignAdress) signed = true
        } catch (e) {
          signed = false
        }
      }

      setState({ proof, hash, message, values, signed })
    }}
    render={({ state, setState }) => (
      <div className="details">
        <Accordion
          openStates={[true, false, false, false]}
          options={[
            {
              label: getTranslation('proofRequest.signInformation'),
              child: (
                <React.Fragment>
                  <div className="info">
                    <p>{getTranslation('incomingProof.scriveAddress')}</p>
                    <p className="value">{state.proof.address}</p>
                  </div>

                  <div className="info">
                    <p>{getTranslation('proofRequest.hash')}</p>
                    <p className="value">{state.hash}</p>
                  </div>

                  <div className="info">
                    <p>{getTranslation('proofRequest.signedHash')}</p>
                    <p className="value">{state.proof.signedHash}</p>
                  </div>

                  <div className="info">
                    <p>
                      {getTranslation('proofRequest.title') ? (
                        <i className={state.signed ? 'fa fa-check' : 'fa fa-times'} />
                      ) : null}

                      {getTranslation(`proofRequest.${state.signed ? 'signVerificationOk' : 'signVerificationError'}`)}
                    </p>
                  </div>
                </React.Fragment>
              )
            },
            {
              label: getTranslation('proofRequest.personalInformation'),
              child: (
                <React.Fragment>
                  <div className="double">
                    <div className="info">
                      <p>{getTranslation('proofRequest.firstName')}</p>
                      <p className="value">{state.values.firstName}</p>
                    </div>

                    <div className="info">
                      <p>{getTranslation('proofRequest.lastName')}</p>
                      <p className="value">{state.values.lastName}</p>
                    </div>
                  </div>

                  <div className="double">
                    <div className="info">
                      <p>{getTranslation('proofRequest.country')}</p>
                      <p className="value">{state.values.countryName}</p>
                    </div>

                    <div className="info">
                      <p>{getTranslation('proofRequest.state')}</p>
                      <p className="value">{state.values.state}</p>
                    </div>
                  </div>

                  <div className="info">
                    <p>{getTranslation('proofRequest.address')}</p>
                    <p className="value">{state.values.address}</p>
                  </div>

                  <div className="info">
                    <p>{getTranslation('proofRequest.email')}</p>
                    <p className="value">{state.values.email}</p>
                  </div>
                </React.Fragment>
              )
            },
            {
              label: getTranslation('proofRequest.idInformation'),
              child: (
                <React.Fragment>
                  <div className="info">
                    <p>{getTranslation('proofRequest.id')}</p>
                    <p className="value">{state.values.id}</p>
                  </div>
                </React.Fragment>
              )
            },
            {
              label: getTranslation('proofRequest.serviceInformation'),
              child: null
            }
          ]}
        />

        <section className="bottom">
          <div className="actions__container">
            <Button
              theme={theme}
              label={getTranslation('incomingProof.save')}
              type="button"
              disabled={!state.signed || state.saving}
              onClick={() =>
                onSave({
                  owner: active.approvedUser,
                  proof: state.proof,
                  hash: state.hash,
                  signalHub,
                  deployedContracts,
                  ipfs,
                  setSaving: val => setState({ saving: val }),
                  errorMsg: getTranslation('incomingProof.saveErrorMsg'),
                  successMsg: getTranslation('incomingProof.saveSuccessMsg')
                })
              }
            />
          </div>
        </section>
        <style jsx>{style}</style>
      </div>
    )}
  />
)

ProofDetails.propTypes = {
  active: PropTypes.object,
  signalHub: PropTypes.object,
  web3: PropTypes.object,
  deployedContracts: PropTypes.object,
  ipfs: PropTypes.object,
  onSave: PropTypes.func,
  getTranslation: PropTypes.func
}

ProofDetails.defaultProps = {
  active: {}
}

export { ProofDetails }
