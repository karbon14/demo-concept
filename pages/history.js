import React from 'react'
import PropTypes from 'prop-types'
import { ProofsHistory } from 'Components/ProofsHistory'
import { Dashboard } from 'Templates'

const History = ({ language, signalHub, proofLifeContract, routerNext }) => (
  <Dashboard language={language} signalHub={signalHub} proofLifeContract={proofLifeContract} routerNext={routerNext}>
    <ProofsHistory getTranslation={language.getTranslation} />
  </Dashboard>
)

History.propTypes = {
  process: PropTypes.object,
  language: PropTypes.object,
  signalHub: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object
}

export default History
