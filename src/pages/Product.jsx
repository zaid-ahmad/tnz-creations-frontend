/* eslint-disable react/prop-types */

import Header from '../components/Header'
import Navbar from '../components/Navbar'
import ProductDetail from '../components/ProductDetail'
// import RelatedProducts from '../components/RelatedProducts'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api'
import NewArrival from '../components/NewArrival'
import Description from '../components/Description'

function Product({
  user,
  wishlist,
  cart,
  searchResult,
  setSearchResult,
  searchQuery,
  setSearchQuery,
}) {
  const [product, setProduct] = useState({})
  const [source, setSource] = useState([])
  const [wishlistCount, setWishlistCount] = useState(wishlist.length)
  const [cartCount, setCartCount] = useState(cart.length)
  const { id } = useParams()

  useEffect(() => {
    api.get(`/api/products/${id}`).then((res) => {
      const res_data = res.data

      setProduct(res_data)
    })
  }, [])

  useEffect(() => {
    setWishlistCount(wishlist.length)
  }, [wishlist])

  useEffect(() => {
    setCartCount(cart.length)
  }, [cart])

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
          setWishlistCount(wishlistCount - 1)
        }
      })
  }

  useEffect(() => {
    // Fetch images for each product and update the state
    const fetchImages = async () => {
      const imageSources = await Promise.all(
        product.images.map((image) =>
          api
            .get(`/images/uploads/${image}`, {
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
  }, [product.images])

  return (
    <>
      <Header
        user={user}
        wishlistCount={wishlistCount}
        cartCount={cartCount}
        setSearchResult={setSearchResult}
        searchResult={searchResult}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Navbar user={user} />
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-16 sm:gap-[35rem]'>
          <div>
            <ProductDetail
              product={product}
              user={user}
              source={source}
              deleteFromWishlist={delete_from_wishlist}
              wishlistCount={wishlistCount}
              setWishlistCount={setWishlistCount}
              cartCount={cartCount}
              setCartCount={setCartCount}
            />
          </div>
          <div>
            <Description product={product} />
          </div>
        </div>
        <div>
          <NewArrival />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Product

// components:
/*
1. ProductDetail
2. Description
3. Related Product
*/
