/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api'

function LoginComp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const navigateTo = useNavigate()

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email.includes('@')) {
      setError('Please enter a valid Email address')
    } else {
      const data = {
        email,
        password,
      }

      api
        .post('/api/login', data, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            navigateTo('/')
            window.location.reload()
          }
        })
        .catch((err) => {
          setError(err.response.data)
        })
    }
  }

  return (
    <>
      <div className='contain py-16'>
        <div className='max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden'>
          <h2 className='text-2xl uppercase font-medium mb-1'>Login</h2>
          <p className='text-gray-600 mb-6 text-sm'>
            Welcome! So good to have you back!
          </p>
          <form autoComplete='off' onSubmit={(event) => handleSubmit(event)}>
            <p className='text-red-500'>{error}</p>

            <div className='space-y-2'>
              <div>
                <label htmlFor='email' className='text-gray-600 mb-2 block' />
                Email address
                <input
                  type='email'
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                  id='email'
                  className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
                  placeholder='youremail.@domain.com'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <div>
                <label
                  htmlFor='password'
                  className='text-gray-600 mb-2 block'
                />
                Password
                <div className='relative'>
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                    id='password'
                    className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
                    placeholder='***********'
                  />
                  <div
                    className='cursor-pointer absolute inset-y-0 right-0 flex items-center px-8 text-gray-600 border-l border-gray-300'
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-5 h-5'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-5 h-5'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-4'>
              <button
                type='submit'
                className='block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium'
              >
                Login
              </button>
              <div className='flex gap-2 pt-5'>
                <p className='text-gray-600 text-sm'>Don't have an account?</p>
                <Link
                  to='/register'
                  className='text-gray-600 text-sm underline'
                >
                  Register here
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginComp
