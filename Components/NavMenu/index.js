import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Component from '@reactions/component'
import { Modal } from 'Components/Core/Modal'
import { toast } from 'Components/Core/Toast'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import logo from './Assets/karbon-logo.svg'
import logoRsk from './Assets/rsk-logo.png'
import logoEth from './Assets/eth-logo.svg'
import style from './style.scss'

const getEtherscanScanURL = () => {
  const etherscanURLs = {
    '1': 'https://etherscan.io',
    '3': 'https://ropsten.etherscan.io',
    '5777': '',
    '31': 'https://explorer.testnet.rsk.co'
  }

  return etherscanURLs[process.env.NETWORK]
}

const NavMenu = ({ items, scribes, network, deployedContracts: { ProofLife = {} }, getTranslation }) => {
  const { address } = ProofLife

  return (
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
            <Modal onClose={() => setState({ isModalOpen: false })} contentStyle={{ maxWidth: 640 }}>
              <div className="modal">
                <section className="header">
                  <div>
                    <h2>{`Karbon 14 | Demo ${process.env.NETWORK == '31' ? 'RSK (Testnet)' : 'ETH (Ropsten)'}`}</h2>
                  </div>
                  <i onClick={() => setState({ isModalOpen: false })} className="fa fa-close" />
                </section>

                <section className="body">
                  <div className="top">
                    <div className="logos">
                      {process.env.NETWORK == '31' ? (
                        <a rel="noopener noreferrer" href="https://www.rsk.co/" target="_blank">
                          <img src={logoRsk} alt="RSK Logo" />
                        </a>
                      ) : null}
                      {process.env.NETWORK == '3' ? (
                        <a rel="noopener noreferrer" href="https://www.ethereum.org/" target="_blank">
                          <img src={logoEth} alt="ETH Logo" />
                        </a>
                      ) : null}
                      <a rel="noopener noreferrer" href={process.env.HOME_URL} target="_blank">
                        <img className="karbon" src={logo} alt="Karbon14 Logo" />
                      </a>
                    </div>

                    <div className="links">
                      <p>{getTranslation('navMenu.getInvolved')}</p>
                      <a rel="noopener noreferrer" href="https://whitepaper.karbon14.org" target="_blank">
                        https://whitepaper.karbon14.org
                      </a>
                      <a rel="noopener noreferrer" href="https://crowdsale.karbon14.org" target="_blank">
                        https://crowdsale.karbon14.org
                      </a>
                      <a rel="noopener noreferrer" href="https://medium.com/@karbon14" target="_blank">
                        https://medium.com/@karbon14
                      </a>
                      <a rel="noopener noreferrer" href="https://github.com/karbon14" target="_blank">
                        https://github.com/karbon14
                      </a>
                    </div>
                  </div>

                  <div className="double">
                    <div className="info">
                      <div>
                        <h2>{network}</h2>
                      </div>
                      <p>{getTranslation('navMenu.network')}</p>
                    </div>

                    <div className="info">
                      <div>
                        <h2>{network ? scribes.length : ''}</h2>
                      </div>
                      <p>{getTranslation('navMenu.scribesNumber')}</p>
                    </div>
                  </div>

                  <div className="info">
                    <div>
                      <a rel="noopener noreferrer" target="_blank" href={`${getEtherscanScanURL()}/address/${address}`}>
                        {address}
                      </a>
                      <CopyToClipboard
                        text={ProofLife.address}
                        onCopy={() =>
                          toast.info(getTranslation('cryptoScribes.copiedAddress'), {
                            pauseOnFocusLoss: false,
                            position: toast.POSITION.BOTTOM_LEFT
                          })
                        }
                      >
                        <span className={ProofLife.address ? 'fa fa-clipboard' : ''} />
                      </CopyToClipboard>
                    </div>
                    <p>{getTranslation('navMenu.contractAddress')}</p>
                  </div>
                </section>
              </div>
            </Modal>
          ) : null}
        </div>
      )}
    />
  )
}

NavMenu.propTypes = {
  items: PropTypes.array,
  scribes: PropTypes.array,
  network: PropTypes.string,
  deployedContracts: PropTypes.object,
  getTranslation: PropTypes.func
}

export { NavMenu }
