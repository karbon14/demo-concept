import React from 'react'
import ipfsAPI from 'ipfs-api'

const IpfsContext = React.createContext()
const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' })

class Provider extends React.Component {
  constructor() {
    super()

    this.state = {
      add: this.add,
      get: this.get
    }
  }

  addData(data = {}, callback = () => {}) {
    const buffer = ipfs.Buffer(JSON.stringify(data))

    ipfs.files.add(buffer, (err, file) => callback(err, file))
  }

  render() {
    return (
      <IpfsContext.Provider value={this.state}>
        {this.props.children}
      </IpfsContext.Provider>
    )
  }
}

export const Ipfs = {
  Consumer: IpfsContext.Consumer,
  Provider
}
