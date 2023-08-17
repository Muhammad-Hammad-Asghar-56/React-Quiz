import React, { useState, useEffect } from 'react';
import Loader from './Loader'; // Adjust the import path

const CongratPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay before setting loading to false
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second delay

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {loading ? <Loader /> : <p>Congratulations! You've completed the quiz.</p>}
      <div className='w-full h-full flex justify-center items-center'> hi </div>
    </div>
  );
};

export default CongratPage;
