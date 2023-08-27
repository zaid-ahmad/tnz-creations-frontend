/* eslint-disable react/prop-types */
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Features from '../components/Features'
import Categories from '../components/Categories'
import NewArrival from '../components/NewArrival'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import api from '../api'

function Home({
  user,
  wishlist,
  cart,
  searchResult,
  setSearchResult,
  searchQuery,
  setSearchQuery,
}) {
  const [wishlistCount, setWishlistCount] = useState(wishlist.length)
  const [cartCount, setCartCount] = useState(cart.length)

  useEffect(() => {
    window.scrollTo(0, 0) // Scroll to the top when route changes
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
      <Banner />
      <Features />
      <Categories />
      <NewArrival
        user={user}
        wishlistCount={wishlistCount}
        cartCount={cartCount}
        setWishlistCount={setWishlistCount}
        setCartCount={setCartCount}
        deleteFromWishlist={delete_from_wishlist}
      />
      <Footer />
    </>
  )
}

export default Home
