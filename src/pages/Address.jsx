/* eslint-disable react/prop-types */
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import AddressForm from '../components/AddressForm'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

function Address({
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
    setWishlistCount(wishlist.length)
  }, [wishlist])

  useEffect(() => {
    setCartCount(cart.length)
  }, [cart])

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
      <div className='container grid grid-cols-100 mt-7 justify-items-start mb-12'>
        <div className='w-72  '>
          <Sidebar user={user} action={'address'} />
        </div>
        <div className='w-[850px] justify-self-start '>
          <AddressForm user={user} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Address
