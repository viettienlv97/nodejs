import React, { useState, useEffect, useCallback } from 'react'
import Navbar from '../components/Navbar'
import SearchForm from '../components/Search/SearchForm'
import SearchList from '../components/Search/SearchList'
import useFetchAPI from '../hooks/useFetchAPI'
import { API_URL, REQUEST, TOKEN } from '../services/apiService.js'

const SearchPage = () => {
  // khai báo state search để query
  const [search, setSearch] = useState({})
  // sử dụng useFetchAPI để call api lấy dữ liệu
  const { data, loading, fetchData } = useFetchAPI(
    `${API_URL}${REQUEST.SEARCH}`,
    {
      autoFetch: false,
      fetchOption: {
        method: 'POST',
        body: JSON.stringify({
          keyword: search.keyword,
          year: +search.year,
          languages: search.languages?.length
            ? search.languages.map((l) => l.value)
            : [],
          genres: search.genres?.length
            ? search.genres.map((g) => g.value)
            : [],
          mediaType: search.mediaType
        }),
        headers: {
          'Content-Type': 'application/json',
          Token: TOKEN
        }
      }
    }
  )

  // sử dụng useEffect để call api mỗi khi có search thay đổi
  useEffect(() => {
    if (search.keyword) {
      fetchData()
    }
  }, [search])

  const searchMovies = useCallback((search) => {
    setSearch(search)
  }, [])

  const list = data?.results

  return (
    <>
      <Navbar />
      <SearchForm searchMovies={searchMovies} />
      {!loading && list && list.length > 0 && <SearchList movies={list} />}
    </>
  )
}

export default SearchPage
