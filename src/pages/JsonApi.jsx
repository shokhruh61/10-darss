import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'

function JsonApi () {
  const [comments, setComments] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=6`
      )
      .then(response => {
        if (response.status === 200) {
          setComments(response.data)
          const totalComments = response.headers['x-total-count']
          setPageCount(Math.ceil(totalComments / 6))
        }
      })
      .catch(error => {
        console.error(error)
      })
  }, [currentPage])

  function handleChangePage (e, p) {
    setCurrentPage(p)
  }

  function handleSelectChange (e) {
    const selectedPage = parseInt(e.target.value, 10)
    setCurrentPage(selectedPage)
  }

  return (
    <div className='max-w-[950px] flex flex-col mx-auto mt-10 gap-5'>
      
      <div className='flex flex-wrap justify-between gap-3'>
        {comments.length > 0 &&
          comments.map(comment => (
            <div
              key={comment.id}
              className='border p-9 rounded-md w-[30%] h-[250px]'
            >
              <h3 className='text-[#C7AE6A]'>{comment.id}</h3>
              <h3>{comment.name}</h3>
              <h3>{comment.email}</h3>
              <p>{comment.body}</p>
            </div>
          ))}
      </div>

      
      <div className='justify-between mt-5'>
        
        <div>
          <label htmlFor='page-select' className='mr-2 text-lg font-medium'>
            Sahifa tanlang:
          </label>
          <select
            id='page-select'
            value={currentPage}
            onChange={handleSelectChange}
            className='border rounded-md p-2 text-lg'
          >
            {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </div>

        <Pagination
          size='large'
          count={pageCount}
          onChange={handleChangePage}
          page={currentPage}
          variant='outlined'
          shape='rounded'
          boundaryCount={3}
        />
      </div>
    </div>
  )
}

export default JsonApi
