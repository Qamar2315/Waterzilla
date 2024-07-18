import React from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Home() {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(AuthContext);
  
  return (
    <>
      <div className='flex justify-center pt-32'>
        <div className='text-center'>
          <h1 className='text-3xl'>Welcome To Waterzilla</h1>
          <p className='pt-5'>Best drinking water selling website</p>
          <Link to={'/bottles'}><button className='btn btn-outline btn-success btn-sm mt-5'>View Bottles</button></Link>
        </div>
      </div>
    </>

  )
}

export default Home;