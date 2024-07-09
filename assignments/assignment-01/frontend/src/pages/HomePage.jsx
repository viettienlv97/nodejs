import Header from '../components/Header'
import MoviesList from '../components/UI/MoviesList'
import { REQUEST, API_URL } from '../services/apiService'
import MovieProvider from '../store/MovieProvider'

// khai báo list các danh mục phim
const movies_categories = [
  {
    id: 1,
    name: 'Original',
    imgType: 'poster_path',
    title: null,
    url: REQUEST.TRENDING_TV
  },
  {
    id: 2,
    name: 'Trending',
    imgType: 'backdrop_path',
    title: 'Trending',
    url: REQUEST.TRENDING
  },
  {
    id: 3,
    name: 'Rating',
    imgType: 'backdrop_path',
    title: 'Rating',
    url: REQUEST.TOP_RATE
  },
  {
    id: 4,
    name: 'Action',
    imgType: 'backdrop_path',
    title: 'Action',
    url: REQUEST.ACTION_MOVIES
  },
  {
    id: 5,
    name: 'Comedy',
    imgType: 'backdrop_path',
    title: 'Comedy',
    url: REQUEST.COMEDY_MOVIES
  },
  {
    id: 6,
    name: 'Horror',
    imgType: 'backdrop_path',
    title: 'Horror',
    url: REQUEST.HORROR_MOVIES
  },
  {
    id: 7,
    name: 'Romance',
    imgType: 'backdrop_path',
    title: 'Romance',
    url: REQUEST.ROMANCE_MOVIES
  },
  {
    id: 8,
    name: 'Documentary',
    imgType: 'backdrop_path',
    title: 'Documentary',
    url: REQUEST.DOCUMENTARY_MOVIES
  }
]

const HomePage = () => {
  return (
    <>
      {/* Header bao gồm Navbar và Banner */}
      <Header />
      {/* MovieProvider cho phép sử dụng MovieContext trong các component con */}
      <MovieProvider>
        <main className='pb-5'>
          {/* từ list các danh mục render ra các MoviesList */}
          {movies_categories.map((cate) => {
            return (
              <section
                key={cate.id}
                id={cate.name}
              >
                <MoviesList
                  imgType={cate.imgType}
                  title={cate.title}
                  url={`${API_URL}${cate.url}`}
                  id={cate.id}
                />
              </section>
            )
          })}
        </main>
      </MovieProvider>
    </>
  )
}

export default HomePage
