import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Component from '@reactions/component'
import { AboutModal } from './AboutModal'
import style from './style.scss'

const NavMenu = ({
  items,
  scribes,
  network,
  deployedContracts,
  getTranslation,
  web3,
  accountAddress,
  isScribe,
  updateUI
}) => (
  <Component
    initialState={{ isModalOpen: false }}
    render={({ state, setState }) => (
      <div className={style.nav__menu}>
        <div className="menu">
          <ul>
            {items.map((item, index) =>
              item.hidden ? null : (
                <Link href={item.route} key={index}>
                  <li>
                    <a className={classNames({ selected: item.selected })}>
                      <img src={item.selected ? item.iconSelected : item.icon} alt={item.name} />
                      <span>{item.name}</span>
                    </a>
                    {item.notifications ? <span className={style.badge}>{item.notifications}</span> : null}
                  </li>
                </Link>
              )
            )}
          </ul>

          <div className="bottom__container" onClick={() => setState({ isModalOpen: true })}>
            <a className={classNames({ selected: state.isModalOpen })}>
              <img src={require('/static/icons/about.svg')} alt="K14 Info" />
              <span>{getTranslation('navMenu.about')}</span>
            </a>
          </div>
        </div>

        {state.isModalOpen ? (
          <AboutModal
            scribes={scribes}
            network={network}
            deployedContracts={deployedContracts}
            getTranslation={getTranslation}
            web3={web3}
            accountAddress={accountAddress}
            isScribe={isScribe}
            onClose={() => setState({ isModalOpen: false })}
            updateUI={updateUI}
          />
        ) : null}
      </div>
    )}
  />
)

NavMenu.propTypes = {
  items: PropTypes.array,
  scribes: PropTypes.array,
  network: PropTypes.string,
  deployedContracts: PropTypes.object,
  web3: PropTypes.object,
  accountAddress: PropTypes.string,
  isScribe: PropTypes.bool,
  onClose: PropTypes.func,
  updateUI: PropTypes.func,
  getTranslation: PropTypes.func
}

export { NavMenu }
