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
      getData: this.getData,
      cat: this.cat
    }
  }

  addData(data = {}) {
    const buffer = ipfs.Buffer(JSON.stringify(data))
    return new Promise((resolve, reject) => {
      ipfs.files.add(buffer, (err, file) => {
        if (err) reject(err)
        if (file) resolve(file)
      })
    })
  }

  getData(path = '') {
    return new Promise((resolve, reject) => {
      ipfs.files.get(path, (err, file) => {
        if (err) reject(err)
        if (file) resolve(file)
      })
    })
  }

  cat(path = '') {
    return new Promise((resolve, reject) => {
      ipfs.files.cat(path, (err, file) => {
        if (err) reject(err)
        if (file) resolve(file)
      })
    })
  }

  render() {
    return <IpfsContext.Consumer>{context => this.props.children({ ...context, ...this.state })}</IpfsContext.Consumer>
  }
}

IpfsProvider.propTypes = {
  children: PropTypes.any
}

export { IpfsProvider }
