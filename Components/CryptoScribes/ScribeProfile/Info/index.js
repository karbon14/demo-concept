import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'Components/Core/Toast'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import style from './style.scss'

const getEtherscanScanURL = () => {
  const etherscanURLs = {
    '1': 'https://etherscan.io',
    '3': 'https://ropsten.etherscan.io',
    '5777': '',
    '31': 'https://explorer.testnet.rsk.co'
  }

  return etherscanURLs[Number(process.env.NETWORK)]
}

const Info = ({ value, label, copiedValueMsg = '', className = '', isLink = false }) => (
  <section className={style.Info}>
    <div className={`side ${className}`}>
      <div>
        {isLink ? (
          <a rel="noopener noreferrer" target="_blank" href={`${getEtherscanScanURL()}/address/${value}`}>
            {value}
          </a>
        ) : (
          <h2>{value}</h2>
        )}

        {isLink ? (
          <CopyToClipboard
            text={value}
            onCopy={() => toast.info(copiedValueMsg, { pauseOnFocusLoss: false, position: toast.POSITION.BOTTOM_LEFT })}
          >
            <span className={value ? 'fa fa-clipboard' : ''} />
          </CopyToClipboard>
        ) : null}
      </div>
      <p>{label}</p>
    </div>
  </section>
)

Info.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  copiedValueMsg: PropTypes.string,
  className: PropTypes.string,
  isLink: PropTypes.bool
}

export { Info }
