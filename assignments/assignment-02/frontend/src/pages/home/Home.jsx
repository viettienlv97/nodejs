// import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import CityList from '../../components/city/CityList'
import TypeList from '../../components/type/TypeList'
import HotelList from '../../components/hotel/HotelList'
import Subscribe from '../../components/subcribe/Subscribe'
import Footer from '../../components/footer/Footer'

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <CityList />
        <TypeList />
        <HotelList />
        <Subscribe />
      </main>
      <Footer />
    </>
  )
}

export default Home
