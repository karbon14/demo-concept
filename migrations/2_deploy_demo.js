var ProofLife = artifacts.require('ProofLife');

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(ProofLife);
}