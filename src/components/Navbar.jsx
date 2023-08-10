/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function Navbar({ user }) {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get('/api/categories')
      .then((response) => {
        if (response.status === 200) {
          const responseData = response.data
          setCategories([...responseData])
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const handleCategoryClick = (categoryId) => {
    // Navigate to the Shop page with the selected category as a query parameter
    navigate(`/shop?categories=${categoryId}`)
  }

  if (!user.expired) {
    return (
      <>
        <nav className='bg-[#1D1D1D] '>
          <div className='container flex'>
            <div className='px-8 py-4 md:flex items-center cursor-pointer relative group hidden'>
              <span className='text-white'>
                <i className='fa-solid fa-bars'></i>
              </span>
              <span className='capitalize ml-2 text-white'>All Categories</span>

              {/* <!-- dropdown --> */}
              <div className='z-50 grid grid-cols-3 absolute w-[500px] left-0 top-full bg-white shadow-md py-3 opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible'>
                {categories.map((category) => (
                  <div
                    key={category._id}
                    onClick={() => handleCategoryClick(category.name)}
                    className='cursor-pointer flex items-center py-3 hover:bg-gray-100 transition self-center'
                  >
                    <span className='ml-6 capitalize text-gray-600 text-sm'>
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex items-center justify-center flex-grow md:pl-12 py-5 md:justify-between'>
              <div className='flex items-center space-x-6 capitalize'>
                <a
                  href='/'
                  className='text-gray-200 hover:text-white transition'
                >
                  Home
                </a>
                <a
                  href='/shop'
                  className='text-gray-200 hover:text-white transition'
                >
                  Shop
                </a>
                <a
                  href='#'
                  className='text-gray-200 hover:text-white transition'
                >
                  About us
                </a>
                <a
                  href='#'
                  className='text-gray-200 hover:text-white transition'
                >
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </nav>
      </>
    )
  } else {
    return (
      <>
        <nav className='bg-[#1D1D1D]'>
          <div className='container flex'>
            <div className='px-8 py-4 md:flex items-center cursor-pointer relative group hidden'>
              <span className='text-white'>
                <i className='fa-solid fa-bars'></i>
              </span>
              <span className='capitalize ml-2 text-white'>All Categories</span>

              {/* <!-- dropdown --> */}
              <div className='z-50 grid grid-cols-3 absolute w-[500px] left-0 top-full bg-white shadow-md py-3 opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible'>
                {categories.map((category) => (
                  <div
                    key={category._id}
                    onClick={() => handleCategoryClick(category.name)}
                    className='cursor-pointer flex items-center py-3 hover:bg-gray-100 transition self-center'
                  >
                    <span className='ml-6 capitalize text-gray-600 text-sm'>
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex items-center justify-center flex-grow md:pl-12 py-5 md:justify-between'>
              <div className='flex items-center space-x-6 capitalize'>
                <a
                  href='/'
                  className='text-gray-200 hover:text-white transition'
                >
                  Home
                </a>
                <a
                  href='/shop'
                  className='text-gray-200 hover:text-white transition'
                >
                  Shop
                </a>
                <a
                  href='#'
                  className='text-gray-200 hover:text-white transition'
                >
                  About us
                </a>
                <a
                  href='#'
                  className='text-gray-200 hover:text-white transition'
                >
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default Navbar
