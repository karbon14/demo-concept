import React from 'react'
import PropTypes from 'prop-types'
import { ProofsHistory } from 'Components/ProofsHistory'
import { Dashboard } from 'Templates'

const History = ({ translations, signalHub, proofLifeContract, routerNext }) => (
  <Dashboard
    translations={translations}
    signalHub={signalHub}
    proofLifeContract={proofLifeContract}
    routerNext={routerNext}
  >
    <ProofsHistory getTranslation={translations.getTranslation} />
  </Dashboard>
)

History.propTypes = {
  translations: PropTypes.object,
  signalHub: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object
}

export default History
