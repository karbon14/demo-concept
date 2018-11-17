import React from 'react'
import PropTypes from 'prop-types'
import { Dashboard } from 'Templates'
import { MessagesArea } from 'Components/MessagesArea'

const ProofRequest = ({ translations, signalHub, proofLifeContract, routerNext }) => (
  <Dashboard
    translations={translations}
    signalHub={signalHub}
    proofLifeContract={proofLifeContract}
    routerNext={routerNext}
  >
    <MessagesArea getTranslation={translations.getTranslation} />
  </Dashboard>
)

ProofRequest.propTypes = {
  translations: PropTypes.object,
  signalHub: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object
}

export default ProofRequest
