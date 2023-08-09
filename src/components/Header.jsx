/* eslint-disable react/prop-types */
import Logo from '../assets/Logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api'

function Header({ user, wishlistCount, cartCount, setSearchResult }) {
  const navigateTo = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const searchFunc = (event) => {
    event.preventDefault()

    api.get(`/api/search?searchQuery=${searchQuery}`).then((response) => {
      const data = response.data

      console.log(data)
      if (data.products.length > 0) {
        setSearchResult([...data.products])
        navigateTo(`/search/results?query=${searchQuery}`)
      } else if (data.categories.length > 0) {
        setSearchResult([...data.categoryProducts])
        navigateTo(`/search/results?query=${searchQuery}`)
      } else {
        navigateTo(`/search/results?query=${searchQuery}`)
      }
    })
  }

  if (!user.expired) {
    return (
      <>
        <header className='py-4 shadow-sm bg-white'>
          <div className='container flex items-center justify-between'>
            <Link to={'/'}>
              <div className='flex gap-2 items-center'>
                <img src={Logo} alt='Logo' className='w-16' />
                <h1 className='font-merr font-bold text-3xl'>TNZ Creations</h1>
              </div>
            </Link>

            <div className='w-full max-w-xl relative flex'>
              <span className='absolute left-4 top-3 text-lg text-gray-400'>
                <i className='fa-solid fa-magnifying-glass'></i>
              </span>
              <form
                onSubmit={(event) => searchFunc(event)}
                className='flex w-full'
              >
                <input
                  type='text'
                  name='search'
                  onChange={(e) => setSearchQuery(e.target.value)}
                  id='search'
                  className='w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex'
                  placeholder='Search...'
                />
                <button
                  type='submit'
                  className='bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-[#8f1f6d] transition:hidden md:flex flex items-center'
                >
                  Search
                </button>
              </form>
            </div>

            <div className='flex items-center space-x-4'>
              <a
                href='/wishlist'
                className='text-center text-gray-700 hover:text-primary transition relative'
              >
                <div className='text-2xl'>
                  <i className='fa-regular fa-heart'></i>
                </div>
                <div className='text-xs leading-3'>Wishlist</div>
                {wishlistCount > 0 ? (
                  <>
                    <div className='absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs'>
                      {wishlistCount}
                    </div>
                  </>
                ) : (
                  ''
                )}
              </a>
              <a
                href='/checkout'
                className='text-center text-gray-700 hover:text-primary transition relative'
              >
                <div className='text-2xl'>
                  <i className='fa-solid fa-bag-shopping'></i>
                </div>
                <div className='text-xs leading-3'>Cart</div>
                {cartCount > 0 ? (
                  <>
                    <div className='absolute -right-2 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs'>
                      {cartCount}
                    </div>
                  </>
                ) : (
                  ''
                )}
              </a>
              <a
                href={'/account'}
                className='text-center text-gray-700 hover:text-primary transition relative'
              >
                <div className='text-2xl'>
                  <i className='fa-regular fa-user'></i>
                </div>
                <div className='text-xs leading-3'>Account</div>
              </a>
            </div>
          </div>
        </header>
      </>
    )
  } else {
    return (
      <>
        <header className='py-4 shadow-sm bg-white'>
          <div className='container flex items-center justify-between'>
            <Link to={'/'}>
              <div className='flex gap-2 items-center'>
                <img src={Logo} alt='Logo' className='w-16' />
                <h1 className='font-merr font-bold text-3xl'>TNZ Creations</h1>
              </div>
            </Link>

            <div className='hidden w-full max-w-xl relative md:flex md:w-4/12'>
              <span className='absolute left-4 top-3 text-lg text-gray-400'>
                <i className='fa-solid fa-magnifying-glass'></i>
              </span>
              <form
                onSubmit={(event) => searchFunc(event)}
                className='flex w-full'
              >
                <input
                  type='text'
                  name='search'
                  onChange={(e) => setSearchQuery(e.target.value)}
                  id='search'
                  className='w-full border border-primary border-r-0 text-base pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex md:text-sm'
                  placeholder='Search...'
                />
                <button
                  type='submit'
                  className='bg-primary border border-primary text-base text-white px-8 rounded-r-md hover:bg-[#8f1f6d] transition:hidden md:flex flex items-center md:text-xs md:px-4'
                >
                  Search
                </button>
              </form>
            </div>

            <div className='flex items-center space-x-4'>
              <Link
                to={'/login'}
                className='text-center text-gray-700 hover:text-primary transition relative'
              >
                <div className='text-2xl'>
                  <i className='fa-regular fa-heart'></i>
                </div>
                <div className='text-xs leading-3'>Wishlist</div>
              </Link>
              <Link
                to={'/login'}
                className='text-center text-gray-700 hover:text-primary transition relative'
              >
                <div className='text-2xl'>
                  <i className='fa-solid fa-bag-shopping'></i>
                </div>
                <div className='text-xs leading-3'>Cart</div>
              </Link>
            </div>
          </div>
        </header>
      </>
    )
  }
}

export default Header
// tausiftnz123
