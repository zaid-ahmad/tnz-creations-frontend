/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import SelectColorModal from './SelectColorModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faHeart } from '@fortawesome/free-solid-svg-icons'

function NewArrival({
  user,
  wishlistCount,
  cartCount,
  setWishlistCount,
  setCartCount,
  deleteFromWishlist,
}) {
  const [newArr, setNewArr] = useState([])
  const [source, setSource] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [productColors, setProductColors] = useState([])
  const [id, setId] = useState('')
  const navigateTo = useNavigate()

  useEffect(() => {
    api.get(`/api/filter?filterOption=latest`).then((response) => {
      if (response.status === 200) {
        const response_data = response.data
        const firstFourItems = response_data.slice(0, 4)
        setNewArr([...firstFourItems])
      }
    })
  }, [])

  useEffect(() => {
    // Fetch images for each product and update the state
    const fetchImages = async () => {
      const imageSources = await Promise.all(
        newArr.map((product) =>
          api
            .get(`/images/uploads/${product.images[0]}`, {
              responseType: 'arraybuffer',
            })
            .then((response) => {
              const base64 = btoa(
                new Uint8Array(response.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ''
                )
              )
              return 'data:;base64,' + base64
            })
        )
      )
      setSource(imageSources)
    }

    fetchImages()
  }, [newArr])

  const addToWishlist = (id) => {
    if (user.expired) {
      navigateTo('/login')
    } else {
      const post_data = {
        email: user.email,
        productId: id,
      }

      api
        .post('/api/wishlist/add', post_data)
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

  const addToBag = () => {
    if (user.expired) {
      navigateTo('/login')
    } else {
      if (!showModal) {
        setShowModal(true)
        setId(id)
        api.get(`/api/${id}/color`).then((response) => {
          setProductColors([...response.data])
        })
      }
    }
  }

  return (
    <>
      <div className='container pb-16'>
        <h2 className='text-2xl font-medium text-gray-800 uppercase mb-6'>
          top new arrival
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          {newArr.map((prod, index) => {
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
                <div
                  className='flex flex-col bg-white shadow rounded overflow-hidden group h-[500px]'
                  key={prod._id}
                >
                  <div className='relative flex justify-center'>
                    <img
                      src={source[index]}
                      alt='product 1'
                      className='w-auto h-[300px]'
                    />
                    <div
                      className='absolute inset-0 bg-black bg-opacity-40 flex items-center 
                        justify-center gap-2 opacity-0 group-hover:opacity-100 transition'
                    >
                      <a
                        href={`/products/${prod._id}`}
                        className='text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition'
                        title='view product'
                      >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </a>
                      <button
                        onClick={() => addToWishlist(prod._id)}
                        className='text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition'
                        title='add to wishlist'
                      >
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                    </div>
                  </div>
                  <div className='pt-4 pb-3 px-4'>
                    <a href='#'>
                      <h4 className='uppercase w-auto p-2 font-medium text-xl mb-2 text-gray-800 hover:text-primary transition'>
                        {prod.name.substring(0, 28) + '...'}
                      </h4>
                    </a>
                    <div className='flex items-baseline mb-1 space-x-2 space-y-5'>
                      <p className='text-xl text-primary font-semibold'>
                        ₹{prod.price - (prod.discount / 100) * prod.price}
                      </p>
                      <p className='text-sm text-gray-400 line-through'>
                        ₹{prod.price}
                      </p>
                      <p className='text-sm font-bold text-red-500'>
                        &#40;{prod.discount}% OFF&#41;
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={addToBag}
                    className='mt-auto block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition'
                  >
                    Add to cart
                  </button>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default NewArrival
