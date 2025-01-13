import React from 'react'
import { Link } from 'react-router-dom'

function MainLayout ({ children }) {
  return (
    <div>
      <div className='max-w-[950px] mx-auto bg-green-500  p-7 text-white'>
        <header >
            <div className='flex items-center justify-between'>
                <Link to="/">JsonApi</Link>
                <Link to="/scrolPagi">JsonApi</Link>
            </div>
        </header>
      </div>
      <main>{children}</main>
    </div>
  )
}

export default MainLayout
