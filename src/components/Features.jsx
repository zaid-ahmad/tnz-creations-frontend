import shipping from '../assets/images/icons/delivery-van.svg'
import money from '../assets/images/icons/money-back.svg'
import customer from '../assets/images/icons/service-hours.svg'

function Features() {
  return (
    <>
      <div className='container py-7'>
        <div className='w-full flex flex-col md:flex-row gap-6 mx-auto justify-center md:px-32'>
          <div className='border border-primary rounded px-3 py-6 flex justify-center items-center gap-5 w-full'>
            <img
              src={shipping}
              alt='Delivery'
              className='w-12 h-12 object-contain'
            />
            <div>
              <h4 className='font-medium capitalize text-lg'>Free Shipping</h4>
              <p className='text-gray-500 text-sm'>Order over ₹499</p>
            </div>
          </div>
          <div className='border border-primary rounded px-3 py-6 flex justify-center items-center gap-5 w-full'>
            <img
              src={money}
              alt='Delivery'
              className='w-12 h-12 object-contain'
            />
            <div>
              <h4 className='font-medium capitalize text-lg'>Money Returns</h4>
              <p className='text-gray-500 text-sm'>30 days money return</p>
            </div>
          </div>
          <div className='border border-primary rounded px-3 py-6 flex justify-center items-center gap-5 w-full'>
            <img
              src={customer}
              alt='Delivery'
              className='w-12 h-12 object-contain'
            />
            <div>
              <h4 className='font-medium capitalize text-lg'>24/7 Support</h4>
              <p className='text-gray-500 text-sm'>Customer support</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Features
