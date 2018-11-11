import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import { theme } from 'Common/Core'
import { Select } from 'Components/Select'
import { TextField } from '@react-core/textfield'

const Personal = ({ api, getTranslation }) => {
  const countries = getTranslation('countries') || []
  const states = getTranslation('states') || []

  return (
    <div className="form__container">
      <div className="line">
        <div className="item">
          <TextField
            type="text"
            name="firstName"
            label={getTranslation('poofForm.firstName')}
            placeholder={api.errors.firstName}
            theme={theme}
            value={api.values.firstName}
            onKeyUp={new Function()}
            onChange={api.handleChange}
            onBlur={api.handleBlur}
            data-invalid={api.touched.firstName && !!api.errors.firstName}
          />
        </div>

        <div className="item">
          <TextField
            type="text"
            name="lastName"
            label={getTranslation('poofForm.lastName')}
            placeholder={api.errors.lastName}
            theme={theme}
            value={api.values.lastName}
            onKeyUp={new Function()}
            onChange={api.handleChange}
            onBlur={api.handleBlur}
            data-invalid={api.touched.lastName && !!api.errors.lastName}
          />
        </div>
      </div>

      <TextField
        type="text"
        name="email"
        label={getTranslation('poofForm.email')}
        placeholder={api.errors.email}
        theme={theme}
        value={api.values.email}
        onKeyUp={new Function()}
        onChange={api.handleChange}
        onBlur={api.handleBlur}
        data-invalid={api.touched.email && !!api.errors.email}
      />

      <TextField
        type="email"
        name="adress"
        label={getTranslation('poofForm.adress')}
        placeholder={api.errors.adress}
        theme={theme}
        value={api.values.adress}
        onKeyUp={new Function()}
        onChange={api.handleChange}
        onBlur={api.handleBlur}
        data-invalid={api.touched.adress && !!api.errors.adress}
      />

      <div className="line">
        <div className="item">
          <Select
            name="country"
            theme={theme}
            value={api.values.country}
            data-invalid={api.touched.country && !!api.errors.country}
            defaultLabel={getTranslation('poofForm.country')}
            options={countries.map(e => ({
              label: e.name,
              key: e.code,
              value: e.code
            }))}
            onBlur={api.handleBlur}
            onChange={e => {
              const countryStates = states[e.target.value].map(e => ({
                label: e.name,
                key: e.code ? e.code : e.name,
                value: e.code ? e.code : e.name
              }))

              api.setValues({
                ...api.values,
                country: e.target.value,
                state: countryStates.length ? countryStates[0].key : ''
              })
            }}
          />
        </div>

        <div className="item">
          <Select
            name="state"
            theme={theme}
            value={api.values.state}
            data-invalid={api.touched.state && !!api.errors.state}
            defaultLabel={getTranslation('poofForm.state')}
            options={
              api.values.country && states[api.values.country]
                ? states[api.values.country].map(e => ({
                    label: e.name,
                    key: e.code ? e.code : e.name,
                    value: e.code ? e.code : e.name
                  }))
                : []
            }
            onBlur={api.handleBlur}
            onChange={api.handleChange}
            disabled={!api.values.country}
          />
        </div>
      </div>
      <style jsx>{style}</style>
    </div>
  )
}

Personal.propTypes = {
  api: PropTypes.object,
  getTranslation: PropTypes.func
}

export { Personal }
