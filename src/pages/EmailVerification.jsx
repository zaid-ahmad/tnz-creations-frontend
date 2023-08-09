/* eslint-disable react/prop-types */
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import EmailVerificationComp from '../components/EmailVerificationComp'
import Footer from '../components/Footer'

function EmailVerification({ user }) {
  return (
    <>
      <Header user={user} />
      <Navbar user={user} />
      <EmailVerificationComp />
      <Footer />
    </>
  )
}

export default EmailVerification
