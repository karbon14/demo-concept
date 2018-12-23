import React from 'react'
import PropTypes from 'prop-types'
import ethUtil from 'ethereumjs-util'
import Component from '@reactions/component'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'Components/Core/Toast'
import { ScribeProfile } from 'Components/CryptoScribes/ScribeProfile'
import { ProofUploader } from 'Components/ProofUploader'
import { Accordion } from 'Components/Accordion'
import style from './style.scss'

const GetBlob = async blob => {
  const toString = Object.prototype.toString
  const isBlob = x => {
    return x instanceof Blob || toString.call(x) === '[object Blob]'
  }

  return new Promise((resolve, reject) => {
    if (!window.FileReader) reject(new Error('no fileReader object available'))
    if (!isBlob(blob)) reject(new Error('provided argument is not blob'))

    const reader = new window.FileReader()
    reader.readAsDataURL(blob)
    reader.onloadend = () => {
      fetch(reader.result)
        .then(response => response.json())
        .then(json => resolve(json))
    }
  })
}

const ProofDetails = ({ active, scribes, web3, ipfs, getTranslation }) => (
  <Component
    initialState={{
      ipfs: active.ipfs,
      hash: active.hash,
      ipfsContent: {},
      proof: {},
      proofImages: {},
      message: {},
      values: {},
      openStates: [false, false, false, false]
    }}
    didMount={async ({ state, setState }) => {
      try {
        const data = await ipfs.getData(state.ipfs)
        const ipfsContent = JSON.parse(data[0].content.toString())
        setState({ ipfsContent })
      } catch (e) {
        //
      }
    }}
    render={({ state, setState }) => (
      <section className={style.ProofDetails}>
        <React.Fragment>
          <div className="info">
            <p>{getTranslation('proofsHistory.validatedHash')}</p>

            <div className="info copyable">
              <p className="value">{state.hash}</p>
              <CopyToClipboard
                text={state.hash}
                onCopy={() =>
                  toast.info(getTranslation('cryptoScribes.copiedAddress'), {
                    pauseOnFocusLoss: false,
                    position: toast.POSITION.BOTTOM_LEFT
                  })
                }
              >
                <span className={state.hash ? 'fa fa-clipboard' : ''} />
              </CopyToClipboard>
            </div>
          </div>

          <hr />

          <div className="info">
            <p>{getTranslation('proofsHistory.ipfsPath')}</p>
            <p className="value">{state.ipfs}</p>
          </div>

          <hr />

          {state.ipfsContent.address ? (
            <div className="scribe__container">
              <div className="info">
                <p>{getTranslation('proofsHistory.signedHash')}</p>
                <p className="value">{state.ipfsContent.hash.replace(/'/g, '')}</p>
              </div>

              <ScribeProfile
                scribe={scribes.find(_ => _.address === state.ipfsContent.address)}
                getTranslation={getTranslation}
              />
            </div>
          ) : null}

          <hr />

          <ProofUploader
            label={getTranslation('proofsHistory.verifyProofData')}
            onUpload={async _ => {
              const proofDataUrl = await GetBlob(await _)
              const { proof = {}, proofImages = {} } = proofDataUrl
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

                  if (address === recoveredSignAdress && signedHash === state.ipfsContent.hash.replace(/'/g, '')) {
                    signed = true
                  } else {
                    toast.error(getTranslation('proofRequest.signVerificationError'), {
                      pauseOnFocusLoss: false,
                      position: toast.POSITION.BOTTOM_LEFT
                    })
                  }
                } catch (e) {
                  signed = false
                  toast.error(getTranslation('proofRequest.signVerificationError'), {
                    pauseOnFocusLoss: false,
                    position: toast.POSITION.BOTTOM_LEFT
                  })
                }
              }

              setState({
                proof,
                proofImages,
                message,
                values,
                signed,
                openStates: [true, false, false, false]
              })
            }}
          />

          <hr />

          <div className="proof__container">
            {state.signed ? (
              <Accordion
                openStates={state.openStates}
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

                            {getTranslation(
                              `proofRequest.${state.signed ? 'signVerificationOk' : 'signVerificationError'}`
                            )}
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
            ) : null}
          </div>
        </React.Fragment>
      </section>
    )}
  />
)

ProofDetails.propTypes = {
  active: PropTypes.object,
  scribes: PropTypes.array,
  web3: PropTypes.object,
  ipfs: PropTypes.object,
  getTranslation: PropTypes.func
}

ProofDetails.defaultProps = {
  active: {}
}

export { ProofDetails }
