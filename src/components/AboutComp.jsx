import { Link } from 'react-router-dom'

function AboutComp() {
  return (
    <>
      <section className='flex items-center bg-stone-100 xl:h-screen'>
        <div className='justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6'>
          <div className='flex flex-wrap'>
            <div className='w-full px-4 mb-10 w-fulll g:mb-0 '>
              <h2 className='mb-4 text-4xl font-semibold text-primary'>
                About Us
              </h2>
              <p className='mb-10 text-base leading-7 text-gray-500'>
                TNZ Creations producing contemporary custom planters and stand
                in high-quality steel galvanized sheet and metal rod iron for
                over 15 years. We also sell high quality garden decoration
                items. We can manufacture metal planters in different styles,
                shapes and sizes to fit any space.  Our products are appreciated
                for their features like prime finish, beautiful designs and
                antique appeal. Our organization has the basic motive to impress
                and attract consumers with correct and proper manufacturing of
                products using brilliant designing and creative ideas.The
                company has maintained its distinct identity and incomparable
                reputation because of the long lasting and eye-pleasing
                products. Explore our exquisite collection of handcrafted
                planters and garden decoration items that bring nature's
                beauty into your life.
              </p>
              <Link
                to={'/contact'}
                className='px-4 py-3 text-primary transition-all transform border border-primary rounded-3xl hover:bg-primary hover:text-gray-100'
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutComp
