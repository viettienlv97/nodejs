import SearchPopup from '../../components/search/SearchPopup'
import SearchList from '../../components/search/SearchList'
import Footer from '../../components/footer/Footer'
import Subscribe from '../../components/subcribe/Subscribe'

const Search = () => {
  return (
    <>
      <main>
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-4'>
              <SearchPopup />
            </div>
            <div className='col-8'>
              <SearchList />
            </div>
          </div>
        </div>
      </main>
      <Subscribe />
      <Footer />
    </>
  )
}

export default Search
