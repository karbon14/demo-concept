import React from 'react'
import PropTypes from 'prop-types'
import { CryptoScribes } from 'Components/CryptoScribes'
import { Dashboard } from 'Templates'

const Notaries = ({ language, signalHub, proofLifeContract, routerNext, proofLifeContract: { scribes } }) => (
  <Dashboard language={language} signalHub={signalHub} proofLifeContract={proofLifeContract} routerNext={routerNext}>
    <CryptoScribes getTranslation={language.getTranslation} scribes={scribes} />
  </Dashboard>
)

Notaries.propTypes = {
  process: PropTypes.object,
  language: PropTypes.object,
  signalHub: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object
}

Notaries.defaultProps = {
  proofLifeContract: { scribes: [] }
}

export default Notaries
