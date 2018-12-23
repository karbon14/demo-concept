import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { ProofsList } from './ProofsList'
import { ProofDetails } from './ProofDetails'
import style from './style.scss'

const ProofsHistory = ({ proofLifeContract, query, web3, ipfs, getTranslation }) => {
  const { proofsCount, proofs, scribes } = proofLifeContract
  const requestLabel = getTranslation('proofsHistory.title')
  const requestAmount = proofsCount !== '' ? '(' + proofsCount + ')' : proofsCount

  return (
    <section className={style.ProofsHistory}>
      <div className="container">
        {query.proof ? (
          <Link href="history">
            <div className="breadcrumb">
              <h3>{`${requestLabel} >`}</h3>
              <h3>{getTranslation('proofsHistory.details')}</h3>
            </div>
          </Link>
        ) : (
          <h3>{`${requestLabel} ${requestLabel ? requestAmount : ''}`}</h3>
        )}

        <div className="card">
          {query.proof ? (
            <ProofDetails
              active={proofs[query.proof]}
              scribes={scribes}
              web3={web3}
              ipfs={ipfs}
              getTranslation={getTranslation}
            />
          ) : (
            <ProofsList
              proofs={proofs}
              labelIpfs={getTranslation('proofsHistory.ipfsPath')}
              labelHash={getTranslation('proofsHistory.validatedHash')}
            />
          )}
        </div>
      </div>
    </section>
  )
}

ProofsHistory.propTypes = {
  query: PropTypes.object,
  web3: PropTypes.object,
  ipfs: PropTypes.object,
  proofLifeContract: PropTypes.object,
  getTranslation: PropTypes.func
}

export { ProofsHistory }
