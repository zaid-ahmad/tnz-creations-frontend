/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import SearchResults from '../components/SearchResults'
import api from '../api'
import { useLocation } from 'react-router-dom'

function Search({ user, wishlist, cart, searchResult, setSearchResult }) {
  const [source, setSource] = useState([])
  const [wishlistCount, setWishlistCount] = useState(wishlist.length)
  const [cartCount, setCartCount] = useState(cart.length)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const searchQuery = searchParams.get('query')

  useEffect(() => {
    setWishlistCount(wishlist.length)
  }, [wishlist])

  useEffect(() => {
    setCartCount(cart.length)
  }, [cart])

  const delete_from_wishlist = (id) => {
    console.log('i got called')
    const data_to_post = {
      email: user.email,
      itemId: id,
    }

    api
      .delete('/api/wishlist/remove', {
        data: data_to_post,
      })
      .then((response) => {
        if (response.status === 200) {
          // Remove the deleted item from the products state
          setWishlistCount(wishlistCount - 1)
        }
      })
  }

  useEffect(() => {
    // Fetch images for each product and update the state
    if (searchResult.length > 0) {
      const fetchImages = async () => {
        const imageSources = await Promise.all(
          searchResult.map((product) =>
            api
              .get(`/images/uploads/${product.images[0]}`, {
                responseType: 'arraybuffer',
              })
              .then((response) => {
                const base64 = btoa(
                  new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                  )
                )
                return 'data:;base64,' + base64
              })
          )
        )
        setSource(imageSources)
      }

      fetchImages()
    }
  }, [searchResult])

  return (
    <>
      <Header
        user={user}
        wishlistCount={wishlistCount}
        cartCount={cartCount}
        setSearchResult={setSearchResult}
        searchResult={searchResult}
      />
      <Navbar user={user} />
      {searchResult && searchResult.length > 0 ? (
        <div className='flex flex-col justify-center h-full pt-10'>
          <h2 className='text-2xl font-medium pl-20'>
            Showing results for "{searchQuery}"
          </h2>
          <div className='grid grid-cols-3 px-20 py-10 gap-5'>
            <SearchResults
              user={user}
              searchResult={searchResult}
              deleteFromWishlist={delete_from_wishlist}
              wishlistCount={wishlistCount}
              setWishlistCount={setWishlistCount}
              cartCount={cartCount}
              source={source}
              setCartCount={setCartCount}
            />
          </div>
        </div>
      ) : (
        <h2 className='text-md text-zinc-600 mt-8 w-full font-medium text-center py-52'>
          No products found for "{searchQuery}"
        </h2>
      )}

      <Footer />
    </>
  )
}

export default Search
