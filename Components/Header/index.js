import React from 'react'
import PropTypes from 'prop-types'
import { SwitcherLang } from '../SwitcherLang'
import logo from './Assets/K14-Logo.svg'
import style from './style.scss'

const Header = () => (
  <header>
    <div className="container">
      <div className="logo__area">
        <div className="flex-area">
          <a rel="noopener noreferrer" href={process.env.HOME_URL} target="_blank">
            <img src={logo} alt="Karbon14 Logo" />
          </a>
          <div className="container-dropdown">
            <SwitcherLang />
          </div>
        </div>
      </div>
    </div>
    <style jsx>{style}</style>
  </header>
)

Header.propTypes = {
  selectedLanguage: PropTypes.string,
  getTranslation: PropTypes.func
}

export { Header }
