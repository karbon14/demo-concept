import React from 'react'
import PropTypes from 'prop-types'
import ethUtil from 'ethereumjs-util'
import Component from '@reactions/component'
import { Button } from 'Components/Core/Button'
import { Accordion } from 'Components/Accordion'
import style from './style.scss'

const ProofDetails = ({
  active,
  socketIO,
  web3,
  deployedContracts,
  ipfs,
  onSave,
  onDownload,
  updateUI,
  getTranslation
}) => (
  <Component
    initialState={{
      proof: {},
      proofImages: {},
      message: {},
      values: {},
      hash: undefined,
      signed: false,
      saving: false
    }}
    didMount={({ setState }) => {
      const { proof = {}, proofImages = {} } = active
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

      setState({ proof, proofImages, hash, message, values, signed })
    }}
    render={({ state, setState }) => (
      <section className={style.ProofDetails}>
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

                  <div className="double">
                    <div className="info">
                      <p>{getTranslation('proofRequest.idImage')}</p>
                      <img src={state.proofImages.idImageBase64} />
                    </div>

                    <div className="info right">
                      <p>{getTranslation('proofRequest.userImage')}</p>
                      <img src={state.proofImages.userImageBase64} />
                    </div>
                  </div>
                </React.Fragment>
              )
            },
            {
              label: getTranslation('proofRequest.serviceInformation'),
              child: (
                <div className="double">
                  <div className="info service">
                    <p>{getTranslation('proofRequest.serviceImage')}</p>
                    <img src={state.proofImages.serviceImageBase64} />
                  </div>
                </div>
              )
            }
          ]}
        />

        <section className="bottom">
          <div className="actions__container">
            <Button
              label={getTranslation('incomingProof.download')}
              type="secondary"
              icon="fa-download"
              disabled={!state.signed || state.saving}
              onClick={() =>
                onDownload({
                  proof: state.proof,
                  proofImages: state.proofImages,
                  hash: state.hash,
                  setSaving: val => setState({ saving: val })
                })
              }
            />

            <Button
              label={getTranslation('incomingProof.save')}
              type="button"
              disabled={!state.signed || state.saving}
              onClick={() =>
                onSave({
                  owner: active.approvedUser,
                  proof: state.proof,
                  hash: state.hash,
                  socketIO,
                  deployedContracts,
                  web3,
                  ipfs,
                  setSaving: val => setState({ saving: val }),
                  updateUI,
                  errorMsg: getTranslation('incomingProof.saveErrorMsg'),
                  successMsg: getTranslation('incomingProof.saveSuccessMsg'),
                  successBuyMsg: getTranslation('incomingProof.buySuccessMsg')
                })
              }
            />
          </div>
        </section>
      </section>
    )}
  />
)

ProofDetails.propTypes = {
  active: PropTypes.object,
  socketIO: PropTypes.object,
  web3: PropTypes.object,
  deployedContracts: PropTypes.object,
  ipfs: PropTypes.object,
  onSave: PropTypes.func,
  onDownload: PropTypes.func,
  updateUI: PropTypes.func,
  getTranslation: PropTypes.func
}

ProofDetails.defaultProps = {
  active: {}
}

export { ProofDetails }
