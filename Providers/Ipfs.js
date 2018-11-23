import React from 'react'
import PropTypes from 'prop-types'
import ipfsAPI from 'ipfs-api'
import { noop } from 'lodash'

const IpfsContext = React.createContext({ addData: noop })
const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' })

const IpfsProvider = class extends React.Component {
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
    return <IpfsContext.Consumer>{context => this.props.children({ context, ...this.state })}</IpfsContext.Consumer>
  }
}

IpfsProvider.propTypes = {
  children: PropTypes.any
}

export { IpfsProvider }
