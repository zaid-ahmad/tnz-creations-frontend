/* eslint-disable react/prop-types */
import api from '../api'
import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function Drawer({ setProducts }) {
  const [categories, setCategories] = useState([])
  const [selectedCat, setSelectedCat] = useState([])
  const checkboxesRef = useRef({})
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const selectedCategory = searchParams.get('categories')

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

  useEffect(() => {
    // Update the selected category when the URL changes
    setSelectedCat(selectedCategory ? [selectedCategory] : [])
  }, [selectedCategory])

  const handleChecked = (e) => {
    const categoryValue = e.target.value
    const isChecked = e.target.checked

    setSelectedCat((prevSelectedCat) => {
      if (isChecked) {
        return [...prevSelectedCat, categoryValue]
      } else {
        return prevSelectedCat.filter((cat) => cat !== categoryValue)
      }
    })
  }

  const filterProducts = () => {
    const categoriesQueryParam = selectedCat.join(',')

    api
      .get(`/api/products?categories=${categoriesQueryParam}`)
      .then((response) => {
        const res_data = response.data

        console.log(res_data)

        setProducts([...res_data])
      })
  }

  const reset = () => {
    setSelectedCat([])
    Object.values(checkboxesRef.current).forEach((checkbox) => {
      checkbox.checked = false
    })
    api.get('/api/products').then((response) => {
      if (response.status === 200) {
        const response_data = response.data
        setProducts([...response_data])
      }
    })
  }

  return (
    <>
      <div
        id='drawer-example'
        className=' rounded-md h-auto p-4 overflow-y-auto w-full bg-white md:w-96 shadow-md'
        tabIndex='-1'
        aria-labelledby='drawer-label'
      >
        <div className='divide-y divide-gray-200 space-y-5'>
          <div>
            <h3 className='text-xl text-gray-800 mb-3 uppercase font-medium'>
              Categories
            </h3>
            <div className='space-y-2'>
              {categories.map((category) => {
                const inputId = `cat-${category._id}`
                return (
                  <React.Fragment key={category._id}>
                    <div className='flex items-center'>
                      <input
                        ref={(ref) =>
                          (checkboxesRef.current[category.name] = ref)
                        }
                        type='checkbox'
                        name={inputId}
                        id={inputId}
                        value={category.name}
                        checked={selectedCat.includes(category.name)}
                        onChange={(e) => handleChecked(e)}
                        className='text-primary focus:ring-0 rounded-sm cursor-pointer'
                      />
                      <label
                        htmlFor={inputId}
                        className='text-gray-600 ml-3 cursor-pointer'
                      >
                        {category.name}
                      </label>
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-7'>
          <button
            onClick={reset}
            className='px-4 py-2 text-sm flex items-center justify-center font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
          >
            Reset
          </button>
          <button
            onClick={filterProducts}
            className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          >
            Filter
            <svg
              className='w-4 h-4 ml-2'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default Drawer
