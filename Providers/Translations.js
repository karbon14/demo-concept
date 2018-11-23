import React from 'react'
import { get, noop } from 'lodash'
import PropTypes from 'prop-types'
import Component from '@reactions/component'
import ReactHtmlParser from 'react-html-parser'

const TranslationsContext = React.createContext({
  getTranslation: noop,
  langs: [],
  selectedLanguage: '',
  selectedTanslation: {}
})

const TranslationsProvider = ({ children }) => (
  <TranslationsContext.Consumer>
    {context => (
      <Component
        initialState={context}
        render={({ state, setState }) => {
          return children({
            ...state,
            registerTranslations: langs => {
              setState({ langs })
            },
            toggleSelected: (selectedLanguage = {}) => {
              const { key, translation } = selectedLanguage
              setState({
                selectedLanguage: key,
                selectedTanslation: translation
              })
            },
            getTranslation: (key, parse = false) => {
              const translation = get(state.selectedTanslation, key, '')
              return parse ? ReactHtmlParser(translation) : translation
            }
          })
        }}
      />
    )}
  </TranslationsContext.Consumer>
)

TranslationsProvider.propTypes = {
  children: PropTypes.func
}

export { TranslationsProvider }
