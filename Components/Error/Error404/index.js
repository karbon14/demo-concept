import React from 'react'
import Link from 'next/link'
import style from './style.scss'
import logo from './Assets/logo.svg'
import background from './Assets/background.svg'
import './Assets/background.svg'

const Error404 = () => (
  <div className="no-match" style={{ backgroundImage: `url(${background})` }}>
    <header className="no-match__header">
      <Link href="/">
        <img src={logo} alt="Karbon14 Logo" />
      </Link>

      <h1>
        <span>Oops,</span>
        <span>nothing here.</span>
      </h1>
    </header>
    <style jsx>{style}</style>
  </div>
)

export { Error404 }
