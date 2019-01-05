import React from 'react'
import PropTypes from 'prop-types'
import { ProofsHistory } from 'Components/ProofsHistory'
import { Dashboard } from 'Templates'

const History = ({
  translations,
  socketIO,
  proofLifeContract,
  routerNext,
  ethereum: { web3, network },
  ipfs,
  updateUI
}) => (
  <Dashboard
    translations={translations}
    socketIO={socketIO}
    proofLifeContract={proofLifeContract}
    routerNext={routerNext}
    network={network}
    web3={web3}
    updateUI={updateUI}
  >
    <ProofsHistory
      query={routerNext.query}
      proofLifeContract={proofLifeContract}
      getTranslation={translations.getTranslation}
      web3={web3}
      ipfs={ipfs}
    />
  </Dashboard>
)

History.propTypes = {
  translations: PropTypes.object,
  socketIO: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object,
  ethereum: PropTypes.object,
  ipfs: PropTypes.object,
  updateUI: PropTypes.func
}

export default History
