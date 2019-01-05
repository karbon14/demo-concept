import React from 'react'
import PropTypes from 'prop-types'
import { Dashboard } from 'Templates'
import { ProofRequest } from 'Components/ProofRequest'

const Request = ({
  translations,
  socketIO,
  proofLifeContract,
  routerNext,
  socketIO: { messages },
  ethereum: { accounts, web3, network },
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
    <ProofRequest
      query={routerNext.query}
      messages={messages}
      socketIO={socketIO}
      accounts={accounts}
      web3={web3}
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
  updateUI: PropTypes.func
}

export default Request
