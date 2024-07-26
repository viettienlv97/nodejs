import React from 'react'
import InfoBoard from '../../components/dashboard/InfoBoard.jsx'
import Transaction from '../../components/dashboard/Transaction.jsx'
import { API_URL } from '../../contants.js'
const url = `${API_URL}/admin/transactions/latest`

const DashboardPage = () => {
  return (
    <div>
      <InfoBoard />
      <Transaction url={url} />
    </div>
  )
}

export default DashboardPage
