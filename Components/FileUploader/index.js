import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import dropImg from './Assets/dropImg.svg'

const FileUploader = class extends React.Component {
  static propTypes = {
    onUpload: PropTypes.func.isRequired,
    label: PropTypes.string,
    dropLabel: PropTypes.string,
    preview: PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string,
      onClear: PropTypes.func
    })
  }

  static defaultProps = {
    label: 'File',
    dropLabel: 'Drop'
  }

  constructor(props) {
    super(props)

    this.dzRef = this.dzRef ? this.dzRef : React.createRef()
    this.state = { isOnDrag: false }
  }

  componentDidMount() {
    this._setListeners()
  }

  componentWillUnmount() {
    if (this.dzRef.current) {
      this.dzRef.current.removeEventListener('drop', this._handleFileUpload)
      this.dzRef.current.removeEventListener('dragover', this._handleDragOver)
      this.dzRef.current.removeEventListener('dragleave', this._handleDragLeave)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.preview !== this.props.preview) {
      if (!this.props.preview) this._setListeners()
    }
  }

  _setListeners() {
    if (this.dzRef.current) {
      this.dzRef.current.addEventListener('drop', this._handleFileUpload)
      this.dzRef.current.addEventListener('dragover', this._handleDragOver)
      this.dzRef.current.addEventListener('dragleave', this._handleDragLeave)
    }
  }

  _handleFileUpload = e => {
    e.preventDefault()
    this.setState({ isOnDrag: false })

    const files = e.target.files || e.dataTransfer.files
    this.props.onUpload(Array.from(files))
  }

  _handleDragOver = e => {
    e.preventDefault()
    this.state.isOnDrag === false && this.setState({ isOnDrag: true })
  }

  _handleDragLeave = e => {
    e.preventDefault()
    this.state.isOnDrag && this.setState({ isOnDrag: false })
  }

  renderUploader() {
    return (
      <div className={style.fileUploader}>
        <section className="topSection">
          <label>{this.props.label}</label>
          <label htmlFor="file" className="upload">
            <i className="fa fa-picture-o" />
          </label>
        </section>
        <div ref={this.dzRef} className={` droppable ${this.state.isOnDrag ? 'onDrag' : ''}`}>
          <div className="noFiles">
            <input
              className="hiddenFileUpload"
              onChange={this._handleFileUpload}
              type="file"
              id="file"
              accept="image/*"
            />
            <p className="uploadText">
              <img src={dropImg} />
              <span>{this.props.dropLabel}</span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  renderPreview() {
    return (
      <div className={style.fileUploader}>
        <section className="topSection">
          <label className="name">{this.props.preview.name}</label>
          <i
            className="fa fa-close"
            onClick={() => {
              this.props.preview.onClear()
            }}
          />
        </section>
        <img src={this.props.preview.url} className="preview" />
      </div>
    )
  }

  render() {
    return this.props.preview ? this.renderPreview() : this.renderUploader()
  }
}

export { FileUploader }
