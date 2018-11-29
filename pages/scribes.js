import React from 'react'
import PropTypes from 'prop-types'
import { CryptoScribes } from 'Components/CryptoScribes'
import { Dashboard } from 'Templates'

const Scribes = ({
  translations,
  socketIO,
  proofLifeContract,
  routerNext,
  proofLifeContract: { scribes },
  ethereum: { network }
}) => (
  <Dashboard
    translations={translations}
    socketIO={socketIO}
    proofLifeContract={proofLifeContract}
    routerNext={routerNext}
    network={network}
  >
    <CryptoScribes getTranslation={translations.getTranslation} scribes={scribes} />
  </Dashboard>
)

Scribes.propTypes = {
  process: PropTypes.object,
  translations: PropTypes.object,
  socketIO: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object,
  ethereum: PropTypes.object
}

export default Scribes
