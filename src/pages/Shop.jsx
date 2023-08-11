/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Drawer from '../components/Drawer'
import Products from '../components/Products'
import Footer from '../components/Footer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import api from '../api'

function Shop({
  user,
  wishlist,
  cart,
  searchResult,
  setSearchResult,
  searchQuery,
  setSearchQuery,
}) {
  const [products, setProducts] = useState([])
  const [source, setSource] = useState([])
  const [wishlistCount, setWishlistCount] = useState(wishlist.length)
  const [cartCount, setCartCount] = useState(cart.length)

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const selectedCategory = searchParams.get('categories')

  useEffect(() => {
    // Fetch products based on the selected category
    const fetchProducts = async () => {
      if (selectedCategory) {
        try {
          const response = await api.get(
            `/api/products?categories=${selectedCategory}`
          )
          if (response.status === 200) {
            const responseData = response.data
            setProducts([...responseData])
          }
        } catch (error) {
          console.error(error.message)
        }
      } else {
        // Fetch all products if no category is selected
        try {
          const response = await api.get('/api/products')
          if (response.status === 200) {
            const responseData = response.data
            setProducts([...responseData])
          }
        } catch (error) {
          console.error(error.message)
        }
      }
    }

    fetchProducts()
  }, [selectedCategory])

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

      <div className='container py-4 flex items-center gap-3'>
        <Link to='/' className='text-primary text-base'>
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <span className='text-sm text-gray-400'>
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
        <Link to={'/shop'}>Shop</Link>
      </div>

      <div className='flex flex-col gap-3 pt-4 pb-16 items-start justify-items-center px-5 lg:flex-row'>
        <Drawer setProducts={setProducts} />
        <Products
          products={products}
          setProducts={setProducts}
          source={source}
          user={user}
          wishlistCount={wishlistCount}
          setWishlistCount={setWishlistCount}
          deleteFromWishlist={delete_from_wishlist}
          cartCount={cartCount}
          setCartCount={setCartCount}
        />
      </div>
      <Footer />
    </>
  )
}

export default Shop
