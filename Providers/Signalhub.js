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

    const values = JSON.stringify({
      firstName: 'Jose',
      lastName: 'Casella',
      email: 'test@gmail.com',
      address: 'Falsa 1234',
      country: 'AR',
      countryName: 'Argentina',
      state: 'Buenos Aires',
      id: '35621341'
    })

    this.state = {
      broadcast: this.hub.broadcast.bind(this.hub),
      subscribe: this.hub.subscribe.bind(this.hub),
      channel: this.channel,
      appName: this.appName,
      messages: [
        {
          selectedScribe: '0xcdd79fb57a701463d11c4d34007553c3d5afdcee',
          proof: {
            address: '0xeb7691764d1802a108aecb3f0ff7a1f2fc16a5fd',
            signedHash:
              '0x7d53457994301a85a8b9b17096a1ce52901ce7be4c740f61da6ac29ac65ce95f58d3d31a07ce6f3279a0f26a4b45f709c0f5dcf2ab0915b90415db4efa281ecc1b',
            message: JSON.stringify({ id: 1542638874769, values })
          }
        },
        {
          selectedScribe: '0xcdd79fb57a701463d11c4d34007553c3d5afdcee',
          proof: {
            address: '0xeb7691764d1802a108aecb3f0ff7a1f2fc16a5fe',
            signedHash:
              '0x9d907cc350b365c02224f6845b3712bd364190b7ac117b21bf4f67a0dd230f9209ba7aa0595639e8f3496604224ef4e519d651f7596df796d0336290c8a06a111c',
            message: JSON.stringify({ id: 1542638874769, values })
          }
        }
      ],
      receivedMsg: '',
      setReceivedMsg: receivedMsg => this.setState({ receivedMsg }),
      saveMessage: msg => this.setState({ messages: [...this.state.messages, msg] }),
      removeMessage: proof =>
        this.setState({
          messages: this.state.messages.filter(_ => _.proof.address !== proof.address)
        })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.messages.length > prevState.messages.length) {
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
