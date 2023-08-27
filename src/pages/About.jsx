/* eslint-disable react/prop-types */
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import AboutComp from '../components/AboutComp'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

function About({ user, wishlist, cart }) {
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

  return (
    <>
      <Header user={user} wishlistCount={wishlistCount} cartCount={cartCount} />
      <Navbar user={user} />
      <AboutComp />
      <Footer />
    </>
  )
}

export default About
