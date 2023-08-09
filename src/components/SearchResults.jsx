/* eslint-disable react/prop-types */
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SelectColorModal from './SelectColorModal'

/* eslint-disable no-unused-vars */
const SearchResults = ({
  user,
  searchResult,
  source,
  wishlistCount,
  setWishlistCount,
  setCartCount,
  cartCount,
  deleteFromWishlist,
}) => {
  const navigateTo = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [productColors, setProductColors] = useState([])
  const [id, setId] = useState('')
  const [imagesLoaded, setImagesLoaded] = useState(false)

  const handleImageLoad = () => {
    setImagesLoaded(true)
  }

  const addToWishlist = (id) => {
    if (user.expired) {
      navigateTo('/login')
    } else {
      const post_data = {
        email: user.email,
        productId: id,
      }

      axios
        .post(
          'https://tnzcreationsinventory.up.railway.app/api/wishlist/add',
          post_data
        )
        .then((response) => {
          if (response.status === 200) {
            setWishlistCount(wishlistCount + 1)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  const addToBag = (id) => {
    if (user.expired) {
      navigateTo('/login')
    } else {
      if (!showModal) {
        setShowModal(true)
        setId(id)
        axios
          .get(`https://tnzcreationsinventory.up.railway.app/api/${id}/color`)
          .then((response) => {
            setProductColors([...response.data])
          })
      }
    }
  }
  return (
    <>
      {searchResult.map((product, index) => {
        return (
          <>
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
            <div className='flex flex-col items-center bg-white shadow rounded overflow-hidden group w-96'>
              <Link
                to={`/products/${product._id}`}
                title='View Product'
                className='hover:bg-opacity-80'
              >
                <div className='relative'>
                  <img
                    src={source[index]}
                    alt='product image'
                    className='w-auto h-[350px]'
                    loading='lazy'
                    onLoad={handleImageLoad}
                  />
                  <div className='absolute inset-0 bg-black bg-opacity-20 transition opacity-0 group-hover:opacity-100'></div>
                </div>
                <div className='pt-4 pb-3 px-4'>
                  <a href='#'>
                    <h4 className='uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition'>
                      {product.name}
                    </h4>
                  </a>
                  <div className='flex items-baseline mb-1 space-x-2'>
                    <p className='text-xl text-primary font-semibold'>
                      ₹
                      {product.price - (product.discount / 100) * product.price}
                    </p>
                    <p className='text-sm text-gray-400 line-through'>
                      ₹{product.price}
                    </p>
                    <p className='text-sm font-semibold text-orange-500'>
                      &#40;{product.discount}% OFF&#41;
                    </p>
                  </div>
                </div>
              </Link>
              <div className='flex px-5 py-5 gap-3 w-full'>
                <button
                  onClick={() => addToBag(product._id)}
                  className='mt-auto block w-full py-1 text-center text-white bg-primary border border-primary rounded hover:bg-primaryDark hover:text-white transition'
                  title='Add to Cart'
                >
                  Add to cart
                </button>
                <button
                  onClick={() => addToWishlist(product._id)}
                  className='block rounded justify-center gap-2 w-full py-1 text-primary border-2 border-primary hover:bg-slate-100 transition'
                  title='Add to Wishlist'
                >
                  Wishlist
                </button>
              </div>
            </div>
          </>
        )
      })}
    </>
  )
}

export default SearchResults
