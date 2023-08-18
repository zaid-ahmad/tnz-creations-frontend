import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import Wishlist from './pages/Wishlist'
import Register from './pages/Register'
import EmailVerification from './pages/EmailVerification'
import EmailVerificationInp from './pages/EmailVerificationInp'
import Address from './pages/Address'
import AddressEdit from './pages/AddressEdit'
import PaymentSuccess from './pages/PaymentSuccess'
import api from './api'
import Loading from './components/Loading'
import Orders from './pages/Orders'
import Search from './pages/Search'
import TOS from './pages/TOS'
import Contact from './pages/Contact'
import About from './pages/About'

const RouteSwitch = () => {
  const [user, setUser] = useState({})
  const [wishlist, setWishlist] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    api
      .get('/api/user')
      .then((response) => {
        if (response.status === 200) {
          setUser({ ...response.data, expired: false })
        }
      })
      .catch((error) => {
        if (error.response.status === 498 || error.response.status === 401) {
          setUser({ expired: true })
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!loading && !user.expired) {
      api.get(`/api/wishlist?email=${user.email}`).then((res) => {
        setWishlist(res.data)
      })
    }
  }, [user, loading])

  useEffect(() => {
    if (!loading && !user.expired) {
      api.get(`/api/cart-items?email=${user.email}`).then((res) => {
        setCart(res.data)
      })
    }
  }, [user, loading])

  if (loading || !user) {
    return (
      <>
        <Loading />
      </>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Home
              user={user}
              wishlist={wishlist}
              cart={cart}
              setSearchResult={setSearchResult}
              searchResult={searchResult}
            />
          }
        />
        <Route
          path='/shop'
          element={
            <Shop
              user={user}
              wishlist={wishlist}
              cart={cart}
              setSearchResult={setSearchResult}
              searchResult={searchResult}
            />
          }
        />
        <Route
          path='/products/:id'
          element={
            <Product
              user={user}
              wishlist={wishlist}
              cart={cart}
              setSearchResult={setSearchResult}
              searchResult={searchResult}
            />
          }
        />
        <Route
          path='/login'
          element={<Login user={user} wishlist={wishlist} cart={cart} />}
        />
        <Route
          path='/register'
          element={<Register user={user} wishlist={wishlist} cart={cart} />}
        />
        <Route
          path='/verify'
          element={
            <EmailVerification user={user} wishlist={wishlist} cart={cart} />
          }
        />
        <Route
          path='/verification'
          element={<EmailVerificationInp user={user} />}
        />
        <Route
          path='/checkout'
          element={
            <Checkout
              user={user}
              wishlist={wishlist}
              cart={cart}
              setSearchResult={setSearchResult}
              searchResult={searchResult}
            />
          }
        />
        <Route
          path='/wishlist'
          element={
            <Wishlist
              user={user}
              wishlist={wishlist}
              cart={cart}
              setSearchResult={setSearchResult}
              searchResult={searchResult}
            />
          }
        />
        <Route
          path='/account'
          element={
            <Account
              user={user}
              wishlist={wishlist}
              cart={cart}
              setSearchResult={setSearchResult}
              searchResult={searchResult}
            />
          }
        />
        <Route
          path='/account/:email/address/new'
          element={
            <Address
              user={user}
              wishlist={wishlist}
              cart={cart}
              setSearchResult={setSearchResult}
              searchResult={searchResult}
            />
          }
        />
        <Route
          path='/account/:email/edit'
          element={
            <AddressEdit
              user={user}
              wishlist={wishlist}
              cart={cart}
              setSearchResult={setSearchResult}
              searchResult={searchResult}
            />
          }
        />
        <Route
          path='/account/orders'
          element={
            <Orders
              user={user}
              wishlist={wishlist}
              cart={cart}
              setSearchResult={setSearchResult}
              searchResult={searchResult}
            />
          }
        />
        <Route
          path='/paymentsuccess'
          element={
            <PaymentSuccess user={user} wishlist={wishlist} cart={cart} />
          }
        />
        <Route
          path='/search/results'
          element={
            <Search
              user={user}
              wishlist={wishlist}
              cart={cart}
              setSearchResult={setSearchResult}
              searchResult={searchResult}
            />
          }
        />
        <Route path='/terms-of-service' element={<TOS />} />
        <Route
          path='/contact'
          element={<Contact user={user} wishlist={wishlist} cart={cart} />}
        />
        <Route
          path='/about'
          element={<About user={user} wishlist={wishlist} cart={cart} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch
