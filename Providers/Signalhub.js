import React from 'react'
import signalhub from 'signalhub'
import PropTypes from 'prop-types'
import { toast } from 'Components/Toast'

const SignalHubContext = React.createContext({ messages: [], appName: '', channel: '', broadcast: new Function() })

const SignalHubProvider = class extends React.Component {
  constructor() {
    super()

    this.broadcast = () => {}
    this.signalUrls = ['http://localhost:8080']
    this.appName = 'appName'
    this.channel = 'karbon14'
    this.hub = signalhub(this.appName, this.signalUrls)

    // const values = JSON.stringify({
    //   firstName: 'Jose',
    //   lastName: 'Casella',
    //   email: 'test@gmail.com',
    //   address: 'Falsa 1234',
    //   country: 'AR',
    //   countryName: 'Argentina',
    //   state: 'Buenos Aires',
    //   id: '35621341'
    // })

    this.state = {
      broadcast: this.hub.broadcast.bind(this.hub),
      subscribe: this.hub.subscribe.bind(this.hub),
      channel: this.channel,
      appName: this.appName,
      messages: [
        // {
        //   selectedScribe: '0xcdd79fb57a701463d11c4d34007553c3d5afdcee',
        //   proof: {
        //     address: '0xeb7691764d1802a108aecb3f0ff7a1f2fc16a5fd',
        //     hash: '0x5f69777196dde767d2b0c008dea6a4a20cfa877f56d1ee227b256253d5b34dfb',
        //     signedHash:
        //       '0x9d907cc350b365c02224f6845b3712bd364190b7ac117b21bf4f67a0dd230f9209ba7aa0595639e8f3496604224ef4e519d651f7596df796d0336290c8a06a111c',
        //     message: JSON.stringify({ id: 1542638874769, values })
        //   }
        // },
        // {
        //   selectedScribe: '0xcdd79fb57a701463d11c4d34007553c3d5afdcee',
        //   proof: {
        //     address: '0xeb7691764d1802a108aecb3f0ff7a1f2fc16a5fe',
        //     hash: '0x5f69777196dde767d2b0c008dea6a4a20cfa877f56d1ee227b256253d5b34dfb',
        //     signedHash:
        //       '0x9d907cc350b365c02224f6845b3712bd364190b7ac117b21bf4f67a0dd230f9209ba7aa0595639e8f3496604224ef4e519d651f7596df796d0336290c8a06a111c',
        //     message: JSON.stringify({ id: 1542638874769, values })
        //   }
        // }
      ],
      receivedMsg: '',
      setReceivedMsg: receivedMsg => this.setState({ receivedMsg }),
      saveMessage: msg => this.setState({ messages: [...this.state.messages, msg] })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.messages.length !== prevState.messages.length) {
      toast.info(this.state.receivedMsg, { position: toast.POSITION.BOTTOM_LEFT })
    }
  }

  render() {
    return (
      <SignalHubContext.Consumer>
        {context => this.props.children({ ...context, ...this.state })}
      </SignalHubContext.Consumer>
    )
  }
}

SignalHubProvider.propTypes = {
  children: PropTypes.func
}

export { SignalHubProvider }
