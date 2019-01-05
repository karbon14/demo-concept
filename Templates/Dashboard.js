import React from 'react'
import PropTypes from 'prop-types'
import { NavMenu } from 'Components/NavMenu'
import { Header } from 'Components/Header'

export const Dashboard = ({
  children,
  routerNext,
  translations: { langs, selectedLanguage, registerTranslations, toggleSelected, getTranslation },
  socketIO: { messages },
  proofLifeContract: {
    scribes,
    isScribe,
    scribeData,
    accountAddress,
    contractDataLoaded,
    proofsCount,
    deployedContracts
  },
  network,
  web3,
  updateUI
}) => (
  <div>
    <Header
      langs={langs}
      toggleSelected={toggleSelected}
      selectedLanguage={selectedLanguage}
      registerTranslations={registerTranslations}
      isScribe={isScribe}
      scribeData={scribeData}
      accountAddress={accountAddress}
      contractDataLoaded={contractDataLoaded}
      network={network}
    />

    <div className="contentWrapper">
      <NavMenu
        network={network}
        scribes={scribes}
        deployedContracts={contractDataLoaded ? deployedContracts : {}}
        getTranslation={getTranslation}
        web3={web3}
        accountAddress={accountAddress}
        isScribe={isScribe}
        updateUI={updateUI}
        items={
          contractDataLoaded && routerNext?.currentRoute?.indexOf
            ? [
                {
                  name: getTranslation('navMenu.newProof'),
                  icon: require('/static/icons/plus.svg'),
                  iconSelected: require('/static/icons/plus_selected.svg'),
                  route: '/',
                  selected: routerNext.currentRoute === '/',
                  hidden: isScribe
                },
                {
                  name: `${getTranslation('navMenu.incomingProof')} (${messages.length})`,
                  icon: require('/static/icons/incoming.svg'),
                  iconSelected: require('/static/icons/incoming_selected.svg'),
                  route: '/incoming-proof',
                  selected: routerNext.currentRoute.indexOf('incoming-proof') !== -1,
                  hidden: isScribe,
                  notifications: messages.length
                },
                {
                  name: `${getTranslation('navMenu.pastProof')} ${
                    proofsCount !== '' ? '(' + proofsCount + ')' : proofsCount
                  }`,
                  icon: require('/static/icons/calendar.svg'),
                  iconSelected: require('/static/icons/calendar_selected.svg'),
                  route: '/history',
                  selected: routerNext.currentRoute.indexOf('history') !== -1,
                  hidden: isScribe,
                  notifications: proofsCount
                },
                {
                  name: `${getTranslation('navMenu.scribes')} (${scribes.length})`,
                  icon: require('/static/icons/explore.svg'),
                  iconSelected: require('/static/icons/explore_selected.svg'),
                  route: '/scribes',
                  selected: routerNext.currentRoute === '/scribes',
                  hidden: isScribe,
                  notifications: scribes.length
                },
                {
                  name: `${getTranslation('navMenu.proofRequest')} (${messages.length})`,
                  icon: require('/static/icons/pending.svg'),
                  iconSelected: require('/static/icons/pending_selected.svg'),
                  route: '/proof-request',
                  selected: routerNext.currentRoute.indexOf('proof-request') !== -1,
                  hidden: !isScribe,
                  notifications: messages.length
                }
              ]
            : []
        }
      />

      {children}
    </div>
  </div>
)

Dashboard.propTypes = {
  children: PropTypes.node,
  translations: PropTypes.object,
  socketIO: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object,
  network: PropTypes.string,
  web3: PropTypes.object,
  updateUI: PropTypes.func
}
