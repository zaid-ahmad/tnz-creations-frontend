/* eslint-disable react/prop-types */
import api from '../api'
import { Link, useNavigate } from 'react-router-dom'

function Sidebar({ user }) {
  const navigateTo = useNavigate()

  const logoutUser = () => {
    api.post('/api/logout').then((res) => {
      if (res.status === 200) {
        navigateTo('/')
        window.location.reload()
      }
    })
  }
  return (
    <>
      <div className='px-4 py-3 shadow flex items-center gap-4'>
        <div className='flex flex-grow gap-1'>
          <p className='text-gray-600'>Hi,</p>
          <span className='text-gray-800 font-medium'>{user.name}!</span>
        </div>
      </div>

      <div className='mt-6 bg-white shadow rounded p-4 space-y-4 divide divide-y-2 divide-zinc-200  text-gray-600'>
        <div className='flex flex-col gap-2 space-y-1 pl-8 pt-2'>
          <a
            href='/account'
            className='relative hover:text-primary block font-medium capitalize transition'
          >
            <span className='absolute -left-8 top-0 text-base'>
              <i className='fa fa-solid fa-location-dot'></i>
            </span>
            Manage addresses
          </a>
          <Link
            to={`orders`}
            className='relative hover:text-primary block font-medium capitalize transition'
          >
            <span className='absolute -left-8 top-0 text-base'>
              <i className='fa fa-solid fa-box-archive'></i>
            </span>
            My order history
          </Link>
        </div>

        <div className='space-y-1 pl-8 pt-4'>
          <a
            href='/wishlist'
            className='relative text-primary block font-medium capitalize transition'
          >
            <span className='absolute -left-8 top-0 text-base'>
              <i className='fa fa-regular fa-heart'></i>
            </span>
            My wishlist
          </a>
        </div>

        <div className='space-y-1 pl-8 pt-4'>
          <button
            onClick={logoutUser}
            className='relative hover:text-primary block font-medium capitalize transition'
          >
            <span className='absolute -left-8 top-0 text-base'>
              <i className='fa fa-solid fa-right-from-bracket'></i>
            </span>
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
