/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function NewArrival({ user }) {
  const [newArr, setNewArr] = useState([])
  const [source, setSource] = useState([])
  const navigateTo = useNavigate()

  useEffect(() => {
    api
      .get(
        `https://tnzcreationsinventory.up.railway.app/api/filter?filterOption=latest`
      )
      .then((response) => {
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
            .get(
              `https://tnzcreationsinventory.up.railway.app/images/uploads/${product.images[0]}`,
              {
                responseType: 'arraybuffer',
              }
            )
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

  const addToWishlist = () => {
    if (user.expired) {
      navigateTo('/login')
    } else {
      // add to wishlist database using api endpoint (/api/wishlist/add)
    }
  }

  const addToBag = () => {
    if (user.expired) {
      navigateTo('/login')
    } else {
      // add to wishlist database using api endpoint (/api/wishlist/add)
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
                      <i className='fa-solid fa-magnifying-glass'></i>
                    </a>
                    <button
                      onClick={() => addToWishlist(prod._id)}
                      className='text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition'
                      title='add to wishlist'
                    >
                      <i className='fa-solid fa-heart'></i>
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
            )
          })}
        </div>
      </div>
    </>
  )
}

export default NewArrival
