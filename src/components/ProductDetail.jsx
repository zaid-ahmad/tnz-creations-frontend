/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  faHouse,
  faChevronRight,
  faBagShopping,
} from '@fortawesome/free-solid-svg-icons'

import { faHeart } from '@fortawesome/free-regular-svg-icons'

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
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <span className='text-sm text-gray-400'>
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
        <Link to={'/shop'}>Shop</Link>
        <span className='text-sm text-gray-400'>
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
        <p className='text-gray-600 font-medium'>{product.name}</p>
      </div>

      <div className='container flex flex-col md:grid md:grid-cols-2 gap-6 '>
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
            <p className='text-2xl text-primary font-semibold'>
              ₹
              {Math.ceil(
                Number(product.price - (product.discount / 100) * product.price)
              )}
            </p>
            <p className=' text-gray-400 line-through'>MRP ₹{product.price}</p>
          </div>

          <p className='mt-4 text-gray-800 font-semibold hidden md:block'>
            <span>Description: </span>
            {product.description && (
              <>
                <p className='font-light text-gray-600'>
                  {product.description.length > 310
                    ? product.description.slice(0, 310) + '...'
                    : product.description}
                </p>
              </>
            )}
          </p>
          <div className='flex flex-col'>
            <div className='pt-4'>
              <span className='text-gray-800 font-semibold'>Color:</span>
              <div className='flex items-center gap-2 mt-2'>
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
                          className='border border-gray-200 rounded h-6 w-6 cursor-pointer shadow-sm block'
                          style={{ backgroundColor: `${color.toLowerCase()}` }}
                        ></label>
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </div>
            <div className='mt-4'>
              <span className='text-gray-800 font-semibold'>Quantity:</span>
              <div className='flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max mt-2'>
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
          <p className='text-red-600 pt-6'>{message}</p>

          <div className='mt-2 flex md:flex-row flex-col items-center gap-3 border-b border-gray-200 pb-5 pt-5'>
            <div className='flex items-center justify-center gap-3 w-full h-14 bg-primary border border-primary px-8 py-2 rounded text-white hover:text-primary transition hover:bg-transparent'>
              <FontAwesomeIcon icon={faBagShopping} />
              <button
                onClick={() => addToCart(product._id)}
                className='font-medium uppercase'
              >
                Add to cart
              </button>
            </div>
            <div className='flex items-center justify-center gap-3 w-full h-14 border border-gray-300 text-gray-600 px-8 py-2 rounded  hover:text-primary transition'>
              <FontAwesomeIcon icon={faHeart} />
              <button
                onClick={() => addToWishlist(product._id)}
                className='font-medium uppercase'
              >
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
