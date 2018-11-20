import navMenu from './Sections/navMenu.json'
import poofForm from './Sections/poofForm.json'
import proofsHistory from './Sections/proofsHistory.json'
import cryptoScribes from './Sections/cryptoScribes.json'
import proofRequest from './Sections/proofRequest.json'
import shared from '../Shared'

const translation = {
  navMenu,
  poofForm,
  proofsHistory,
  cryptoScribes,
  proofRequest,
  ...shared
}

const ES = { key: 'ES', translation }

export default ES
