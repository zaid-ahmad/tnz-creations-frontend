import React from 'react'
import { useState } from 'react'
import api from '../api'

/* eslint-disable react/prop-types */
const SelectColorModal = ({
  setShowModal,
  productColors,
  user,
  id,
  setCartCount,
  deleteFromWishlist,
  cartCount,
}) => {
  const [color, setColor] = useState('')

  const addToBag = (e) => {
    setColor(e.target.value)
    const selectedColor = e.target.value
    const post_data = {
      email: user.email,
      productId: id,
      quantity: 1,
      color: selectedColor,
    }

    api
      .post(
        'https://tnzcreationsinventory.up.railway.app/api/cart/add',
        post_data
      )
      .then((response) => {
        if (response.status === 200) {
          setCartCount(cartCount + 1)
          deleteFromWishlist(id)
          setShowModal(false)
        }
      })
      .catch((err) => {
        console.log(err)
        console.log(err.response.data)
      })
  }

  const closeModal = () => {
    setShowModal(false)
  }
  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-40'>
        <div className='bg-white p-6 rounded-lg'>
          <div className='flex items-start justify-between'>
            <h2 className='text-xl font-semibold mb-4'>
              Please choose a color before adding to cart
            </h2>
            <button
              type='button'
              onClick={closeModal}
              className=' text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-5 inline-flex justify-center items-center'
              data-modal-hide='defaultModal'
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
          </div>
          <div className='flex gap-2 justify-center'>
            {productColors &&
              productColors.map((color) => (
                <React.Fragment key={color.toLowerCase()}>
                  <input
                    type='radio'
                    name='color'
                    id={color.toLowerCase()}
                    value={color}
                    onChange={(e) => {
                      addToBag(e)
                    }}
                    className='hidden'
                  />
                  <label
                    htmlFor={color.toLowerCase()}
                    className='border border-gray-200 rounded-sm h-10 w-10 cursor-pointer shadow-sm block'
                    style={{ backgroundColor: `${color.toLowerCase()}` }}
                  ></label>
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
export default SelectColorModal
