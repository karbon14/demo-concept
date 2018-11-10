import navMenu from './Sections/navMenu.json'
import poofForm from './Sections/poofForm.json'
import proofsHistory from './Sections/proofsHistory.json'
import cryptoScribes from './Sections/cryptoScribes.json'
import messagesArea from './Sections/messagesArea.json'
import shared from '../Shared'

const translation = {
  navMenu,
  poofForm,
  proofsHistory,
  cryptoScribes,
  messagesArea,
  ...shared
}

const EN = { key: 'EN', translation }

export default EN
