/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function AccountComp({ user }) {
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

  const handleEditClick = (id) => {
    navigateTo(`/account/${user.email}/edit?address=${id}`)
  }

  if (addresses && addresses.length > 0) {
    return (
      <>
        <div className='col-span-9 grid grid-cols-200'>
          {addresses.map((address) => {
            const countryCode = address.phone.slice(0, 3)
            const formattedPhoneNumber = address.phone.slice(3)
            return (
              <>
                <div className='flex items-center gap-5'>
                  <div>
                    <div className='shadow rounded bg-white px-4 pt-4 pb-8 w-72 h-48'>
                      <div className='flex items-center gap-2 justify-between'>
                        <h3 className='font-medium text-gray-800 text-lg'>
                          {address.name}
                        </h3>
                        <button
                          className='text-primary'
                          onClick={() => handleEditClick(address._id)}
                        >
                          Edit
                        </button>
                      </div>
                      <div className='space-y-1 pt-3'>
                        <p className='text-gray-800 py-2 w-60'>
                          {address.address}
                        </p>
                        <p className='text-gray-800'>
                          {countryCode + ' ' + formattedPhoneNumber}
                        </p>
                      </div>
                    </div>
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

export default AccountComp
