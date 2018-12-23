import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import classnames from 'classnames'
import { Button } from 'Components/Core/Button'

const SwitcherForm = ({ forms, activeForm }) => (
  <section className={style.SwitcherForm}>
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
  <section className={style.SwitcherFormBottom}>
    <div className="actions__container">
      <div className="back">
        <Button type="button" icon="fa-chevron-left" disabled={activeForm === 1} onClick={onBack} />
      </div>

      <div className="right">
        <Button
          label={getTranslation('proofForm.resetLabel')}
          type="secondary"
          disabled={disabledReset}
          onClick={onReset}
        />

        <Button
          label={getTranslation(activeForm === formsNumber ? 'proofForm.submitLabel' : 'proofForm.nextFormLabel')}
          type="button"
          disabled={disabledSubmit}
          onClick={onSubmit}
        />
      </div>
    </div>
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
