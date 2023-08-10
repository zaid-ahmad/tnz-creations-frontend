/* eslint-disable react/prop-types */
import EmailIc from '../assets/email.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../api'
import { useState, useEffect } from 'react'

function EmailVerificationComp() {
  const [isClickable, setIsClickable] = useState(false)
  const [timer, setTimer] = useState(5 * 60)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const email = searchParams.get('user')
  const navigateTo = useNavigate()

  const [OTP, setOTP] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let interval
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else {
      setIsClickable(true)
    }

    return () => {
      clearInterval(interval)
    }
  }, [timer])

  const handleResendOTP = () => {
    if (isClickable) {
      api.post(`/api/generate-otp/${email}`).then((res) => {
        if (res.status == 200) {
          alert('OTP Sent Again')
        }
      })
      setIsClickable(false)
      setTimer(5 * 60)
    }
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email,
      OTP,
    }
    api
      .post(`/api/verify-otp`, data)
      .then((response) => {
        if (response.status === 200) {
          navigateTo(`/`)
          window.location.reload()
        }
      })
      .catch((error) => {
        setError(error.response.data)
      })
  }

  return (
    <>
      <div className='contain py-16'>
        <div className='max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden'>
          <h2 className='text-2xl capitalize text-center font-medium mb-1'>
            Confirm Your Email Address
          </h2>
          <div className='flex justify-center py-6'>
            <img src={EmailIc} alt='Email Confirm Image' className='w-40' />
          </div>
          <p className='text-gray-600 mb-6 text-sm text-center'>
            OTP sent to {email}
          </p>
          <form method='POST'>
            <p className='text-red-500'>{error}</p>
            <div>
              <label htmlFor='otp' className='text-gray-600 mb-2 block' />
              Please enter OTP
              <input
                type='text'
                name='otp'
                id='otp'
                onChange={(e) => setOTP(e.target.value)}
                className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
              />
            </div>
            <button
              type='submit'
              onClick={(e) => handleSubmit(e)}
              className='block w-full py-2 mt-5 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium'
            >
              Submit
            </button>
          </form>
          <p
            className={`text-sm pt-3 ${
              isClickable
                ? 'text-primary cursor-pointer'
                : 'text-gray-600 cursor-not-allowed'
            }`}
            onClick={handleResendOTP}
          >
            Resend OTP ({formatTime(timer)})
          </p>
        </div>
      </div>
    </>
  )
}

export default EmailVerificationComp
