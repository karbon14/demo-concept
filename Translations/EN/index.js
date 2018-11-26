import navMenu from './Sections/navMenu.json'
import proofForm from './Sections/proofForm.json'
import proofsHistory from './Sections/proofsHistory.json'
import cryptoScribes from './Sections/cryptoScribes.json'
import proofRequest from './Sections/proofRequest.json'
import incomingProof from './Sections/incomingProof.json'
import shared from '../Shared'

const translation = {
  navMenu,
  proofForm,
  proofsHistory,
  cryptoScribes,
  proofRequest,
  incomingProof,
  ...shared
}

const EN = { key: 'EN', translation }

export default EN
