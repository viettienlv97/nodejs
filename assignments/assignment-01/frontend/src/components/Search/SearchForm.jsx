import React, { useRef, memo, useState } from 'react'
import { Search } from 'react-feather'
import { MultiSelect } from 'react-multi-select-component'
import useFetchAPI from '../../hooks/useFetchAPI.js'
import { REQUEST, API_URL } from '../../services/apiService.js'

const SearchForm = memo(({ searchMovies }) => {
  const [genres, setGenres] = useState([])
  const [languages, setLanguages] = useState([])
  const { data: options } = useFetchAPI(`${API_URL}${REQUEST.GENRES}`, {
    autoFetch: true,
    initialData: []
  })
  const genreOptions = options?.data
    ? options.data.map((genre) => ({ label: genre.name, value: genre.id }))
    : []

  const form = useRef()
  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    const { search, year, mediaType } = Object.fromEntries(fd.entries())
    searchMovies({ keyword: search, year, languages, genres, mediaType })
    resetForm()
  }

  const resetForm = () => {
    form?.current.reset()
    setGenres([])
    setLanguages([])
  }

  return (
    <section id='search-form'>
      <div className='container-fluid'>
        <div className='row text-center justify-content-center'>
          <div className='col-lg-8 col-md-8 col-12 col-sm-10 col-xl-6 col-xxl-5'>
            <div className='d-flex mt-5'>
              <form
                ref={form}
                className='w-100 bg-light'
                onSubmit={handleSubmit}
              >
                <div
                  className='position-relative border-bottom border-info form-group'
                  style={{ height: '50px' }}
                >
                  <input
                    type='text'
                    name='search'
                    className='form-control w-100 border-0 h-100 ps-4 fs-5'
                    required
                  />
                  <Search
                    className='position-absolute border-none bg-transparent'
                    style={{ right: '10px', top: '5px' }}
                    size={36}
                    color='gray'
                  />
                </div>
                <div>
                  <div className='mt-3 ms-3 text-start'>
                    <h6>Advanced search</h6>
                    <div className='row'>
                      <div className='col-6 mb-3'>
                        <label className='mb-2'>Genres</label>
                        <MultiSelect
                          className='w-50'
                          options={genreOptions}
                          value={genres}
                          onChange={setGenres}
                          labelledBy='Select'
                          hasSelectAll={false}
                        />
                      </div>
                      <div className='col-6 mb-3'>
                        <label
                          htmlFor='search-lang'
                          className='mb-2'
                        >
                          Language
                        </label>
                        <MultiSelect
                          className='w-50'
                          options={[
                            {
                              label: 'English',
                              value: 'en'
                            },
                            {
                              label: 'Japanese',
                              value: 'js'
                            },
                            {
                              label: 'Korean',
                              value: 'ko'
                            }
                          ]}
                          value={languages}
                          onChange={setLanguages}
                          labelledBy='Select'
                          hasSelectAll={false}
                        />
                      </div>
                      <div className='col-6 mb-3'>
                        <label
                          htmlFor='media-type'
                          className='mb-2'
                        >
                          Media Type
                        </label>
                        <select
                          name='mediaType'
                          id='media-type'
                          className='w-50 form-control'
                          defaultValue={'all'}
                        >
                          <option value='all'>All</option>
                          <option value='tv'>TvShow</option>
                          <option value='movie'>Movie</option>
                          <option value='person'>Person</option>
                        </select>
                      </div>
                      <div className='col-6 mb-3'>
                        <label
                          htmlFor='search-year'
                          className='mb-2'
                        >
                          Year
                        </label>
                        <input
                          type='number'
                          min={1950}
                          max={new Date().getFullYear()}
                          step={1}
                          placeholder='YYYY'
                          className='text-center ms-0 py-1 form-control w-50'
                          id='search-year'
                          name='year'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='d-flex justify-content-end my-5 me-5'>
                    <button
                      className='bg-light border-0 px-4 py-2 text-dark fw-bold'
                      type='button'
                      onClick={resetForm}
                    >
                      RESET
                    </button>
                    <button className='bg-info text-light border-0 px-4 py-2 fw-bold'>
                      SEARCH
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

export default SearchForm
