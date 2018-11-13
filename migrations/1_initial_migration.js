const Migrations = artifacts.require('Migrations') // eslint-disable-line

module.exports = async function(deployer) {
  await deployer.deploy(Migrations)
}
