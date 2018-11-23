import React from 'react'
import PropTypes from 'prop-types'
import { Adopt } from 'react-adopt'

import { IpfsProvider } from './Ipfs'
import { EthereumProvider } from './Ethereum'
import { SignalHubProvider } from './SignalHub'
import { RouterNextProvider } from './RouterNext'
import { TranslationsProvider } from './Translations'

const Providers = ({ children, contract, pathname }) => (
  <Adopt
    mapper={{
      translations: <TranslationsProvider />,
      ethereum: <EthereumProvider contracts={contract} />,
      routerNext: <RouterNextProvider pathname={pathname} />,
      signalHub: <SignalHubProvider />,
      ipfs: <IpfsProvider />
    }}
  >
    {_ => children(_)}
  </Adopt>
)

Providers.propTypes = {
  children: PropTypes.func,
  contract: PropTypes.array,
  pathname: PropTypes.string
}

export { Providers }
