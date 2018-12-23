import React from 'react'
import Link from 'next/link'
import logo from './Assets/logo.svg'
import background from './Assets/background.svg'
import style from './style.scss'

const Error404 = () => (
  <div className={style.no__match} style={{ backgroundImage: `url(${background})` }}>
    <header className={style.no__match__header}>
      <Link href="/">
        <img src={logo} alt="Karbon14 Logo" />
      </Link>

      <h1>
        <span>Oops,</span>
        <span>nothing here.</span>
      </h1>
    </header>
  </div>
)

export { Error404 }
