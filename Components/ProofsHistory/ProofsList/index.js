import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import style from './style.scss'

const ProofsList = ({ proofs, labelIpfs, labelHash }) => (
  <ul className={style.ProofsList}>
    {proofs.map(({ ipfs, hash }, i) => (
      <Link href={`/history?proof=${i}`} key={i}>
        <li key={i}>
          <p>{labelHash}</p>
          <h2>{hash}</h2>

          <p>{labelIpfs}</p>
          <h2>{ipfs}</h2>
        </li>
      </Link>
    ))}
  </ul>
)

ProofsList.propTypes = {
  proofs: PropTypes.array,
  labelIpfs: PropTypes.string,
  labelHash: PropTypes.string
}

export { ProofsList }
