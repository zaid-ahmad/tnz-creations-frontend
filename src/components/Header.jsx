/* eslint-disable react/prop-types */
import Logo from '../assets/Logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api'
import Hamburger from 'hamburger-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header({ user, wishlistCount, cartCount, setSearchResult }) {
  const navigateTo = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [active, setActive] = useState(false)
  const [isOpen, setOpen] = useState(false)

  const activeSide =
    'flex items-center gap-5 md:gap-2 space-x-4 duration-200 translate-y-1 py-5'

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
          <div className='container flex flex-col items-center justify-between md:flex-row'>
            <div className='flex items-center gap-5'>
              <div>
                <Link to={'/'}>
                  <div className='flex gap-2 items-center'>
                    <img src={Logo} alt='Logo' className='w-16' />
                    <h1 className='font-merr font-bold text-3xl'>
                      TNZ Creations
                    </h1>
                  </div>
                </Link>
              </div>
              <div onClick={() => setActive(!active)} className='md:hidden'>
                <Hamburger toggled={isOpen} toggle={setOpen} />
              </div>
            </div>

            <div className='hidden w-full max-w-xl relative md:flex md:w-3/6'>
              <span className='absolute left-4 top-3 text-lg text-gray-400'>
                <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
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

            <div className='transition-all'>
              <div
                className={`${active ? activeSide : 'hidden'} md:${activeSide}`}
              >
                <a
                  href='/wishlist'
                  className='text-center text-gray-700 hover:text-primary transition relative'
                >
                  <div className='text-2xl'>
                    <FontAwesomeIcon icon='fa-regular fa-heart' />
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
                    <FontAwesomeIcon icon='fa-solid fa-bag-shopping' />
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
                    <FontAwesomeIcon icon='fa-regular fa-user' />
                  </div>
                  <div className='text-xs leading-3'>Account</div>
                </a>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  } else {
    return (
      <>
        <header className='py-4 shadow-sm bg-white'>
          <div className='container flex flex-col items-center justify-between md:flex-row'>
            <div className='flex items-center gap-5'>
              <div>
                <Link to={'/'}>
                  <div className='flex gap-2 items-center'>
                    <img src={Logo} alt='Logo' className='w-16' />
                    <h1 className='font-merr font-bold text-3xl'>
                      TNZ Creations
                    </h1>
                  </div>
                </Link>
              </div>
              <div onClick={() => setActive(!active)} className='md:hidden'>
                <Hamburger toggled={isOpen} toggle={setOpen} />
              </div>
            </div>

            <div className='hidden w-full max-w-xl relative md:flex md:w-3/6'>
              <span className='absolute left-4 top-3 text-lg text-gray-400'>
                <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
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

            <div className='transition-all'>
              <div
                className={`${active ? activeSide : 'hidden'} md:${activeSide}`}
              >
                <Link
                  to='/login'
                  className='text-center text-gray-700 hover:text-primary transition relative'
                >
                  <div className='text-2xl'>
                    <FontAwesomeIcon icon='fa-regular fa-heart' />
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
                </Link>
                <Link
                  to='/login'
                  className='text-center text-gray-700 hover:text-primary transition relative'
                >
                  <div className='text-2xl'>
                    <FontAwesomeIcon icon='solid fa-bag-shopping' />
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
                </Link>
                <Link
                  to='/login'
                  className='text-center text-gray-700 hover:text-primary transition relative bg-primary rounded p-2 text-white'
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </header>
      </>
    )
  }
}

export default Header
