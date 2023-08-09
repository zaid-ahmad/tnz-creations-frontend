/* eslint-disable react/prop-types */
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import AccountComp from '../components/AccountComp'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Account({
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
  const navigateTo = useNavigate()

  useEffect(() => {
    setWishlistCount(wishlist.length)
  }, [wishlist])

  useEffect(() => {
    setCartCount(cart.length)
  }, [cart])

  useEffect(() => {
    if (!user.email) {
      navigateTo('/login')
    }
  })

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
      <div className='container grid grid-cols-100 mt-7 justify-items-start'>
        <div className='w-72  '>
          <Sidebar user={user} />
        </div>
        <div className='w-[850px] justify-self-start '>
          <h2 className='text-2xl font-medium mb-5'>Your Addresses</h2>
          <AccountComp user={user} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Account
