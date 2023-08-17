import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../Firebase/Quiz'
import { Link, useNavigate, useParams } from 'react-router-dom'


const CategoriesPage = () => {
  const [categories, setCategories] = useState(null)
  const { username } = useParams()
  const navigator = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const resCategories = await getAllCategories();
      setCategories(resCategories)
    }
    fetchCategories()
  }, [])


  const handleOnClick = (e) => {
    e.preventDefault()

    let userDetails = {}
    userDetails = JSON.parse(localStorage.getItem('UserDetails') || {})
    let clickedTitle = e.target.title;
    const requiredCategory = userDetails[clickedTitle]
    if (requiredCategory) {
      navigator(`/${username}/${clickedTitle}/Quiz/${requiredCategory['round']}`)
    }
    else {
      const updatedUserDetails = {
        ...userDetails,
        [clickedTitle]: { round: 1, quiz: 1 }
      };

      localStorage.setItem('UserDetails', JSON.stringify(updatedUserDetails));
      navigator(`/${username}/${clickedTitle}/Quiz/1`);
    }
  };

  return (
    <div className='w-[90%] min-h-2/3 sm:min-h-1/2 sm:w-1/2 rounded-xl flex justify-center items-center bg-creamWhite'>
      <div className='w-[90%] h-[90%] sm:w-2/3 sm:min-h-2/3 text-darkBlue rounded-md'>
        <div className='flex flex-col py-10 items-center justify-center w-full h-full'>
          <div className='text-center font-bold text-2xl my-8'>
            Categories
          </div>
          <div className='w-full flex flex-wrap items-center gap-2'>
            {
              categories && categories.map(item => (
                <Link title={item} onClick={handleOnClick} key={item} className=" p-6 border border-gray-200 text-darkBlue rounded-lg shadow hover:bg-lightPurple hover:text-creamWhite flex-grow">
                  <h5 title={item} className="mb-2 text-center font-bold tracking-tight">{item} </h5>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage
