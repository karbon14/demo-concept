import React from 'react'
import PropTypes from 'prop-types'
import { Translations } from 'Translations'
import { Dropdown } from 'Components/Core/Dropdown'
import Component from '@reactions/component'
import logo from './Assets/K14-Logo.svg'
import rsk from './Assets/rsk-logo-header.png'
import style from './style.scss'

const getEtherscanScanURL = () => {
  const etherscanURLs = {
    '1': 'https://etherscan.io',
    '3': 'https://ropsten.etherscan.io',
    '31': 'https://explorer.testnet.rsk.co',
    '5777': ''
  }

  return etherscanURLs[process.env.NETWORK]
}

const buildLabel = ({ isScribe, scribeData: { firstName, lastName } }) => {
  return isScribe ? `${firstName} ${lastName} | Scribe` : 'User'
}

const Header = ({
  langs,
  selectedLanguage,
  registerTranslations,
  toggleSelected,
  isScribe,
  scribeData,
  accountAddress,
  contractDataLoaded,
  network
}) => (
  <header className={style.header}>
    <div className="container">
      <div className="logo__area">
        <div className="flex__area">
          {process.env.NETWORK == '31' ? (
            <a rel="noopener noreferrer" href="https://www.rsk.co/" target="_blank">
              <img className="rsk" src={rsk} alt="RSK Logo" />
            </a>
          ) : null}
          <a rel="noopener noreferrer" href={process.env.HOME_URL} target="_blank">
            <img src={logo} alt="Karbon14 Logo" />
          </a>
          <div className="container__dropdown">
            <Component
              initialState={{
                isOpen: false
              }}
              didMount={() => {
                registerTranslations(Translations)
                toggleSelected(Translations[0])
              }}
              render={({ state, setState }) => (
                <Dropdown
                  onToggling={() => setState({ isOpen: !state.isOpen })}
                  onSelect={s => {
                    const selected = Translations.find(l => l.key === s)
                    toggleSelected(selected)
                    setState({ isOpen: false })
                  }}
                  data={langs}
                  selected={selectedLanguage}
                  isOpen={state.isOpen}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="account__area">
        <div className="info">
          <p>
            {contractDataLoaded ? `${buildLabel({ isScribe, scribeData })} ${network ? `| ${network}` : ''}` : null}
          </p>
          <a rel="noopener noreferrer" target="_blank" href={`${getEtherscanScanURL()}/address/${accountAddress}`}>
            {accountAddress}
          </a>
        </div>
        {isScribe ? (
          <div className="picture">
            <span>{scribeData.firstName.slice(0, 1)}</span>
          </div>
        ) : null}
      </div>
    </div>
  </header>
)

Header.propTypes = {
  langs: PropTypes.array,
  defaultLang: PropTypes.string,
  selectedLanguage: PropTypes.string,
  registerTranslations: PropTypes.func,
  toggleSelected: PropTypes.func,
  isScribe: PropTypes.bool,
  scribeData: PropTypes.object,
  accountAddress: PropTypes.string,
  contractDataLoaded: PropTypes.bool,
  network: PropTypes.string
}

export { Header }
