import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Utils } from './Utils'
import { MessageList } from './MessageList'
import { ProofDetails } from './ProofDetails'
import style from './style.scss'

const IncomingProof = ({ messages, signalHub, web3, deployedContracts, ipfs, query, getTranslation }) => {
  const requestLabel = getTranslation('incomingProof.title')
  const requestAmount = `(${messages.length})`

  return (
    <Utils>
      {({ onSave }) => (
        <section>
          <div className="container">
            {query.scribe ? (
              <Link href="incoming-proof">
                <div className="breadcrumb">
                  <h3>{`${requestLabel} >`}</h3>
                  <h3>{query.scribe}</h3>
                </div>
              </Link>
            ) : (
              <h3>{`${requestLabel} ${requestLabel ? requestAmount : ''}`}</h3>
            )}

            <div className="card">
              {query.scribe ? (
                web3.sha3 ? (
                  <ProofDetails
                    active={messages.find(_ => _.proof.address === query.scribe)}
                    getTranslation={getTranslation}
                    signalHub={signalHub}
                    web3={web3}
                    deployedContracts={deployedContracts}
                    ipfs={ipfs}
                    onSave={onSave}
                  />
                ) : null
              ) : (
                <MessageList messages={messages} label={getTranslation('incomingProof.scriveAddress')} />
              )}
            </div>
          </div>
          <style jsx>{style}</style>
        </section>
      )}
    </Utils>
  )
}

IncomingProof.propTypes = {
  messages: PropTypes.array,
  signalHub: PropTypes.object,
  web3: PropTypes.object,
  deployedContracts: PropTypes.object,
  ipfs: PropTypes.object,
  query: PropTypes.object,
  getTranslation: PropTypes.func
}

IncomingProof.defaultProps = {
  messages: []
}

export { IncomingProof }
