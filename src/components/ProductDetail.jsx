/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'

function ProductDetail({
  product,
  user,
  source,
  wishlistCount,
  setWishlistCount,
  deleteFromWishlist,
  cartCount,
  setCartCount,
}) {
  const [qty, setQty] = useState(1)
  const [color, setColor] = useState('')
  const [message, setMessage] = useState('')
  const [bigImage, setBigImage] = useState(source[0])
  const navigateTo = useNavigate()

  const increaseQty = () => {
    setQty(qty + 1)
  }
  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1)
  }

  const addToCart = (id) => {
    if (!user.expired) {
      if (color.length === 0) {
        setMessage('Please select a color before proceeding.')
      } else {
        setMessage('')
        const post_data = {
          email: user.email,
          productId: id,
          quantity: 1,
          color,
        }

        api
          .post('/api/cart/add', post_data)
          .then((response) => {
            if (response.status === 200) {
              setCartCount(cartCount + 1)
              deleteFromWishlist(id)
            }
          })
          .catch((err) => {
            console.log(err)
            console.log(err.response.data)
          })
      }
    } else {
      navigateTo('/login')
    }
  }

  const addToWishlist = (id) => {
    if (!user.expired) {
      const post_data = {
        email: user.email,
        productId: id,
      }

      api
        .post('/api/wishlist/add', post_data)
        .then((response) => {
          if (response.status === 200) {
            setMessage(response.data)
            setWishlistCount(wishlistCount + 1)
          }
        })
        .catch((err) => {
          setMessage(err.response.data)
        })
    } else {
      navigateTo('/login')
    }
  }

  useEffect(() => {
    setBigImage(source[0])
  }, [source])

  const smallImageClickHandler = (imageSource) => {
    setBigImage(imageSource)
  }

  return (
    <>
      <div className='container py-4 flex items-center gap-3'>
        <Link to='/' className='text-primary text-base'>
          <i className='fa fa-solid fa-house'></i>
        </Link>
        <span className='text-sm text-gray-400'>
          <i className='fa fa-solid fa-chevron-right'></i>
        </span>
        <Link to={'/shop'}>Shop</Link>
        <span className='text-sm text-gray-400'>
          <i className='fa fa-solid fa-chevron-right'></i>
        </span>
        <p className='text-gray-600 font-medium'>{product.name}</p>
      </div>

      <div className='container flex flex-col md:grid md:grid-cols-2 gap-6 h-screen'>
        <div>
          <img
            src={bigImage}
            alt='product'
            className='w-full aspect-square rounded-sm'
          />
          <div className='grid grid-cols-5 gap-4 mt-4'>
            {source.map((src) => {
              return (
                <img
                  key={src}
                  src={src}
                  alt='product2'
                  className='w-full aspect-square cursor-pointer rounded-sm'
                  loading='lazy'
                  onClick={() => smallImageClickHandler(src)}
                />
              )
            })}
          </div>
        </div>

        <div>
          <h2 className='text-3xl font-medium uppercase mb-2'>
            {product.name}
          </h2>
          <div className='space-y-2'>
            <p className='text-gray-800 font-semibold space-x-2'>
              <span>Availability: </span>
              {product.stock > 2 ? (
                <span className='text-green-600'>In Stock</span>
              ) : (
                <span className='text-red-600'>Out of Stock</span>
              )}
            </p>
            {product.category && (
              <p className='space-x-2'>
                <span className='text-gray-800 font-semibold'>Category: </span>
                <span className='text-gray-600'>{product.category.name}</span>
              </p>
            )}
          </div>
          <div className='flex items-baseline mb-1 space-x-2 font-roboto mt-4'>
            <p className='text-xl text-primary font-semibold'>
              ₹{product.price - (product.discount / 100) * product.price}
            </p>
            <p className='text-base text-gray-400 line-through'>
              ₹{product.price}
            </p>
          </div>

          <p className='mt-4 text-gray-600'>{product.description}</p>

          <div className='pt-4'>
            <h3 className='text-xl text-gray-800 mb-3 uppercase font-medium'>
              Color
            </h3>
            <div className='flex items-center gap-2'>
              <div className='flex gap-2 color-selector'>
                {product.colors &&
                  product.colors.map((color) => (
                    <React.Fragment key={color.toLowerCase()}>
                      <input
                        type='radio'
                        name='color'
                        id={color.toLowerCase()}
                        value={color}
                        onChange={(e) => {
                          setColor(e.target.value)
                        }}
                        className='hidden'
                      />
                      <label
                        htmlFor={color.toLowerCase()}
                        className='border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block'
                        style={{ backgroundColor: `${color.toLowerCase()}` }}
                      ></label>
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>

          <div className='mt-4'>
            <h3 className='text-sm text-gray-800 uppercase mb-1'>Quantity</h3>
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
          <p className='text-red-600 pt-6'>{message}</p>

          <div className='mt-2 flex gap-3 border-b border-gray-200 pb-5 pt-5'>
            <button
              onClick={() => addToCart(product._id)}
              className='bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition'
            >
              <i className='fa fa-solid fa-bag-shopping' /> Add to cart
            </button>
            <button
              onClick={() => addToWishlist(product._id)}
              className='border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition'
            >
              <i className='fa fa-solid fa-heart' /> Wishlist
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
