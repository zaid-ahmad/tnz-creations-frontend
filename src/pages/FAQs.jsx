/* eslint-disable react/prop-types */
import Footer from '../components/Footer'
import FAQsComp from '../components/FAQsComp'
import { useEffect } from 'react'

function FAQs() {
  useEffect(() => {
    window.scrollTo(0, 0) // Scroll to the top when route changes
  }, [])

  return (
    <>
      <FAQsComp />
      <Footer />
    </>
  )
}

export default FAQs

// Fix Link redirecting to the same area
