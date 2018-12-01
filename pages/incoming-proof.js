import React from 'react'
import PropTypes from 'prop-types'
import { Dashboard } from 'Templates'
import { IncomingProof } from 'Components/IncomingProof'

const Request = ({
  translations,
  socketIO,
  proofLifeContract,
  routerNext,
  socketIO: { messages },
  ethereum: { web3, network, deployedContracts },
  ipfs,
  updateUI
}) => (
  <Dashboard
    translations={translations}
    socketIO={socketIO}
    proofLifeContract={proofLifeContract}
    routerNext={routerNext}
    network={network}
  >
    <IncomingProof
      query={routerNext.query}
      messages={messages}
      socketIO={socketIO}
      web3={web3}
      ipfs={ipfs}
      deployedContracts={deployedContracts}
      updateUI={updateUI}
      getTranslation={translations.getTranslation}
    />
  </Dashboard>
)

Request.propTypes = {
  translations: PropTypes.object,
  socketIO: PropTypes.object,
  ethereum: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object,
  ipfs: PropTypes.object,
  updateUI: PropTypes.func
}

export default Request
