/* eslint-disable react/prop-types */
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import ContactComp from '../components/ContactComp'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

function Contact({ user, wishlist, cart }) {
  const [wishlistCount, setWishlistCount] = useState(wishlist.length)
  const [cartCount, setCartCount] = useState(cart.length)

  useEffect(() => {
    setWishlistCount(wishlist.length)
  }, [wishlist])

  useEffect(() => {
    setCartCount(cart.length)
  }, [cart])

  useEffect(() => {
    window.scrollTo(0, 0) // Scroll to the top when route changes
  }, [])

  return (
    <>
      <Header user={user} wishlistCount={wishlistCount} cartCount={cartCount} />
      <Navbar user={user} />
      <ContactComp />
      <Footer />
    </>
  )
}

export default Contact
