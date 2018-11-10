import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

const ProofsHistory = ({ getTranslation }) => (
  <section>
    <div className="container">
      <h3>{getTranslation('proofsHistory.title')}</h3>

      <div className="card" />
    </div>
    <style jsx>{style}</style>
  </section>
)

ProofsHistory.propTypes = {
  getTranslation: PropTypes.func
}

export { ProofsHistory }
