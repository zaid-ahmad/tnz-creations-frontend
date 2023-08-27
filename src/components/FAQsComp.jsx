import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.svg'

function FAQsComp() {
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
      <section className='bg-[#1D1D1D] text-gray-100 py-36'>
        <div className='container flex flex-col justify-center p-4 mx-auto md:p-8'>
          <h2 className='mb-12 text-4xl font-bold leadi text-center sm:text-5xl'>
            Frequently Asked Questions
          </h2>
          <div className='flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-700'>
            <details>
              <summary className='py-2 outline-none cursor-pointer focus:underline'>
                What are the shipping charges?
              </summary>
              <div className='px-4 pb-4'>
                <p>
                  Shipping is FREE for all orders above Rs 499. <br />
                </p>
              </div>
            </details>
            <details>
              <summary className='py-2 outline-none cursor-pointer focus:underline'>
                Can I return this product?
              </summary>
              <div className='px-4 pb-4'>
                <p>
                  Please write to us on{' '}
                  <a
                    href='mailto:tnzcreations1@gmail.com'
                    className='underline'
                  >
                    tnzcreations1@gmail.com
                  </a>
                  <span> </span> for initiating a return.
                </p>
              </div>
            </details>
            <details>
              <summary className='py-2 outline-none cursor-pointer focus:underline'>
                Can I cancel after purchase?
              </summary>
              <div className='px-4 pb-4 space-y-2'>
                <p>
                  Orders once placed{' '}
                  <a href='https://tnzcreations.com' className='underline'>
                    www.tnzcreations.com
                  </a>
                  <span> </span>through cannot be cancelled and no refunds will
                  be made once an order has been successfully placed.
                </p>
              </div>
            </details>
            <details>
              <summary className='py-2 outline-none cursor-pointer focus:underline'>
                What is the best way to contact you?
              </summary>
              <div className='px-4 pb-4 space-y-2'>
                <p>
                  For any general queries regarding our products pricing or
                  website, feel free to call us or send a Whatsapp message at
                  9911083755. To report damages, quality issues or request a
                  return please email us at{' '}
                  <a
                    href='mailto:tnzcreations1@gmail.com'
                    className='underline'
                  >
                    tnzcreations1@gmail.com
                  </a>
                  <span> </span>. We are available from Monday to Saturday from
                  9am to 6pm.
                </p>
              </div>
            </details>
            <details>
              <summary className='py-2 outline-none cursor-pointer focus:underline'>
                What are your terms and conditions?
              </summary>
              <div className='px-4 pb-4 space-y-2'>
                <p>
                  For the detailed list of our terms and conditions, please{' '}
                  <a
                    href='https://tnzcreations.com/terms-of-service'
                    className='underline'
                  >
                    click here
                  </a>
                  .
                </p>
              </div>
            </details>
            <details>
              <summary className='py-2 outline-none cursor-pointer focus:underline'>
                How can I track my order?
              </summary>
              <div className='px-4 pb-4 space-y-2'>
                <p>
                  Once your order has been dispatched you would receive an email
                  or SMS notification with the tracking information.
                  <br /> <br />
                  If you face any difficulty finding the tracking information,
                  please feel free to contact us via email or Whatsapp.
                </p>
              </div>
            </details>
            <details>
              <summary className='py-2 outline-none cursor-pointer focus:underline'>
                Do you deliver products outside India?
              </summary>
              <div className='px-4 pb-4 space-y-2'>
                <p>
                  No, currently we only deliver packages within India and might
                  launch export to nearby markets in the future.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQsComp
