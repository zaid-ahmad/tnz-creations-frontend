import EmailIc from '../assets/email.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../api'

function EmailVerificationComp() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const email = searchParams.get('user')
  const navigateTo = useNavigate()

  const handleSubmit = () => {
    api
      .post(
        `https://tnzcreationsinventory.up.railway.app/api/generate-otp/${email}`
      )
      .then((response) => {
        if (response.status === 200) {
          navigateTo(`/verification?user=${email}`)
        }
      })
  }

  return (
    <>
      <div className='contain py-16'>
        <div className='max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden'>
          <h2 className='text-2xl capitalize text-center font-medium mb-1'>
            Confirm Your Email Address
          </h2>
          <div className='flex justify-center py-6'>
            <img src={EmailIc} alt='Email Confirm Image' className='w-40' />
          </div>
          <p className='text-gray-600 mb-6 text-sm text-center'>
            Email verification is crucial for ensuring the security and
            authenticity of user accounts. It helps prevent unauthorized access
            and ensures that only valid users have access to the platform.
          </p>

          <button
            onClick={() => handleSubmit()}
            className='block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium'
          >
            Send OTP to {email}
          </button>
        </div>
      </div>
    </>
  )
}

export default EmailVerificationComp
