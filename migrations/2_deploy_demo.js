const ProofLife = artifacts.require('ProofLife') // eslint-disable-line

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(ProofLife)
}
