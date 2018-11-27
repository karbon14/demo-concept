import React from 'react'
import PropTypes from 'prop-types'
import { ProofsHistory } from 'Components/ProofsHistory'
import { Dashboard } from 'Templates'

const History = ({ translations, signalHub, proofLifeContract, routerNext, ethereum: { network }, ipfs }) => (
  <Dashboard
    translations={translations}
    signalHub={signalHub}
    proofLifeContract={proofLifeContract}
    routerNext={routerNext}
    network={network}
  >
    <ProofsHistory
      query={routerNext.query}
      proofLifeContract={proofLifeContract}
      getTranslation={translations.getTranslation}
      ipfs={ipfs}
    />
  </Dashboard>
)

History.propTypes = {
  translations: PropTypes.object,
  signalHub: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object,
  ethereum: PropTypes.object,
  ipfs: PropTypes.object
}

export default History
