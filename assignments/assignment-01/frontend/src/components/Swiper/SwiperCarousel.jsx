import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { miniImageUrl } from '../../services/apiService'
import 'swiper/css'
import { useContext } from 'react'
import MovieContext from '../../store/movie-context'

const SwiperCarousel = ({ slider, imgType, listId }) => {
  // sử dụng MovieContext
  const { movie, selectMovie } = useContext(MovieContext)
  const isPoster = imgType === 'poster_path' ? true : false
  const imgSize = {
    width: isPoster ? 170 : 250,
    height: isPoster ? 250 : 150
  }

  // hàm selectmovie để chọn phim lưu vào MovieContext
  const handleSelectMovie = (data) => {
    if (!movie || movie.id !== data.movie.id) selectMovie(data)
    else {
      selectMovie({ movie: null, listId: null })
    }
  }
  return (
    // sử dụng thư viện Swiper để render ra list phim có thể drag theo chiều ngang
    <Swiper
      className='mySwiper position-relative'
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      modules={[Autoplay]}
      breakpoints={{
        0: {
          slidesPerView: isPoster ? 2 : 1.5,
          spaceBetween: 10
        },
        576: {
          slidesPerView: isPoster ? 3 : 2,
          spaceBetween: 10
        },
        768: {
          slidesPerView: isPoster ? 4 : 3,
          spaceBetween: 10
        },
        1024: {
          slidesPerView: isPoster ? 6 : 4,
          spaceBetween: 10
        },
        1200: {
          slidesPerView: isPoster ? 10 : 7,
          spaceBetween: 10
        }
      }}
    >
      {slider.map((item) => {
        return (
          <SwiperSlide
            role='button'
            key={item.id}
            onClick={() => handleSelectMovie({ movie: item, listId })}
          >
            <img
              className='swiper-img'
              src={`${miniImageUrl}${
                imgType === 'poster_path'
                  ? item.poster_path
                  : item.backdrop_path
              }`}
              alt=''
              width={imgSize.width}
              height={imgSize.height}
              style={{ objectFit: 'cover' }}
            />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default SwiperCarousel
