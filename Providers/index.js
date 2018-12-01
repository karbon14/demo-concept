import React from 'react'
import PropTypes from 'prop-types'
import { Adopt } from 'react-adopt'

import { IpfsProvider } from './Ipfs'
import { EthereumProvider } from './Ethereum'
import { SocketIOProvider } from './SocketIO'
import { RouterNextProvider } from './RouterNext'
import { TranslationsProvider } from './Translations'

const Providers = ({ children, contract, pathname }) => (
  <Adopt
    mapper={{
      translations: <TranslationsProvider />,
      ethereum: <EthereumProvider contracts={contract} />,
      routerNext: <RouterNextProvider pathname={pathname} />,
      socketIO: <SocketIOProvider />,
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
