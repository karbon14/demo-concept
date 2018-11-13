import React from 'react'
import PropTypes from 'prop-types'
import ipfsAPI from 'ipfs-api'
import { noop } from 'lodash'

const IpfsContext = React.createContext({ addData: noop })
const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' })

class Provider extends React.Component {
  constructor() {
    super()

    this.state = {
      addData: this.addData,
      get: this.get
    }
  }

  addData(data = {}, callback = () => {}) {
    const buffer = ipfs.Buffer(JSON.stringify(data))

    ipfs.files.add(buffer, (err, file) => callback(err, file))
  }

  render() {
    return <IpfsContext.Provider value={this.state}>{this.props.children}</IpfsContext.Provider>
  }
}

Provider.propTypes = {
  children: PropTypes.node
}

export const Ipfs = {
  Consumer: IpfsContext.Consumer,
  Provider
}
