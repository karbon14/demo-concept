import React from 'react'
import PropTypes from 'prop-types'
import { NavMenu } from 'Components/NavMenu'
import { Header } from 'Components/Header'

export const Dashboard = ({
  children,
  routerNext,
  translations: { langs, selectedLanguage, registerTranslations, toggleSelected, getTranslation },
  signalHub: { messages },
  proofLifeContract: { scribes, isScribe, contractDataLoaded }
}) => (
  <div>
    <Header
      langs={langs}
      toggleSelected={toggleSelected}
      selectedLanguage={selectedLanguage}
      registerTranslations={registerTranslations}
    />

    <div className="contentWrapper">
      <NavMenu
        items={
          contractDataLoaded
            ? [
                {
                  name: getTranslation('navMenu.newProof'),
                  icon: require('/static/icons/plus.svg'),
                  route: '/',
                  selected: routerNext.currentRoute === '/',
                  hidden: isScribe
                },
                {
                  name: getTranslation('navMenu.pastProof'),
                  icon: require('/static/icons/calendar.svg'),
                  route: '/history',
                  selected: routerNext.currentRoute === '/history',
                  hidden: isScribe
                },
                {
                  name: `${getTranslation('navMenu.scribes')} (${scribes.length})`,
                  icon: require('/static/icons/explore.svg'),
                  route: '/scribes',
                  selected: routerNext.currentRoute === '/scribes',
                  hidden: isScribe
                },
                {
                  name: `${getTranslation('navMenu.proofRequest')} (${messages.length})`,
                  icon: require('/static/icons/pending.svg'),
                  route: '/proof-request',
                  selected: routerNext.currentRoute.indexOf('proof-request') !== -1,
                  hidden: !isScribe
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
  routerNext: PropTypes.object
}
