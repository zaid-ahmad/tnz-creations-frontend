/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import Footer from '../components/Footer'
import TOSComp from '../components/TOSComp'

function TOS() {
  useEffect(() => {
    window.scrollTo(0, 0) // Scroll to the top when route changes
  }, [])

  return (
    <>
      <TOSComp />
      <Footer />
    </>
  )
}

export default TOS
