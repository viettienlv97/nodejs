import Transaction from '../../components/dashboard/Transaction.jsx'
import { API_URL } from '../../contants.js'
const url = `${API_URL}/admin/transactions/`
const TransactionPage = () => {
  return <Transaction url={url} />
}

export default TransactionPage
