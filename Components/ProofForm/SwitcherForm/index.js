import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import classnames from 'classnames'
import { theme } from 'Common/Core'
import { Button } from '@react-core/button'

const SwitcherForm = ({ forms, activeForm }) => (
  <section>
    <div className="top__content">
      <div className="current__container">
        {forms.map(({ id }) => (
          <span className={classnames({ active: id <= activeForm })} key={id}>
            {id}
          </span>
        ))}
      </div>

      {forms.map(({ id, child }) => (
        <div
          key={id}
          className={classnames({
            active: id === activeForm,
            hidden: id !== activeForm
          })}
        >
          {child}
        </div>
      ))}
    </div>
    <style jsx>{style}</style>
  </section>
)

SwitcherForm.propTypes = {
  forms: PropTypes.array,
  activeForm: PropTypes.number
}

const FormActions = ({
  formsNumber,
  activeForm,
  disabledReset,
  disabledSubmit,
  onReset,
  onBack,
  onSubmit,
  getTranslation
}) => (
  <section className="bottom">
    <div className="actions__container">
      <div className="back">
        <Button theme={theme} type="button" icon="fa-chevron-left" disabled={activeForm === 1} onClick={onBack} />
      </div>

      <div className="right">
        <Button
          theme={theme}
          label={getTranslation('poofForm.resetLabel')}
          type="secondary"
          disabled={disabledReset}
          onClick={onReset}
        />

        <Button
          theme={theme}
          label={getTranslation(activeForm === formsNumber ? 'poofForm.submitLabel' : 'poofForm.nextFormLabel')}
          type="button"
          disabled={disabledSubmit}
          onClick={onSubmit}
        />
      </div>
    </div>
    <style jsx>{style}</style>
  </section>
)

FormActions.propTypes = {
  formsNumber: PropTypes.number,
  activeForm: PropTypes.number,
  disabledReset: PropTypes.bool,
  disabledSubmit: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  onBack: PropTypes.func,
  onReset: PropTypes.func,
  onSubmit: PropTypes.func,
  getTranslation: PropTypes.func
}

export { SwitcherForm, FormActions }
