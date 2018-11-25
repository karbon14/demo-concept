import React from 'react'
import PropTypes from 'prop-types'
import { Dashboard } from 'Templates'
import { ProofRequest } from 'Components/ProofRequest'

const Request = ({
  translations,
  signalHub,
  proofLifeContract,
  routerNext,
  signalHub: { messages },
  ethereum: { accounts, web3, network }
}) => (
  <Dashboard
    translations={translations}
    signalHub={signalHub}
    proofLifeContract={proofLifeContract}
    routerNext={routerNext}
    network={network}
  >
    <ProofRequest
      query={routerNext.query}
      messages={messages}
      signalHub={signalHub}
      accounts={accounts}
      web3={web3}
      getTranslation={translations.getTranslation}
    />
  </Dashboard>
)

Request.propTypes = {
  translations: PropTypes.object,
  signalHub: PropTypes.object,
  ethereum: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object
}

export default Request
