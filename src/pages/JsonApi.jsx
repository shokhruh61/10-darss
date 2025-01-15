import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination'

function JsonApi() {
  const [comments, setComments] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=6`
        )
        if (response.status === 200) {
          setComments(response.data)
          const totalComments = response.headers['x-total-count']
          setPageCount(Math.ceil(totalComments / 6))
        }
      } catch (err) {
        console.error(err)
        setError('Maʼlumotlarni yuklashda xatolik yuz berdi.')
      } finally {
        setLoading(false)
      }
    }
    fetchComments()
  }, [currentPage])

  const handleChangePage = (e, page) => {
    setCurrentPage(page)
  }

  const handleSelectChange = (e) => {
    const selectedPage = parseInt(e.target.value, 10)
    setCurrentPage(selectedPage)
  }

  return (
    <div className='max-w-[950px] flex flex-col mx-auto mt-10 gap-5'>
      {loading ? (
        <p className='text-center text-lg'>Yuklanmoqda...</p>
      ) : (
        <div className='flex flex-wrap justify-between gap-3'>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className='border p-4 rounded-md w-[30%] h-[250px] overflow-hidden'
              >
                <h3 className='text-[#C7AE6A] font-bold'>{comment.id}</h3>
                <h4 className='font-semibold truncate'>{comment.name}</h4>
                <h5 className='text-sm text-gray-500'>{comment.email}</h5>
                <p className='text-sm mt-2 text-gray-700'>{comment.body}</p>
              </div>
            ))
          ) : (
            <p className='text-center text-lg'>Maʼlumotlar topilmadi.</p>
          )}
        </div>
      )}

     
      <div className='flex justify-between items-center mt-5'>
        <div>
          <label className='mr-2 text-lg font-medium'>Sahifa tanlang:</label>
          <select
            id='page-select'
            value={currentPage}
            onChange={handleSelectChange}
            className='border rounded-md p-2 text-lg'
          >
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
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
          className='ml-auto'
        />
      </div>
    </div>
  )
}

export default JsonApi
