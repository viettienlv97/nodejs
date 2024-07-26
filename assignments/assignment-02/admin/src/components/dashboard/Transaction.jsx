import ContentWrapper from '../../layouts/ContentWrapper.jsx'
import TransactionTable from './TransactionTable.jsx'
const Transaction = ({ url }) => {
  return (
    <ContentWrapper>
      <h4 className='text-gray'>Lastest Transactions</h4>
      <TransactionTable url={url} />
    </ContentWrapper>
  )
}

export default Transaction
