import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { throttle } from 'lodash'

function ScrollPagination () {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const fetchData = async page => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
      )
      if (response.data.length > 0) {
        setData(prevData => [...prevData, ...response.data])
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleScroll = throttle(() => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1 &&
      !loading &&
      hasMore
    ) {
      setPage(prevPage => prevPage + 1)
    }
  }, 1000) // 1 soniya ichida bir marta bajariladi

  useEffect(() => {
    fetchData(page)
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading, hasMore])

  return (
    <div className='max-w-[950px] mx-auto mt-11'>
      <h1>Scroll Pagination</h1>
      <div>
        {data.map(item => (
          <div key={item.id} className='border-2 rounded-md shadow-md mb-7 p-4'>
            <img
              src='https://picsum.photos/536/354'
              alt={item.title}
              className='w-[50px] h-[50px] shadow-sm rounded-md'
            />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more data to load</p>}
    </div>
  )
}

export default ScrollPagination
