import Transaction from '../../components/transaction/Transaction.jsx'
import Subscribe from '../../components/subcribe/Subscribe.jsx'
import Footer from '../../components/footer/Footer.jsx'

const TransactionsPage = () => {
  return (
    <>
      <main>
        <section
          id='transactions'
          style={{ minHeight: '40vh' }}
        >
          <div className='container'>
            <Transaction />
          </div>
        </section>
      </main>
      <Subscribe />
      <Footer />
    </>
  )
}

export default TransactionsPage
