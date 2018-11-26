import React from 'react'
import PropTypes from 'prop-types'
import { Dashboard } from 'Templates'
import { IncomingProof } from 'Components/IncomingProof'

const Request = ({
  translations,
  signalHub,
  proofLifeContract,
  routerNext,
  signalHub: { messages },
  ethereum: { web3, network, deployedContracts },
  ipfs
}) => (
  <Dashboard
    translations={translations}
    signalHub={signalHub}
    proofLifeContract={proofLifeContract}
    routerNext={routerNext}
    network={network}
  >
    <IncomingProof
      query={routerNext.query}
      messages={messages}
      signalHub={signalHub}
      web3={web3}
      ipfs={ipfs}
      deployedContracts={deployedContracts}
      getTranslation={translations.getTranslation}
    />
  </Dashboard>
)

Request.propTypes = {
  translations: PropTypes.object,
  signalHub: PropTypes.object,
  ethereum: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object,
  ipfs: PropTypes.object
}

export default Request
