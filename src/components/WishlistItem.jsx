/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { useState } from 'react'
import SelectColorModal from './SelectColorModal'

const WishlistItem = ({
  user,
  product,
  source,
  deleteFromWishlist,
  index,
  setCartCount,
  cartCount,
}) => {
  const navigateTo = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [productColors, setProductColors] = useState([])
  const [id, setId] = useState('')

  const addToCart = (id) => {
    if (user.expired) {
      navigateTo('/login')
    } else {
      if (!showModal) {
        setShowModal(true)
        setId(id)
        api
          .get(`https://tnzcreationsinventory.up.railway.app/api/${id}/color`)
          .then((response) => {
            setProductColors([...response.data])
          })
      }
    }
  }

  return (
    <div key={product.id}>
      {showModal && (
        <>
          <SelectColorModal
            setShowModal={setShowModal}
            productColors={productColors}
            setCartCount={setCartCount}
            deleteFromWishlist={deleteFromWishlist}
            cartCount={cartCount}
            id={id}
            user={user}
          />
        </>
      )}
      <div className='flex items-center justify-between border gap-6 p-4 border-gray-200 rounded'>
        <div className='w-28'>
          <img src={source[index]} alt='product 6' className='w-full' />
        </div>
        <div className='w-1/3'>
          <h2 className='text-gray-800 text-xl font-medium uppercase'>
            {product.name}
          </h2>
          <p className='text-gray-500 text-sm'>
            Availability:{' '}
            <span className='text-green-600'>
              {product.stock > 2 ? (
                <span className='text-green-600'>In Stock</span>
              ) : (
                <span className='text-red-600'>Out of Stock</span>
              )}
            </span>
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            <div className='text-primary text-lg font-semibold'>
              ₹{product.price - (product.discount / 100) * product.price}
            </div>
            <p className='text-sm text-gray-400 line-through'>
              ₹{product.price}
            </p>
          </div>
          <p className='text-sm font-semibold text-orange-500'>
            &#40;{product.discount}% OFF&#41;
          </p>
        </div>
        <button
          onClick={() => {
            addToCart(product._id)
          }}
          className='px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium'
        >
          Add to cart
        </button>
        <div
          className='text-gray-600 cursor-pointer hover:text-red-500 mr-7'
          onClick={() => {
            deleteFromWishlist(product._id)
          }}
        >
          <i className='fa-solid fa-trash'></i>
        </div>
      </div>
    </div>
  )
}

export default WishlistItem
