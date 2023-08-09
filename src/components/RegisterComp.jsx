import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api'
import PhoneInput from 'react-phone-number-input/input'

function RegisterComp() {
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  const navigateTo = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      if (name.length < 3) {
        setError('Name is too short.')
      } else if (!email.includes('@')) {
        setError('Please enter a valid email address.')
      } else if (phone.length < 10) {
        setError('Please enter a valid phone number.')
      }

      const user_data = {
        name,
        email,
        password,
        phone,
      }

      api
        .post(
          'https://tnzcreationsinventory.up.railway.app/api/register',
          user_data
        )
        .then((response) => {
          if (response.status == 200) {
            navigateTo(`/verify?user=${email}`)
          }
        })
        .catch((err) => console.log(err))
    } else {
      setError('Passwords do not match.')
    }
  }

  return (
    <>
      <div className='contain py-16'>
        <div className='max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden'>
          <h2 className='text-2xl uppercase font-medium mb-1'>Register</h2>
          <p className='text-gray-600 mb-6 text-sm'>Let's get you started!</p>
          <p className='text-red-500'>{error}</p>
          <form method='POST' autoComplete='off'>
            <div className='space-y-2'>
              <div>
                <label htmlFor='email' className='text-gray-600 mb-2 block' />
                Full Name
                <input
                  type='text'
                  name='name'
                  onChange={(e) => setName(e.target.value)}
                  id='name'
                  className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
                  placeholder='John Doe'
                />
              </div>
            </div>
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
                <label htmlFor='phone' className='text-gray-600 mb-2 block' />
                Phone number (+91)
                <br />
                <PhoneInput
                  country='IN'
                  id='phone'
                  value={phone}
                  onChange={setPhone}
                  className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <div>
                <label htmlFor='email' className='text-gray-600 mb-2 block' />
                Password
                <input
                  type='password'
                  name='password'
                  onChange={(e) => setPassword(e.target.value)}
                  id='email'
                  className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
                  placeholder='***********'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <div>
                <label htmlFor='email' className='text-gray-600 mb-2 block' />
                Confirm Password
                <input
                  type='password'
                  name='password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id='email'
                  className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
                  placeholder='***********'
                />
              </div>
            </div>

            <div className='mt-4'>
              <button
                type='submit'
                onClick={(e) => handleSubmit(e)}
                className='block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium'
              >
                Register
              </button>
              <div className='flex gap-2 pt-5'>
                <p className='text-gray-600 text-sm'>
                  Already have an account?
                </p>
                <Link to='/login' className='text-gray-600 text-sm underline'>
                  Login here
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterComp
