import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GoogleadComponent from './GoogleadComponent';
import Loader from './Loader'; // Adjust the import path
import { getRoundData } from '../Firebase/Quiz';

const CongratPage = () => {
    const navigator = useNavigate();

    const [loading, setLoading] = useState(false);
    const { username,Category, round } = useParams()
    const [nextRoundData,setNextRound] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            let data = await getRoundData(Category, `Round${1 + +round}`);
            
            if(data != null){
                setNextRound(data);
            }
            else{ // next level is not present
                const userDetailsString = localStorage.getItem('UserDetails');
                const userDetails = JSON.parse(userDetailsString);

                // Remove the category key from userDetails
                delete userDetails[Category];

                // Convert the modified object back to a JSON string
                const modifiedUserDetailsString = JSON.stringify(userDetails);

                console.log(modifiedUserDetailsString);

            }
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };
      
        fetchData();
      }, [Category, round]);
      

    const handleOnClick = () => {
        let userDetails = JSON.parse(localStorage.getItem('UserDetails') || {})
        const updatedUserDetails = {
            ...userDetails,
            [Category]: { round:1+ +round, quiz:1}
          };
          localStorage.setItem('UserDetails', JSON.stringify(updatedUserDetails));
          console.log(localStorage.getItem('UserDetails'))
          navigator(`/${username}/${Category}/Quiz/${1 + +round}`)
    }
    const handleGoBack = () => {
        navigator(`/${username}/Categories`)    
        return true
    }

    return (
        <div className='h-full w-full flex flex-col items-center justify-center gap-4'>
            {loading ? <Loader /> : <p className='text-2xl text-creamWhite'>Congratulations {username}! You've completed the Round {round}.</p>}
            <div className='w-1/2 h-1/2 rounded-md bg-creamWhite'> 
              <GoogleadComponent/>           
            </div>
            <div className='flex flex-row gap-4'>

            {nextRoundData != null && <button onClick={handleOnClick} className="rounded bg-lightPurple hover:bg-[rgb(110,120,225)] px-4 py-2 mt-2 text-creamWhite">
                    Next Round
                </button>
                }
                <button onClick={handleGoBack} className="rounded bg-lightPurple hover:bg-[rgb(110,120,225)] px-4 py-2 mt-2 text-creamWhite">
                    Go To the Category
                </button>
            </div>
        </div>
    );
};

export default CongratPage;
