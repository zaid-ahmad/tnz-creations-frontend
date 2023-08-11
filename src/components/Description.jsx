/* eslint-disable react/prop-types */
function Description({ product }) {
  return (
    <>
      <div className='container pb-7 mt-24'>
        <h3 className=' font-roboto text-gray-800 pb-3 font-medium'>
          Product details
        </h3>
        <div className='w-3/5 pt-6'>
          <div className='text-gray-600'>{product.description}</div>

          <table className='table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6'>
            <tr>
              <th className='py-2 px-4 border border-gray-300 w-40 font-medium'>
                Color
              </th>
              {product.colors && (
                <th className='py-2 px-4 border border-gray-300 '>
                  {product.colors.join(', ')}
                </th>
              )}
            </tr>
            <tr>
              <th className='py-2 px-4 border border-gray-300 w-40 font-medium'>
                Size
              </th>
              {product.dimensions && (
                <th className='py-2 px-4 border border-gray-300 '>
                  {product.dimensions.join(' × ')} cm
                </th>
              )}
            </tr>
            <tr>
              <th className='py-2 px-4 border border-gray-300 w-40 font-medium'>
                Weight
              </th>
              <th className='py-2 px-4 border border-gray-300 '>
                {product.weight} kg
              </th>
            </tr>
          </table>
        </div>
      </div>
    </>
  )
}

export default Description
