import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import style from './style.scss'

const MessageList = ({ messages, label }) => (
  <ul>
    {messages.map((m, i) => (
      <Link href={`/proof-request?user=${m.proof.address}`} key={i}>
        <li key={i}>
          <p>{label}</p>
          <h2>{m.proof.address}</h2>
        </li>
      </Link>
    ))}
    <style jsx>{style}</style>
  </ul>
)

MessageList.propTypes = {
  messages: PropTypes.array,
  label: PropTypes.string
}

export { MessageList }
