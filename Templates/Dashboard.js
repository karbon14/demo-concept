import React from 'react'
import PropTypes from 'prop-types'
import { NavMenu } from 'Components/NavMenu'
import { Header } from 'Components/Header'

export const Dashboard = ({
  children,
  routerNext,
  translations: { langs, selectedLanguage, registerTranslations, toggleSelected, getTranslation },
  signalHub: { messages },
  proofLifeContract: { scribes, isScribe, scribeData, accountsAddress, contractDataLoaded },
  network
}) => (
  <div>
    <Header
      langs={langs}
      toggleSelected={toggleSelected}
      selectedLanguage={selectedLanguage}
      registerTranslations={registerTranslations}
      isScribe={isScribe}
      scribeData={scribeData}
      accountsAddress={accountsAddress}
      contractDataLoaded={contractDataLoaded}
      network={network}
    />

    <div className="contentWrapper">
      <NavMenu
        items={
          contractDataLoaded
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
                  name: getTranslation('navMenu.pastProof'),
                  icon: require('/static/icons/calendar.svg'),
                  iconSelected: require('/static/icons/calendar_selected.svg'),
                  route: '/history',
                  selected: routerNext.currentRoute === '/history',
                  hidden: isScribe
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
  signalHub: PropTypes.object,
  proofLifeContract: PropTypes.object,
  routerNext: PropTypes.object,
  network: PropTypes.string
}
