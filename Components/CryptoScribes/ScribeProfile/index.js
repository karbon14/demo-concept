import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import { Info } from './Info'

const ScribeProfile = ({ scribe, getTranslation }) => (
  <section>
    <div className="picture">
      <span>{scribe?.firstName.slice(0, 1)}</span>
    </div>

    <div className="info__container">
      <div className="double">
        <Info value={scribe?.firstName} label={getTranslation('cryptoScribes.firstName')} className="double" />
        <Info value={scribe?.lastName} label={getTranslation('cryptoScribes.lastName')} className="double" />
      </div>

      <Info
        value={scribe?.address}
        label={getTranslation('cryptoScribes.scribeAddress')}
        copiedValueMsg={getTranslation('cryptoScribes.copiedAddress')}
        isLink={true}
      />
    </div>
    <style jsx>{style}</style>
  </section>
)

ScribeProfile.propTypes = {
  scribe: PropTypes.object,
  getTranslation: PropTypes.func
}

export { ScribeProfile }
