/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import api from '../api'
import axios from 'axios'
import OrderItem from '../components/OrderItem'

function CheckoutItems({ user, setCartCount, cartCount, setOrderData }) {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')
  const [source, setSource] = useState([])

  useEffect(() => {
    api
      .get(
        `https://tnzcreationsinventory.up.railway.app/cart-items?email=${user.email}`
      )
      .then((response) => {
        if (response.status === 200) {
          setProducts([...response.data])
        }
      })
      .catch((err) => {
        setMessage(err.response.data)
      })
  }, [])

  useEffect(() => {
    // Fetch images for each product and update the state
    const fetchImages = async () => {
      const imageSources = await Promise.all(
        products.map(async (product) => {
          const response = await axios.get(
            `https://tnzcreationsinventory.up.railway.app/images/uploads/${product.product.images[0]}`,
            {
              responseType: 'arraybuffer',
            }
          )
          const base64 = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          )
          return 'data:;base64,' + base64
        })
      )
      setSource(imageSources)
    }

    fetchImages()
  }, [products])

  const delete_from_order = (id) => {
    const data_to_post = {
      email: user.email,
    }

    axios
      .delete(
        `https://tnzcreationsinventory.up.railway.app/api/order/remove-product/${id}`,
        {
          data: data_to_post,
        }
      )
      .then((response) => {
        if (response.status === 200) {
          // Remove the deleted item from the products state
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.product._id !== id)
          )
          setCartCount(cartCount - 1)
        }
      })

    setOrderData((prevOrderData) => {
      const updatedOrderData = { ...prevOrderData }
      updatedOrderData.products = updatedOrderData.products.filter(
        (product) => product.product._id !== id
      )
      return updatedOrderData
    })
  }

  const update_product_quantity = (id, newQuantity) => {
    setOrderData((prevOrderData) => {
      const updatedOrderData = { ...prevOrderData }
      let totalAmount = 0

      updatedOrderData.products = updatedOrderData.products.map((product) => {
        if (product.product._id === id) {
          product.quantity = newQuantity
        }

        const price =
          product.product.price -
          (product.product.discount / 100) * product.product.price
        totalAmount += price * product.quantity

        return product
      })

      updatedOrderData.totalAmount = totalAmount

      return updatedOrderData
    })
  }
  return (
    <>
      {products.length > 0 ? (
        <>
          <div className=' space-y-4'>
            {products.map((product, index) => (
              <OrderItem
                key={product.id}
                product={product}
                source={source}
                deleteFromOrder={delete_from_order}
                updateProductQuantity={update_product_quantity}
                index={index}
                user={user}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className='text-2xl w-[600px] mt-10 ml-5 italic'>{message}</h2>
        </>
      )}
    </>
  )
}

export default CheckoutItems
