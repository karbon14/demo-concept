import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import { ScribeProfile } from './ScribeProfile'

const CryptoScribes = ({ scribes, getTranslation }) => {
  const scribesLabel = getTranslation('cryptoScribes.title')
  const scribesAmount = `(${scribes.length})`

  return (
    <section>
      <div className="container">
        <h3>{`${scribesLabel} ${scribesLabel ? scribesAmount : ''}`}</h3>

        <div className="card">
          {scribes.map((scribe, index) => (
            <ScribeProfile key={index} scribe={scribe} getTranslation={getTranslation} />
          ))}
        </div>
      </div>
      <style jsx>{style}</style>
    </section>
  )
}

CryptoScribes.propTypes = {
  scribes: PropTypes.array,
  getTranslation: PropTypes.func
}

CryptoScribes.defaultProps = {
  scribes: []
}

export { CryptoScribes }
