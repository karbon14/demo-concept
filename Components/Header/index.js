import React from 'react'
import PropTypes from 'prop-types'
import { Translations } from 'Translations'
import { Dropdown } from 'Components/Dropdown'
import Component from '@reactions/component'
import logo from './Assets/K14-Logo.svg'
import style from './style.scss'

const Header = ({ langs, selectedLanguage, registerTranslations, toggleSelected }) => (
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
    </div>
    <style jsx>{style}</style>
  </header>
)

Header.propTypes = {
  langs: PropTypes.array,
  defaultLang: PropTypes.string,
  selectedLanguage: PropTypes.string,
  registerTranslations: PropTypes.func,
  toggleSelected: PropTypes.func
}

export { Header }
