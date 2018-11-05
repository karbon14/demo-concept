import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

const CriptoNotaries = ({ getTranslation }) => (
  <section>
    <div className="container">
      <h3>{getTranslation('cryptoNotaries.title')}</h3>

      <form />
    </div>
    <style jsx>{style}</style>
  </section>
)

CriptoNotaries.propTypes = {
  getTranslation: PropTypes.func
}

export { CriptoNotaries }
