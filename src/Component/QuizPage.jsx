import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getQuizData, checkQuizAnswer } from '../Firebase/Quiz';
import Loader from './Loader';
import { set } from 'firebase/database';
const QuizPage = () => {

  const { username, round, Category } = useParams()
  const navigator = useNavigate();
  const [quizDetails, setQuizDetails] = useState(null)
  const [question, setQuestion] = useState({ 'Question': '', Option: ['', '', '', ''] })
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('UserDetails'));
      if (user) {
        const reqCategory = user[Category];
        if (reqCategory) {
          if (reqCategory.round) {
            if (round == reqCategory.round) {
              const { quizDetails, quizData } = await getQuizData(Category, reqCategory.round, reqCategory.quiz);
              setQuizDetails(quizDetails);
              setQuestion(quizData);
            } else { // if user in the wrong round
              let url = `/${username}/${Category}/Quiz/${reqCategory.round}`;
              navigator(url);
            }
          }
          else {
            navigator(`/${username}/Categories`);
          }
        } else {
          navigator(`/${username}/Categories`);
        }
      } else {
        navigator('/');
      }
      setLoading(false);
    };

    fetchData();
  }, [Category, round, username]);

  const handleOptionClick = async (item) => {
    setLoading(true)
    if (!selectedOption) {
      setSelectedOption(item);
      console.log(quizDetails['Current Question'])
      const res = await checkQuizAnswer(username,Category, round, quizDetails['Current Question'], item); // Pass 'item' instead of 'selectedOption'
      const { correct } = res;
      setCorrectOption(correct);
      if (quizDetails['Current Question'] === quizDetails['Total Question'])
        setTimeout(() => {
          navigator(`/${username}/Complete/${Category}/${round}`)
        }, 3000)
    }
    setLoading(false)
  };


  const getColor = (item) => {
    if (item == correctOption) {
      return 'bg-[#28a745] text-creamWhite'
    }
    else {
      if (item == selectedOption && item != correctOption) {
        return 'bg-danger text-creamWhite'
      }
      else { return '' }
    }
  }

  const resetPage = () => {

    setQuizDetails(null)
    setQuestion({ 'Question': '', Option: ['', '', '', ''] })
    setSelectedOption(null);
    setCorrectOption(null);
  }
  const updateUserDetails = (quizNum) => {
    let userDetails = {}
    userDetails = JSON.parse(localStorage.getItem('UserDetails') || {})
    const updatedUserDetails = {
      ...userDetails,
      [Category]: { round: round, quiz: quizNum }
    };
    localStorage.setItem('UserDetails', JSON.stringify(updatedUserDetails));
  }
  const handleOnNext = async () => {
    if (selectedOption == null) {
      return
    }

    setLoading(true)
    console.log(quizDetails['Current Question'] + 1 <= quizDetails['Total Question'])
    if (quizDetails['Current Question'] + 1 <= quizDetails['Total Question']) {
      resetPage()
      console.log('Req :' + (quizDetails['Current Question'] + 1))
      const NextQuestion = await getQuizData(Category, round, quizDetails['Current Question'] + 1)
      updateUserDetails(quizDetails['Current Question'] + 1)


      setQuizDetails(NextQuestion['quizDetails'])
      setQuestion(NextQuestion['quizData'])

      console.log(NextQuestion)
    }
    setLoading(false)
  }

  return (
    <div className='w-[90%] h-2/3 sm:w-1/2 rounded-xl sm:h-2/3 flex justify-center items-center bg-creamWhite'>
      <div className='w-[80%] h-[90%] mt-4 text-darkBlue rounded-md flex flex-col'>
        {loading ? <Loader /> : ''}
        <div className='h-[20%] flex flex-col  py-auto font-bold'>
          <p className=' text-2xl mb-2'>{Category} Quiz Question</p>
          <p className=' text-xl '>Round {round}</p>
        </div>
        <div className='h-[80%] my-auto'>
          <div id='Question' className='mb-2'>
            <span className={` text-xl font-semibold`}> Q # {quizDetails && quizDetails['Current Question']}. </span><span className={`${question['Question'] === '' ? 'bg-gray-200' : ''}`}> {question['Question']} </span>
          </div>
          <div id='options' className='flex flex-col gap-2'>
            {question &&
              question['Option'] &&
              question['Option'].map((item, index) => (
                <div
                  key={index}
                  className={`w-full ${getColor(item)} ${selectedOption ? 'disable' : 'hover:bg-lightPurple hover:text-creamWhite'
                    }  flex justify-between border border-darkBlue rounded-xl  p-2 cursor-pointer`}
                >
                  <label htmlFor=''>
                    {index + 1}. {item}
                  </label>
                  <input
                    type='radio'
                    value=''
                    checked={item === selectedOption} // Set checked attribute
                    className={`${selectedOption || loading ? 'pointer-events-none' : ''}`}
                    onChange={() => {
                      handleOptionClick(item);
                    }}
                  />
                </div>
              ))}
          </div>
          <div className='flex flex-row justify-between'>
            <div className='flex items-center'>
              <span>Question: </span> {<span>{`${quizDetails && quizDetails['Current Question']}/${quizDetails && quizDetails['Total Question']}`}</span>}
            </div>
            {quizDetails && quizDetails['Current Question'] < quizDetails['Total Question'] && <button onClick={() => { handleOnNext() }} className={`rounded bg-lightPurple hover:bg-[rgb(110,120,225)]  px-4 py-2 mt-2 text-creamWhite`}
            >
              Next Ques.
            </button>
            }
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuizPage;
