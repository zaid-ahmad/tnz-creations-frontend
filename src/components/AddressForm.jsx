/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-number-input/input'
import api from '../api'

function AddressForm({ user }) {
  const [name, setName] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('DL')
  const [pin, setPin] = useState('')
  const [phone, setPhone] = useState('')
  const navigateTo = useNavigate()

  const saveAddress = (e) => {
    e.preventDefault()

    const address = `${address1 || ''} ${address2 || ''}`.trim()

    const data_to_post = {
      name,
      address,
      city,
      state,
      pin,
      phone,
    }

    api
      .post(
        `https://tnzcreationsinventory.up.railway.app/api/address/${user.email}/new`,
        data_to_post
      )
      .then((response) => {
        if (response.status === 200) {
          navigateTo('/checkout')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <div className='p-6 border border-gray-300 sm:rounded-md'>
        <h2 className='text-xl font-medium mb-5'>Add New Address</h2>
        <form
          method='POST'
          autoComplete='off'
          onSubmit={(event) => saveAddress(event)}
        >
          <label className='block mb-3' htmlFor='name'>
            <div className='flex gap-1 mt-3'>
              <h3>Receiver's Full Name</h3>
              <span className='text-lg text-red-600 mb-0 mt-0'>*</span>
            </div>

            <input
              type='text'
              name='name'
              id='name'
              onChange={(e) => setName(e.target.value)}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
              placeholder='Name'
              required
            />
          </label>
          <label className='block mb-3' htmlFor='address-1'>
            <div className='flex gap-1 mt-3'>
              <h3>Complete Address (House No./Block/Street/Area/Landmark)</h3>
              <span className='text-lg text-red-600 mb-0 mt-0'>*</span>
            </div>
            <input
              type='text'
              name='address-1'
              id='address-1'
              onChange={(e) => setAddress1(e.target.value)}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
              placeholder='Address Line 1'
              required
            />
          </label>
          <label className='block mb-3' htmlFor='address-2'>
            <input
              type='text'
              name='address-2'
              id='address-2'
              onChange={(e) => setAddress2(e.target.value)}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
              placeholder='Address Line 2'
            />
          </label>
          <label className='block mb-3' htmlFor='city'>
            <div className='flex gap-1 mt-3'>
              <h3>City</h3>
              <span className='text-lg text-red-600 mb-0 mt-0'>*</span>
            </div>

            <input
              type='text'
              name='city'
              id='city'
              onChange={(e) => setCity(e.target.value)}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
              placeholder='City'
              required
            />
          </label>
          <label className='block mb-3' htmlFor='state'>
            <div className='flex gap-1 mt-3'>
              <h3>State</h3>
              <span className='text-lg text-red-600 mb-0 mt-0'>*</span>
            </div>

            <select
              className='border border-gray-300 text-sm px-4 py-3'
              onChange={(e) => setState(e.target.value)}
              required
              value={state}
            >
              <option value='Andhra Pradesh'>Andhra Pradesh</option>
              <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
              <option value='Assam'>Assam</option>
              <option value='Bihar'>Bihar</option>
              <option value='Chhattisgarh'>Chhattisgarh</option>
              <option value='Gujarat'>Gujarat</option>
              <option value='Haryana'>Haryana</option>
              <option value='Himachal Pradesh'>Himachal Pradesh</option>
              <option value='Jammu and Kashmir'>Jammu and Kashmir</option>
              <option value='Goa'>Goa</option>
              <option value='Jharkhand'>Jharkhand</option>
              <option value='Karnataka'>Karnataka</option>
              <option value='Kerala'>Kerala</option>
              <option value='Madhya Pradesh'>Madhya Pradesh</option>
              <option value='Maharashtra'>Maharashtra</option>
              <option value='Manipur'>Manipur</option>
              <option value='Meghalaya'>Meghalaya</option>
              <option value='Mizoram'>Mizoram</option>
              <option value='Nagaland'>Nagaland</option>
              <option value='Odisha'>Odisha</option>
              <option value='Punjab'>Punjab</option>
              <option value='Rajasthan'>Rajasthan</option>
              <option value='Sikkim'>Sikkim</option>
              <option value='Tamil Nadu'>Tamil Nadu</option>
              <option value='Telangana'>Telangana</option>
              <option value='Tripura'>Tripura</option>
              <option value='Uttarakhand'>Uttarakhand</option>
              <option value='Uttar Pradesh'>Uttar Pradesh</option>
              <option value='West Bengal'>West Bengal</option>
              <option value='Andaman and Nicobar Islands'>
                Andaman and Nicobar Islands
              </option>
              <option value='Chandigarh'>Chandigarh</option>
              <option value='Dadra and Nagar Haveli'>
                Dadra and Nagar Haveli
              </option>
              <option value='Daman and Diu'>Daman and Diu</option>
              <option value='Delhi'>Delhi</option>
              <option value='Lakshadweep'>Lakshadweep</option>
              <option value='Puducherry'>Puducherry</option>
            </select>
          </label>
          <label className='block mb-3' htmlFor='zip'>
            <div className='flex gap-1 mt-3'>
              <h3>Pin Code</h3>
              <span className='text-lg text-red-600 mb-0 mt-0'>*</span>
            </div>

            <input
              type='text'
              name='zip'
              id='zip'
              onChange={(e) => setPin(e.target.value)}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
              placeholder='Zip/Postal code'
              required
            />
          </label>
          <label className='block mb-3' htmlFor='country'>
            <div className='flex items-center gap-1 mt-3'>
              <h3>Country</h3>
              <p className='text-sm'>
                &#40;Please note that we are currently accepting orders from
                India only&#41;
              </p>
            </div>

            <input
              type='text'
              name='country'
              id='country'
              className='block w-full border cursor-not-allowed select-none outline-none border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
              placeholder=''
              defaultValue='India'
              readOnly
            />
          </label>
          <label className='block mb-3' htmlFor='phone'>
            <div className='flex gap-1 mt-3'>
              <h3>Receiver's Phone Number</h3>
              <span className='text-lg text-red-600 mb-0 mt-0'>*</span>
            </div>

            <PhoneInput
              country='IN'
              id='phone'
              value={phone}
              onChange={setPhone}
              className='block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400'
              required
            />
          </label>

          <div className='mb-3'>
            <button
              type='submit'
              className='
            h-10
            w-32
            mt-5
            px-5
            bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition
            text-white
            '
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddressForm
