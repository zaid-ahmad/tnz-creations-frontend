/* eslint-disable react/prop-types */
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import OTPInp from '../components/OTPInp'
import Footer from '../components/Footer'

function EmailVerificationInp({ user }) {
  return (
    <>
      <Header user={user} />
      <Navbar user={user} />
      <OTPInp />
      <Footer />
    </>
  )
}

export default EmailVerificationInp
