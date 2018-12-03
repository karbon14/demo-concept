import React from 'react'
import 'isomorphic-unfetch'
import PropTypes from 'prop-types'
import { ProofForm } from 'Components/ProofForm'
import { Dashboard } from 'Templates'

const Index = ({
  translations,
  socketIO,
  routerNext,
  proofLifeContract,
  ethereum: { accounts, web3, network, monitorErrors },
  proofLifeContract: { scribes },
  env
}) => (
  <Dashboard
    translations={translations}
    socketIO={socketIO}
    proofLifeContract={proofLifeContract}
    routerNext={routerNext}
    network={network}
  >
    <ProofForm
      getTranslation={translations.getTranslation}
      socketIO={socketIO}
      accounts={accounts}
      web3={web3}
      monitorErrors={monitorErrors}
      scribes={scribes}
      env={env}
    />
  </Dashboard>
)

Index.propTypes = {
  translations: PropTypes.object,
  socketIO: PropTypes.object,
  ethereum: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object,
  env: PropTypes.object
}

export default Index
