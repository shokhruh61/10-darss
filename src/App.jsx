import React from 'react'
import Pagination from '@mui/material/Pagination'
import JsonApi from './pages/JsonApi'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ScrolPagination from './pages/ScrolPagination'

function App () {
  return (
    <div>
      <Routes>
        {' '}
        <Route
          path='/'
          element={
            <MainLayout>
              <JsonApi />
            </MainLayout>
          }
        />
        <Route
          path='/scrolPagi'
          element={
            <MainLayout>
              <ScrolPagination />
            </MainLayout>
          }
        />
      </Routes>
    </div>
  )
}

export default App
