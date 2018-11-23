import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Utils } from './Utils'
import { MessageList } from './MessageList'
import { ProofDetails } from './ProofDetails'
import style from './style.scss'

const ProofRequest = ({ messages, signalHub, accounts, web3, query, getTranslation }) => {
  const requestLabel = getTranslation('proofRequest.title')
  const requestAmount = `(${messages.length})`

  return (
    <Utils>
      {({ onReject, onApprove }) => (
        <section>
          <div className="container">
            {query.user ? (
              <Link href="proof-request">
                <div className="breadcrumb">
                  <h3>{`${requestLabel} >`}</h3>
                  <h3>{query.user}</h3>
                </div>
              </Link>
            ) : (
              <h3>{`${requestLabel} ${requestLabel ? requestAmount : ''}`}</h3>
            )}

            <div className="card">
              {query.user ? (
                <ProofDetails
                  active={messages.find(_ => _.proof.address === query.user)}
                  getTranslation={getTranslation}
                  signalHub={signalHub}
                  accounts={accounts}
                  web3={web3}
                  onReject={onReject}
                  onApprove={onApprove}
                />
              ) : (
                <MessageList messages={messages} label={getTranslation('proofRequest.userAddress')} />
              )}
            </div>
          </div>
          <style jsx>{style}</style>
        </section>
      )}
    </Utils>
  )
}

ProofRequest.propTypes = {
  messages: PropTypes.array,
  signalHub: PropTypes.object,
  accounts: PropTypes.object,
  web3: PropTypes.object,
  query: PropTypes.object,
  getTranslation: PropTypes.func
}

ProofRequest.defaultProps = {
  messages: []
}

export { ProofRequest }
