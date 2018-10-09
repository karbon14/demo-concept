import Head from 'next/head'
import io from 'socket.io-client'

import { FormData } from 'components/FormData'

const socket = io('http://localhost:3000/')

const onSubmit = (values) => {
  const message = {
    id: (new Date()).getTime(),
    value: JSON.stringify(values),
  }
  socket.emit('message', message)
} 

export default () =>
  <div>
    <Head>
      <title>Karbon14 | Demo | Users</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div>
      <FormData onSubmit={onSubmit} />
    </div>
  </div>