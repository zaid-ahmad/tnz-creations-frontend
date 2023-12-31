/* eslint-disable react/prop-types */
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import RegisterComp from '../components/RegisterComp'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

function Register({ user, wishlist, cart }) {
  const [wishlistCount, setWishlistCount] = useState(wishlist.length)
  const [cartCount, setCartCount] = useState(cart.length)

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
      <RegisterComp />
      <Footer />
    </>
  )
}

export default Register
