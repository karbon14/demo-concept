import React from 'react'
import PropTypes from 'prop-types'
import IO from 'socket.io-client'
import { toast } from 'Components/Toast'

const SocketIOContext = React.createContext({ messages: [] })

const SocketIOProvider = class extends React.Component {
  constructor() {
    super()

    this.socket = IO()
    this.channel = 'message'

    this.state = {
      messages: [],
      channel: this.channel,
      instance: this.socket,
      broadcast: (channel, msg) => this.socket.emit(channel, msg),
      subscribe: (channel, fn) => this.socket.on(channel, fn),
      connect: this.socket.connect(),
      disconnect: this.socket.disconnect(),
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
      toast.info(this.state.receivedMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })
    }
  }

  componentDidMount() {
    this.socket.connect()
  }

  componentWillUnmount() {
    this.socket.disconnect()
  }

  render() {
    return (
      <SocketIOContext.Consumer>
        {context => this.props.children({ ...context, ...this.state })}
      </SocketIOContext.Consumer>
    )
  }
}

SocketIOProvider.propTypes = {
  children: PropTypes.func
}

export { SocketIOProvider }
