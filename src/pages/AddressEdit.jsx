/* eslint-disable react/prop-types */

import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import AEForm from '../components/AEForm'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'

function AddressEdit({
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
  const { email, address } = useParams()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const addressParam = queryParams.get('address')

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
      <div className='container grid grid-cols-100 mt-7 justify-items-start'>
        <div className='w-72  '>
          <Sidebar user={user} />
        </div>
        <div className='w-[850px] justify-self-start '>
          <h2 className='text-2xl font-medium mb-5'>Change your address</h2>
          <AEForm user={user} email={email} addressParam={addressParam} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AddressEdit
