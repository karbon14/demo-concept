import React from 'react'
import PropTypes from 'prop-types'
import { Translations } from 'Translations'
import { Dropdown } from 'Components/Dropdown'
import Component from '@reactions/component'
import logo from './Assets/K14-Logo.svg'
import style from './style.scss'

const getEtherscanScanURL = () => {
  const etherscanURLs = {
    '1': 'https://etherscan.io',
    '3': 'https://ropsten.etherscan.io',
    '5777': '',
    '31': 'https://explorer.testnet.rsk.co'
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
  accountsAddress,
  contractDataLoaded,
  network
}) => (
  <header>
    <div className="container">
      <div className="logo__area">
        <div className="flex-area">
          <a rel="noopener noreferrer" href={process.env.HOME_URL} target="_blank">
            <img src={logo} alt="Karbon14 Logo" />
          </a>
          <div className="container-dropdown">
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
          <a rel="noopener noreferrer" target="_blank" href={`${getEtherscanScanURL()}/address/${accountsAddress}`}>
            {accountsAddress}
          </a>
        </div>
        {isScribe ? (
          <div className="picture">
            <span>{scribeData.firstName.slice(0, 1)}</span>
          </div>
        ) : null}
      </div>
    </div>
    <style jsx>{style}</style>
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
  accountsAddress: PropTypes.string,
  contractDataLoaded: PropTypes.bool,
  network: PropTypes.string
}

export { Header }
