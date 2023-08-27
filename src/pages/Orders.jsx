/* eslint-disable react/prop-types */
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import AllOrders from '../components/AllOrders'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'

function Orders({
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
      <div className='container  flex flex-col mt-7 items-start md:flex-row md:gap-5'>
        <div className='w-72  '>
          <Sidebar user={user} />
        </div>
        <div className='w-full pt-5 '>
          <h2 className='text-2xl font-medium mb-5'>Past Orders</h2>
          <AllOrders user={user} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Orders
