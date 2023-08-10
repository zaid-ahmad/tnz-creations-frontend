/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import api from '../api'
import WishlistItem from './WishlistItem'

function WishlistComp({
  user,
  setWishlistCount,
  wishlistCount,
  setCartCount,
  cartCount,
}) {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')
  const [source, setSource] = useState([])

  useEffect(() => {
    api
      .get(`/api/wishlist-products?email=${user.email}`)
      .then((response) => {
        if (response.status === 200) {
          setProducts([...response.data])
        }
      })
      .catch((err) => {
        setMessage(err.response.data)
      })
  }, [])

  useEffect(() => {
    // Fetch images for each product and update the state
    const fetchImages = async () => {
      const imageSources = await Promise.all(
        products.map((product) =>
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
  }, [products])

  const delete_from_wishlist = (id) => {
    const data_to_post = {
      email: user.email,
      itemId: id,
    }

    api
      .delete('/api/wishlist/remove', {
        data: data_to_post,
      })
      .then((response) => {
        if (response.status === 200) {
          // Remove the deleted item from the products state
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== id)
          )
          setWishlistCount(wishlistCount - 1)
        }
      })
  }

  return (
    <>
      <h2 className='font-medium text-2xl mb-5'>Your Wishlist</h2>
      <div className='w-full md:grid md:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map((product, index) => (
          <WishlistItem
            key={product.id}
            product={product}
            source={source}
            deleteFromWishlist={delete_from_wishlist}
            index={index}
            user={user}
            setCartCount={setCartCount}
            cartCount={cartCount}
          />
        ))}
      </div>
    </>
  )
}

export default WishlistComp
