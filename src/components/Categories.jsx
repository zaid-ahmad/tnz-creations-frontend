import PlanterStandImg from '../assets/cat-cover/img1.png'
import HangingPlanterImg from '../assets/cat-cover/img2.png'
import WateringCanImg from '../assets/cat-cover/img3.png'
import MetalPlanterImg from '../assets/cat-cover/img4.png'
import TableTopPlanterImg from '../assets/cat-cover/img5.png'
import WallMountedImg from '../assets/cat-cover/img6.png'
import JutePlantPotImg from '../assets/cat-cover/img7.png'
import BirdFeederImg from '../assets/cat-cover/img8.png'
import HangingBirdImg from '../assets/cat-cover/img9.png'
import GardenStickImg from '../assets/cat-cover/img10.png'
import GardenMiniatureImg from '../assets/cat-cover/img11.png'
import ToolImg from '../assets/cat-cover/img12.png'
import CandleStImg from '../assets/cat-cover/img13.png'
import LanternImg from '../assets/cat-cover/img14.png'
import ChimesImg from '../assets/cat-cover/img15.png'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function Categories() {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get('/api/categories')
      .then((response) => {
        if (response.status === 200) {
          const responseData = response.data
          setCategories([...responseData])
        }
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const handleCategoryClick = (categoryId) => {
    // Navigate to the Shop page with the selected category as a query parameter
    navigate(`/shop?categories=${categoryId}`)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <div className='container md:p-24 py-16'>
        <h2 className='text-2xl font-medium text-gray-800 uppercase mb-6'>
          shop by category
        </h2>
        <div className='flex flex-col md:grid md:grid-cols-3 gap-3'>
          {categories.map((category) => {
            let image

            switch (category.name) {
              case 'Planter Stand with Pots':
                image = PlanterStandImg
                break

              case 'Hanging Planters':
                image = HangingPlanterImg
                break

              case 'Watering Cans':
                image = WateringCanImg
                break

              case 'Metal Planters':
                image = MetalPlanterImg
                break

              case 'Table Top Planters':
                image = TableTopPlanterImg
                break

              case 'Wall Mounted Stands':
                image = WallMountedImg
                break

              case 'Jute Plant Pots':
                image = JutePlantPotImg
                break

              case 'Bird Feeders':
                image = BirdFeederImg
                break

              case 'Hanging Birds':
                image = HangingBirdImg
                break

              case 'Garden Sticks':
                image = GardenStickImg
                break

              case 'Garden Tray Miniatures':
                image = GardenMiniatureImg
                break

              case 'Garden Tool Set':
                image = ToolImg
                break

              case 'Candle Stand':
                image = CandleStImg
                break

              case 'Lanterns':
                image = LanternImg
                break

              case 'Chimes':
                image = ChimesImg
                break
            }
            return (
              <div
                className='relative rounded overflow-hidden'
                key={category._id}
                onClick={() => handleCategoryClick(category.name)}
              >
                <img src={image} alt='category 1' className='w-full' />
                <p className='cursor-pointer absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-2xl text-center text-white font-roboto font-medium group-hover:bg-opacity-60 transition'>
                  {category.name}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Categories
