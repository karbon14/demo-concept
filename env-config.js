const home = process.env.HOME_URL || 'https://karbon14.org'
const network = Number(process.env.NETWORK || 1)

module.exports = {
  'process.env.HOME_URL': home,
  'process.env.NETWORK': network
}
