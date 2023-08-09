/* eslint-disable react/prop-types */
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import useWindowSize from 'react-use-window-size'
import Confetti from 'react-confetti'
import axios from 'axios'

function PaymentSuccess({ user, wishlist, cart }) {
  const [wishlistCount, setWishlistCount] = useState(wishlist.length)
  const [cartCount, setCartCount] = useState(cart.length)
  const searchQuery = useSearchParams()[0]
  const referenceNum = searchQuery.get('reference')
  const { width, height } = useWindowSize()
  const [isConfettiRunning, setIsConfettiRunning] = useState(true)
  const [timer, setTimer] = useState(10)
  const navigateTo = useNavigate()

  useEffect(() => {
    setWishlistCount(wishlist.length)
  }, [wishlist])

  useEffect(() => {
    setCartCount(cart.length)
  }, [cart])

  useEffect(() => {
    axios
      .post(
        `https://tnzcreationsinventory.up.railway.app/api/paymentSucess/${user.email}`
      )
      .then(console.log('yay'))
    const timeoutId = setTimeout(() => {
      setIsConfettiRunning(false)
      navigateTo('/shop')
    }, 10000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    // Decrease the timer every second
    const intervalId = setInterval(() => {
      setTimer((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0))
    }, 1000) // 1000 milliseconds = 1 second

    // Clear the interval when the component unmounts or when seconds reaches 0
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <>
      <Header user={user} wishlistCount={wishlistCount} cartCount={cartCount} />
      <Navbar user={user} />
      <div className='bg-white p-6  md:mx-auto '>
        {isConfettiRunning && <Confetti width={width - 17} height={height} />}

        <svg
          viewBox='0 0 24 24'
          className='text-green-600 w-16 h-16 mx-auto my-6'
        >
          <path
            fill='currentColor'
            d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
          ></path>
        </svg>
        <div className='text-center'>
          <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>
            Wohoo! Order Placed!!
          </h3>
          <p className='text-gray-600 my-2'>Thank you for shopping with us</p>
          <p> Reference number: {referenceNum} </p>
          <div className='py-10 text-center'>
            <a
              href='/account/orders'
              className='px-8 rounded bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3'
            >
              View Order Status &rarr;
            </a>
          </div>
          <p>Redirecting in {timer} seconds...</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PaymentSuccess
