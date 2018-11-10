/* eslint-disable no-undef */
const ProofLife = artifacts.require('ProofLife')
const assert = require('assert')

contract('ProofLife', ([owner, scribe, anotherScribe]) => {
  it('should set and get the scribe', async () => {
    const instance = await ProofLife.deployed()
    const address = scribe
    const firstName = 'Team'
    const lastName = 'Karbon14'

    await instance.setScribe(address, firstName, lastName, { from: owner })

    const actual = [firstName, lastName]
    const expected = await instance.getScribe(address)

    assert.deepEqual(actual, expected)
  })

  it('should get all scribes', async () => {
    const instance = await ProofLife.deployed()
    const address = anotherScribe
    const firstName = 'Team'
    const lastName = 'Karbon14'

    await instance.setScribe(address, firstName, lastName, { from: owner })

    const actual = [scribe, anotherScribe]
    const expected = await instance.getScribes()

    assert.deepEqual(actual, expected)
  })

  it('should create and get 1 proof', async () => {
    const instance = await ProofLife.deployed()
    const ipfsHash = 'ipfsHash'
    const hashProof = 'hashProof'

    await instance.setProof(ipfsHash, hashProof, { from: owner })
    const index = await instance.getCountProof({ from: owner })

    const actual = await instance.getProof(parseInt(index - 1))
    const expected = [ipfsHash, hashProof]

    assert.deepEqual(actual, expected)
  })

  it('should create and get 2 proofs', async () => {
    const instance = await ProofLife.deployed()

    const ipfsHash = 'ipfsHash'
    const hashProof = 'hashProof'

    const ipfsHash2 = 'ipfsHash2'
    const hashProof2 = 'hashProof2'

    await instance.setProof(ipfsHash2, hashProof2, { from: owner })

    const actual1 = await instance.getProof(0)
    const expected1 = [ipfsHash, hashProof]

    assert.deepEqual(actual1, expected1)

    const actual2 = await instance.getProof(1)
    const expected2 = [ipfsHash2, hashProof2]

    assert.deepEqual(actual2, expected2)
  })

  it('should return 2 owner and 0 scribes proofs', async () => {
    const instance = await ProofLife.deployed()

    const ownerCount = await instance.getCountProof({ from: owner })
    assert.deepEqual(parseInt(ownerCount), 2)

    const scribeCount = await instance.getCountProof({ from: scribe })
    assert.deepEqual(parseInt(scribeCount), 0)
  })
})
/* eslint-enable no-undef */
