import React from 'react'
import PropTypes from 'prop-types'
import { CryptoScribes } from 'Components/CryptoScribes'
import { Dashboard } from 'Templates'

const Scribes = ({ translations, signalHub, proofLifeContract, routerNext, proofLifeContract: { scribes } }) => (
  <Dashboard
    translations={translations}
    signalHub={signalHub}
    proofLifeContract={proofLifeContract}
    routerNext={routerNext}
  >
    <CryptoScribes getTranslation={translations.getTranslation} scribes={scribes} />
  </Dashboard>
)

Scribes.propTypes = {
  process: PropTypes.object,
  translations: PropTypes.object,
  signalHub: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object
}

export default Scribes
