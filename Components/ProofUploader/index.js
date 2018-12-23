import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

const ProofUploader = class extends React.Component {
  static propTypes = {
    onUpload: PropTypes.func.isRequired,
    label: PropTypes.string
  }

  static defaultProps = {
    label: 'Proof'
  }

  constructor(props) {
    super(props)

    this.dzRef = this.dzRef ? this.dzRef : React.createRef()
    this.state = { isOnDrag: false }
  }

  _handleFileUpload = e => {
    e.preventDefault()
    this.setState({ isOnDrag: false })

    const files = e.target.files || e.dataTransfer.files
    this.props.onUpload(files[0])
  }

  render() {
    return (
      <div className={style.proofUploader}>
        <section className="topSection">
          <label>{this.props.label}</label>
          <label htmlFor="file" className="upload">
            <i className="fa fa-upload" />
          </label>
        </section>
        <div ref={this.dzRef}>
          <div className="noFiles">
            <input className="hiddenFileUpload" onChange={this._handleFileUpload} type="file" id="file" accept=".k14" />
          </div>
        </div>
      </div>
    )
  }
}

export { ProofUploader }
