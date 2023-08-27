import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.svg'

function TOSComp() {
  return (
    <>
      <header className='py-4 shadow-sm bg-white'>
        <div className='container flex flex-col items-center justify-center md:flex-row'>
          <div className='flex items-center gap-5'>
            <div>
              <Link to={'/'}>
                <div className='flex gap-2 items-center'>
                  <img src={Logo} alt='Logo' className='w-16' />
                  <h1 className='font-merr font-bold text-3xl'>
                    TNZ Creations
                  </h1>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <section className='flex flex-col p-5'>
        <h2 className='text-center text-2xl font-medium pb-5'>
          Privacy Policy
        </h2>

        <div className='paras flex flex-col gap-7'>
          <div className='para3'>
            <ol className='flex flex-col gap-5 list-decimal list-inside'>
              <div>
                <li className='font-medium'>Hosting</li>
                <p>
                  We host the website and back-end systems on reliable, well
                  tested, cloud infrastructure. All traffic between your browser
                  and our servers is sent over HTTPS.
                </p>
              </div>
              <div>
                <li className='font-medium'>Collecting Data</li>
                <p>
                  When you buy a product from us, we store your name, address,
                  contact and purchase information. We may use this information
                  to fulfill your order, occasionally send you marketing email,
                  and improve the user experience. All marketing communication
                  will contain an opt-out link to unsubscribe.
                </p>
              </div>
              <div>
                <li className='font-medium'>Sharing Data</li>
                <p>
                  We may share your personal information when required by law to
                  do so or to protect our rights if our Terms of Service are
                  suspected to be violated.
                </p>
              </div>
              <div>
                <li className='font-medium'>Payments</li>
                <p>
                  We never store your payment credentials on our servers. Credit
                  card and authorization service is provided by third-party
                  payment gateways and banks who adhere to standards set by
                  PCI-DSS as managed by the PCI Security Standards Council,
                  which is a joint effort of brands like Visa, MasterCard,
                  American Express and Discover.
                </p>
              </div>
              <div>
                <li className='font-medium'>Contact Information</li>
                <p>
                  Questions about the Terms of Service or Privacy Policy should
                  be directed to via email at tnzcreations1@gmail.com or via
                  phone on +919911083755.
                </p>
              </div>
              <div>
                <p>Last updated Aug 27, 2023.</p>
              </div>
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}

export default TOSComp
