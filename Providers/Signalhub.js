import React from 'react'
import signalhub from 'signalhub'

const SignalhubContext = React.createContext()

class Provider extends React.Component {
  constructor() {
    super()

    this.broadcast = () => {}
    this.signalUrls = ['http://localhost:8080']
    this.appName = 'appName'
    this.channel = 'karbon14'
    this.hub = signalhub(this.appName, this.signalUrls)

    this.state = {
      broadcast: this.hub.broadcast.bind(this.hub),
      channel: this.channel,
      appName: this.appName,
    }
  }

  componentDidMount() {
    this.hub.subscribe(this.channel).on('data', (message) => {
      console.log("message ",message)
    })
  }

  render() {

    return (
      <SignalhubContext.Provider value={this.state}>
        {this.props.children}
      </SignalhubContext.Provider>
    )
  }
}

export const Signalhub = {
  Consumer: SignalhubContext.Consumer,
  Provider
}