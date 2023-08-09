function Footer() {
  return (
    <>
      <footer className='bg-white border-t-2 border-gray-100'>
        <div className='mx-auto w-full max-w-screen-xl '>
          <div className='flex justify-between px-4 py-6 lg:py-8 md:grid-cols-4'>
            <div>
              <h2 className='mb-6 text-sm font-medium text-gray-900 uppercase '>
                Shop
              </h2>
              <ul className='text-gray-500 dark:text-gray-400 font-thin'>
                <li className='mb-4'>
                  <a href='#' className=' hover:underline'>
                    View All Products
                  </a>
                </li>
                <li className='mb-4'>
                  <a href='#' className='hover:underline'>
                    Refund Policy
                  </a>
                </li>
                <li className='mb-4'>
                  <a href='#' className='hover:underline'>
                    Privacy Policy
                  </a>
                </li>
                <li className='mb-4'>
                  <a href='#' className='hover:underline'>
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='mb-6 text-sm font-medium text-gray-900 uppercase '>
                Quick Links
              </h2>
              <ul className='text-gray-500 dark:text-gray-400 font-thin'>
                <li className='mb-4'>
                  <a href='#' className='hover:underline'>
                    About
                  </a>
                </li>
                <li className='mb-4'>
                  <a href='#' className='hover:underline'>
                    Shipping Policy
                  </a>
                </li>
                <li className='mb-4'>
                  <a href='#' className='hover:underline'>
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className='mb-6 text-sm font-medium text-gray-900 uppercase '>
                Contact Us
              </h2>
              <div className='text-gray-500 dark:text-gray-400 font-thin'>
                <p className='text-gray-600 font-semibold'>TNZ Creations</p>
                <p className='text-sm pt-2 text-gray-600'>
                  tnzcreations1@gmail.com
                </p>
                <p className='text-sm pt-2 text-gray-600'>
                  St. 12, Zakir Nagar, Okhla, New Delhi, Delhi- 110025
                </p>
                <p className='text-sm pt-2 text-gray-600'>+91 9911083755</p>
              </div>
            </div>
            <div>
              <h2 className='mb-6 text-sm font-medium text-gray-900 uppercase '>
                Social
              </h2>
              <ul className='text-gray-500 dark:text-gray-400 font-thin'>
                <li className='mb-4'>
                  <a href='#' className='hover:underline'>
                    Facebook
                  </a>
                </li>
                <li className='mb-4'>
                  <a href='#' className='hover:underline'>
                    Instagram
                  </a>
                </li>
                <li className='mb-4'>
                  <a href='#' className='hover:underline'>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className='px-4 py-3 text-sm text-center text-gray-400'>
          © 2023 <a href='https://flowbite.com/'>TNZ Creations</a>. All Rights
          Reserved.
        </p>
      </footer>
    </>
  )
}

export default Footer
