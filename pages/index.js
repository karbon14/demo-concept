import Head from 'next/head'
import io from 'socket.io-client'

import { FormData } from 'Components/FormData'
import { EthereumProvider } from 'Components/EthereumProvider'

const socket = io('http://localhost:3000/')

const onSubmit = async ({ values, accounts, web3 }) => {
  const message = {
    id: (new Date()).getTime(),
    value: JSON.stringify(values),
  }

  const hash = web3.sha3(message)
  console.log('web3.eth.sign: ', web3.eth.sign)
  console.log('accounts.addresses[0]: ', accounts.addresses[0])
  console.log('hash: ', hash)
  const address = accounts.addresses[0]
  web3.eth.sign(address, hash, (err, res) => {
    if (err) {
      alert('Sign error!')
    }

    if (res) {
      socket.emit('message', { address, message: res })
    }
  })
} 

export default () => (
  <EthereumProvider
      contracts={[]}
    >
      {({ accounts = {}, deployedContracts = {}, web3, monitorErrors }) => {

        return (
          <div>
            <Head>
              <title>Karbon14 | Demo | Users</title>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div> 
              <FormData onSubmit={values => onSubmit({ values, accounts, web3 })} />
            </div>
        </div>
      )
    }}
  </EthereumProvider>
)