/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

// ✅ make address form
// ✅ fix amount update upon removing item from cart
// make sure that the quantity selected in the bag does not exceed the stock
// allow user to select an address and place order (save to db for now, payment at last)
// allow user to add, view, edit/delete addresses
// allow user to add product to cart from the shop page and product detail page

function SelectAddress({
  user,
  cartCount,
  selectedOption,
  setSelectedOption,
  addressMessage,
  setAddressMessage,
}) {
  const [addresses, setAddresses] = useState([])
  const [message, setMessage] = useState('')
  const navigateTo = useNavigate()

  useEffect(() => {
    api
      .get(
        `https://tnzcreationsinventory.up.railway.app/api/address/${user.email}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          setAddresses([...response.data])
        } else {
          setMessage('No addresses found. Please add one.')
        }
      })
  }, [user])

  const handleOptionChange = (event) => {
    const newValue = event.target.value
    setSelectedOption((prevValue) => (prevValue === newValue ? null : newValue))
    setAddressMessage('')
  }

  if (cartCount > 0) {
    if (addresses && addresses.length > 0) {
      return (
        <>
          <h2 className='font-medium text-xl'>Select Address:</h2>
          {addressMessage && addressMessage.length > 0 ? (
            <>
              <p className='text-red-600'>{addressMessage}</p>
            </>
          ) : (
            ''
          )}
          <div className='col-span-9 grid grid-cols-2 gap-4'>
            {addresses.map((address) => {
              const countryCode = address.phone.slice(0, 3)
              const formattedPhoneNumber = address.phone.slice(3)
              return (
                <>
                  <div className='flex items-center gap-5'>
                    <div>
                      <label className='radio-option cursor-pointer'>
                        <div className='flex flex-col shadow rounded bg-white px-4 pt-4 pb-5 w-72 h-auto'>
                          <div className='flex items-center gap-2'>
                            <input
                              type='radio'
                              name={address.name}
                              value={address._id}
                              onChange={handleOptionChange}
                              checked={selectedOption === address._id}
                            />
                            <h3 className='font-medium text-gray-800 text-lg'>
                              {address.name}
                            </h3>
                          </div>
                          <div className='space-y-1 pt-3'>
                            <p className='text-gray-800 py-2 w-60'>
                              {address.address}
                            </p>
                            <p className='text-gray-800 w-60'>
                              {address.state}-{address.pin}
                            </p>
                          </div>
                          <p className='text-gray-800 mt-auto pt-5'>
                            {countryCode + ' ' + formattedPhoneNumber}
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
          <div onClick={() => navigateTo(`/account/${user.email}/address/new`)}>
            <span className='mt-5 mb-10 flex items-center gap-2 opacity-75 cursor-pointer'>
              <i className='fa-solid fa-circle-plus fa-lg'></i>
              <p>Add New Address</p>
            </span>
          </div>
        </>
      )
    }
    return (
      <>
        <h2 className='font-medium text-xl'>Select Address:</h2>

        <p>{message}</p>
        <button
          onClick={() => navigateTo(`/account/${user.email}/address/new`)}
          className='block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium'
        >
          Click here to add an address
        </button>
      </>
    )
  }
}

export default SelectAddress
