import React from 'react'
import PropTypes from 'prop-types'
import Component from '@reactions/component'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'Components/Toast'
import { ScribeProfile } from 'Components/CryptoScribes/ScribeProfile'
import style from './style.scss'

const ProofDetails = ({ active, scribes, ipfs, getTranslation }) => (
  <Component
    initialState={{
      ipfs: active.ipfs,
      hash: active.hash,
      ipfsContent: {}
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
    render={({ state }) => (
      <div className="details">
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
                <p className="value">{state.ipfsContent.hash}</p>
              </div>

              <ScribeProfile
                scribe={scribes.find(_ => _.address === state.ipfsContent.address)}
                getTranslation={getTranslation}
              />
            </div>
          ) : null}
        </React.Fragment>
        <style jsx>{style}</style>
      </div>
    )}
  />
)

ProofDetails.propTypes = {
  active: PropTypes.object,
  scribes: PropTypes.array,
  ipfs: PropTypes.object,
  getTranslation: PropTypes.func
}

ProofDetails.defaultProps = {
  active: {}
}

export { ProofDetails }
