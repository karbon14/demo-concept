import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import style from './style.scss'

const NavMenu = ({ items }) => (
  <div className={style.nav__menu}>
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
  </div>
)

NavMenu.propTypes = {
  items: PropTypes.array
}

export { NavMenu }
