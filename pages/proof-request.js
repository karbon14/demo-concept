import React from 'react'
import PropTypes from 'prop-types'
import { Dashboard } from 'Templates'
import { ProofRequest } from 'Components/ProofRequest'

const Request = ({ translations, signalHub, proofLifeContract, routerNext, signalHub: { messages } }) => (
  <Dashboard
    translations={translations}
    signalHub={signalHub}
    proofLifeContract={proofLifeContract}
    routerNext={routerNext}
  >
    <ProofRequest messages={messages} getTranslation={translations.getTranslation} query={routerNext.query} />
  </Dashboard>
)

Request.propTypes = {
  translations: PropTypes.object,
  signalHub: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object
}

export default Request
