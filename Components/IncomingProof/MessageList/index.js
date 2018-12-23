import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import style from './style.scss'

const MessageList = ({ messages, label }) => (
  <ul className={style.MessageList}>
    {messages.map((m, i) => (
      <Link href={`/incoming-proof?scribe=${m.proof.address}`} key={i}>
        <li key={i}>
          <p>{label}</p>
          <h2>{m.proof.address}</h2>
        </li>
      </Link>
    ))}
  </ul>
)

MessageList.propTypes = {
  messages: PropTypes.array,
  label: PropTypes.string
}

export { MessageList }
