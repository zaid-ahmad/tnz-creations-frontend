import axios from 'axios'
import { useEffect, useState } from 'react'
/* eslint-disable react/prop-types */

//fix shipping charges stuff and this whole thing...

function OrderSummary({ orderData, user, selectedOption, setAddressMessage }) {
  const [shippingCharges, setShippingCharges] = useState(0)

  const initPayment = async (data) => {
    let key

    axios
      .get('https://tnzcreationsinventory.up.railway.app/payment/apiInfo')
      .then((response) => (key = response.data))

    const options = {
      key,
      amount: data.amount,
      currency: data.currency,
      name: 'TNZ Creations',
      description: 'stuff',
      image:
        'https://images.all-free-download.com/images/graphiclarge/cat_cat_face_cats_eyes_240527.jpg',
      order_id: data.id,
      callback_url: `https://tnzcreationsinventory.up.railway.app/payment/verify?orderId=${orderData._id}&addressId=${selectedOption}&email=${user.email}&shippingCharges=${shippingCharges}`,
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      theme: {
        color: '#bd2990',
      },
    }
    const rzp1 = new window.Razorpay(options)
    rzp1.open()
  }

  const handlePayment = async () => {
    try {
      if (selectedOption.length > 0) {
        const id = orderData._id
        const { data } = await axios.post(
          'https://tnzcreationsinventory.up.railway.app/payment/orders',
          {
            productId: id,
            shippingCharges,
          }
        )
        initPayment(data.data)
      } else {
        setAddressMessage('Please select an address.')
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (orderData && orderData.totalAmount) {
      if (
        parseInt(orderData.totalAmount * 0.18 + orderData.totalAmount) > 499
      ) {
        setShippingCharges(60)
      } else {
        console.log(
          parseInt(orderData.totalAmount * 0.18 + orderData.totalAmount)
        )
      }
    }
  }, [orderData])

  if (orderData && orderData.products) {
    return (
      <>
        <div className='w-96 border border-gray-200 p-4 rounded'>
          <h4 className='text-gray-800 text-lg mb-4 font-medium uppercase'>
            order summary
          </h4>
          <div className='space-y-2'>
            {orderData.products.map((product) => {
              return (
                <>
                  <div className='flex justify-between'>
                    <h5 className='text-gray-800 font-medium w-48'>
                      {product.product.name}
                    </h5>
                    <p className='text-gray-600'>×{product.quantity}</p>
                    <p className='text-gray-800 font-medium'>
                      ₹
                      {Number(
                        product.product.price -
                          (product.product.discount / 100) *
                            product.product.price
                      )}
                    </p>
                  </div>
                </>
              )
            })}
          </div>

          <div className='flex justify-between border-b border-gray-200 mt-1 text-sm text-gray-500 font-medium py-3 uppercas'>
            <p>Subtotal</p>
            {/* {order[0].totalAmount} */}
            <p>₹{orderData.totalAmount}</p>
          </div>

          <div className='flex justify-between border-b border-gray-200 mt-1 text-sm text-gray-500 font-medium py-3 uppercas'>
            <p>GST &#40;18%&#41;</p>
            <p>₹{Math.ceil(orderData.totalAmount * 0.18)}</p>
          </div>

          <div className='flex justify-between border-b border-gray-200 mt-1 text-sm text-gray-500 font-medium py-3 uppercas'>
            <p>Shipping</p>
            <p>₹{shippingCharges === 60 ? '60.00' : '0.00'}</p>
          </div>

          <div className='flex justify-between text-gray-800 font-medium py-3 uppercas'>
            <p className='font-semibold'>Total</p>
            <p>
              ₹
              {orderData && orderData.totalAmount
                ? Number(
                    Math.ceil(orderData.totalAmount * 0.18) +
                      orderData.totalAmount +
                      shippingCharges
                  )
                : '0'}
            </p>
          </div>
          <button
            onClick={() => handlePayment()}
            className='block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium'
          >
            Proceed to Payment
          </button>
        </div>
      </>
    )
  }

  return <div>No orders found.</div>
}

export default OrderSummary
