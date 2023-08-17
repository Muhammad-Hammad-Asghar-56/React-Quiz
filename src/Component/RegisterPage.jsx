import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const navigator = useNavigate();


  useEffect(()=>{  // Tempory
    localStorage.setItem(
      'UserDetails',
      JSON.stringify({ username: 'Hammad', round: 1, quiz: 1 })
    );
  },[])

  const handleOnStart = () => {
    console.log('start');
    let user =JSON.parse(localStorage.getItem('UserDetails'))

    if (user && user.round && user.quiz) {
      let url =  '/Quiz/' + user.quiz + '/' 
      navigator(url)
    }
    else {
      localStorage.setItem(
        'UserDetails',
        JSON.stringify({ username: 'Hammad', round: 1, quiz: 1 })
      );
      navigator('/Quiz/1/')
    }
  }
  return (
    <div className='w-[90%] h-2/3  sm:w-1/2 rounded-xl sm:h-1/2 flex justify-center items-center bg-creamWhite'>
      <div className='w-[90%] h-[90%] sm:w-1/2 sm:h-2/3 text-darkBlue rounded-md'>
        <div className='flex flex-col items-center justify-center h-full'>
          <div className='text-center font-bold text-2xl my-8'>
            Quiz Game
          </div>
          <div className='w-full flex flex-col items-center gap-2'>
            <div className="relative w-full">
              <input
                type="text"
                id="floating_outlined"
                className="block px-2.5 pb-2.5 w-full pt-4 text-sm text-gray-900 rounded-lg border-1 border-darkBlue appearance-none focus:outline-none focus:ring-2 focus:ring-darkBlue peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-sm text-gray-500  duration-300 transform-translate-y-2 scale-75 top-2 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-darkBlue  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-2 left-1"
              >
                Enter the user Name
              </label>
            </div>
            <button onClick={handleOnStart} className="rounded bg-lightPurple hover:bg-[rgb(110,120,225)] px-4 py-2 mt-2 text-creamWhite">
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
