import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

const MessagesArea = ({ getTranslation }) => (
  <section>
    <div className="container">
      <h3>{getTranslation('messagesArea.title')}</h3>

      <form />
    </div>
    <style jsx>{style}</style>
  </section>
)

MessagesArea.propTypes = {
  getTranslation: PropTypes.func
}

export { MessagesArea }
