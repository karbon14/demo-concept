import React from 'react'
import PropTypes from 'prop-types'
import { Dashboard } from 'Templates'
import { MessagesArea } from 'Components/MessagesArea'

const ProofRequest = ({ language, signalHub, proofLifeContract, routerNext }) => (
  <Dashboard language={language} signalHub={signalHub} proofLifeContract={proofLifeContract} routerNext={routerNext}>
    <MessagesArea getTranslation={language.getTranslation} />
  </Dashboard>
)

ProofRequest.propTypes = {
  process: PropTypes.object,
  language: PropTypes.object,
  signalHub: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object
}

export default ProofRequest
