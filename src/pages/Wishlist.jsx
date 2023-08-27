/* eslint-disable react/prop-types */

import Header from '../components/Header'
import Navbar from '../components/Navbar'
import WishlistComp from '../components/WishlistComp'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

import EmptyWishlistImage from '../assets/empty-wishlist.svg'

function Wishlist({ user, wishlist, cart }) {
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

      {wishlistCount <= 0 ? (
        <>
          <div className='flex flex-col items-center my-10'>
            <img
              src={EmptyWishlistImage}
              alt='Empty wishlist image'
              className='w-96'
            />
            <div className='flex flex-col gap-2 items-center w-full'>
              <h2 className='text-2xl font-semibold text-zinc-600'>
                Your Wishlist is Empty
              </h2>
              <p className='text-md font-medium text-zinc-400 text-center'>
                Add items that you like to your wishlist. Review them anytime
                and easily move them to the bag.
              </p>
            </div>
            <a
              href='/shop'
              className='my-10 block w-52 py-2 text-center text-lg text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition font-roboto font-medium'
            >
              Continue shopping
            </a>
          </div>
          <Footer />
        </>
      ) : (
        <>
          <div className='flex flex-col items-start p-5 my-5 md:flex-row hi'>
            <div className='w-full'>
              <WishlistComp
                user={user}
                setWishlistCount={setWishlistCount}
                wishlistCount={wishlistCount}
                setCartCount={setCartCount}
                cartCount={cartCount}
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  )
}

export default Wishlist
