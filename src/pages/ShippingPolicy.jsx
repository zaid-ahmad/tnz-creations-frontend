/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import Footer from '../components/Footer'
import ShippingPolicyComp from '../components/ShippingPolicyComp'

function ShippingPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0) // Scroll to the top when route changes
  }, [])

  return (
    <>
      <ShippingPolicyComp />
      <Footer />
    </>
  )
}

export default ShippingPolicy
