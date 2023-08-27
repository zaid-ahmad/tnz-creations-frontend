/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import Footer from '../components/Footer'
import PrivacyPolicyComp from '../components/PrivacyPolicyComp'

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0) // Scroll to the top when route changes
  }, [])

  return (
    <>
      <PrivacyPolicyComp />
      <Footer />
    </>
  )
}

export default PrivacyPolicy
