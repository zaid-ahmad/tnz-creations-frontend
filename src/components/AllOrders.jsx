/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function AllOrders({ user }) {
  const [orders, setOrders] = useState([])
  const [source, setSource] = useState([])
  const navigateTo = useNavigate()

  useEffect(() => {
    api.get(`/api/${user.email}/orders`).then((response) => {
      if (response.status === 200) {
        setOrders([...response.data])
      }
    })
  }, [user])

  useEffect(() => {
    // Fetch images for each product and update the state
    if (orders.length > 0) {
      const fetchImages = async () => {
        const allImageSources = await Promise.all(
          orders.map(async (order) => {
            const products = order.products.map((product) => product.product)
            const imageSources = await Promise.all(
              products.map((product) =>
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
            return {
              id: order._id,
              images: imageSources,
            }
          })
        )

        setSource(allImageSources)
      }

      fetchImages()
    }
  }, [orders])

  useEffect(() => {
    if (!user.email) {
      navigateTo('/login')
    }
  })

  if (source.length > 0) {
    return (
      <>
        {orders.map((order, uIndex) => {
          const dateObj = new Date(order.date_placed)
          const options = { month: 'short', day: 'numeric', year: 'numeric' }
          const formattedDate = dateObj.toLocaleDateString('en-US', options)
          return (
            <div key={order._id} className='bg-white rounded border mb-5'>
              <div className='p-6'>
                <div className='flex items-center gap-10'>
                  <div className='flex flex-col gap-1'>
                    <h2 className=''>Order number</h2>
                    <p className='text-sm text-zinc-500'>
                      {order.razorpay_order_id.split('_')[1]}
                    </p>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h2 className=''>Payment ID</h2>
                    <p className='text-sm text-zinc-500'>
                      {order.razorpay_payment_id.split('_')[1]}
                    </p>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h2 className=''>Placed on</h2>
                    <p className='text-sm text-zinc-500'>{formattedDate}</p>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h2 className=''>Total amount</h2>
                    <p className='text-sm font-medium text-zinc-900'>
                      ₹{order.totalAmount}{' '}
                      <span className='text-xs'>(inc. 18% GST)</span>
                    </p>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <h2 className=''>Status</h2>
                    {order.status === 'paid' ? (
                      <>
                        <p className='text-sm text-orange-500 font-semibold'>
                          Processing
                        </p>
                      </>
                    ) : order.status === 'shipped' ? (
                      <>
                        <p className='text-sm text-yellow-500 font-semibold'>
                          Shipped
                        </p>
                      </>
                    ) : order.status === 'delivered' ? (
                      <>
                        <p className='text-sm text-green-500 font-semibold'>
                          Delivered
                        </p>
                      </>
                    ) : null}
                  </div>
                </div>

                <div className='grid grid-cols-2 mt-5'>
                  {order.products.map((item, index) => {
                    if (source[uIndex].id === order._id) {
                      return (
                        <div
                          key={item.product._id}
                          className='flex gap-2 my-3 '
                        >
                          <img
                            src={source[uIndex].images[index]}
                            className='w-28 aspect-square rounded-sm'
                          />
                          <div className='flex flex-col'>
                            <h4 className='text-md'>{item.product.name}</h4>
                            <div className='mt-2'>
                              <p className='text-gray-500 text-sm'>
                                Color: {item.color}
                              </p>
                              <p className='text-gray-500 text-sm'>
                                Price: ₹{item.product.price}
                              </p>
                              <p className='text-gray-500 text-sm'>
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </>
    )
  } else {
    return (
      <>
        <div className='flex flex-col items-center justify-center mt-5'>
          <svg
            aria-hidden='true'
            className='inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <h2>Loading...</h2>
        </div>
      </>
    )
  }
}

export default AllOrders
