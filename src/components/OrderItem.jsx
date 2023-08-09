/* eslint-disable react/prop-types */
import { useState } from 'react'
import api from '../api'
import Loading from '../components/Loading'

const OrderItem = ({
  product,
  source,
  deleteFromOrder,
  index,
  user,
  updateProductQuantity,
}) => {
  const [qty, setQty] = useState(product.quantity)
  const [loaded, setLoaded] = useState(false)

  const handleLoad = () => {
    setLoaded(true)
  }

  const increaseQty = async () => {
    const updatedQty = qty + 1 // Calculate the updated quantity
    setQty(updatedQty) // Update the local state immediately
    updateProductQuantity(product.product._id, updatedQty)

    api.put(`/api/cart/${product.product._id}/update-quantity`, {
      quantity: updatedQty,
      email: user.email,
      color: product.color,
    })
  }

  const decreaseQty = async () => {
    if (qty > 1) {
      const updatedQty = qty - 1
      setQty(updatedQty)
      updateProductQuantity(product.product._id, updatedQty)
      api.put(`/api/cart/${product.product._id}/update-quantity`, {
        quantity: updatedQty,
        email: user.email,
        color: product.color,
      })
    }
  }

  return (
    <div key={product.product.id}>
      {!loaded && <Loading />}

      <div className='flex items-center justify-between border p-4 border-gray-200 rounded w-[650px]'>
        <div className='flex items-center gap-7 w-full'>
          <div className='w-36'>
            <img
              src={source[index]}
              alt='product 6'
              className='w-full'
              onLoad={handleLoad}
            />
          </div>
          <div className='w-full'>
            <h2 className='text-gray-800 text-xl font-medium uppercase'>
              {product.product.name}
            </h2>
            <div className='flex items-center gap-2'>
              <div className='text-primary text-lg font-semibold'>
                ₹
                {product.product.price -
                  (product.product.discount / 100) * product.product.price}
              </div>
              <p className='text-sm text-gray-400 line-through'>
                ₹{product.product.price}
              </p>
              <p className='text-sm font-semibold text-orange-500'>
                &#40;{product.product.discount}% OFF&#41;
              </p>
            </div>
            <p className='text-sm text-zinc-700 pt-1'>Color: {product.color}</p>
            <div className='mt-3'>
              <div className='flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max'>
                <div
                  className='h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none'
                  onClick={decreaseQty}
                >
                  -
                </div>
                <div className='h-8 w-8 text-base flex items-center justify-center'>
                  {qty}
                </div>
                <div
                  className='h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none'
                  onClick={increaseQty}
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className='text-gray-600 cursor-pointer hover:text-red-500 mr-7 '
          onClick={() => {
            deleteFromOrder(product.product._id)
          }}
        >
          <i className='fa-solid fa-xmark'></i>
        </div>
      </div>
    </div>
  )
}

export default OrderItem
