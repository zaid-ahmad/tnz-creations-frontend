/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api'

function LoginComp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigateTo = useNavigate()

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
        .post('https://tnzcreationsinventory.up.railway.app/api/login', data)
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
                <input
                  type='password'
                  name='password'
                  onChange={(e) => setPassword(e.target.value)}
                  id='password'
                  className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
                  placeholder='***********'
                />
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
