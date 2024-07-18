import { Link } from 'react-router-dom'
import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';

function AdminSettings() {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");
  const data = {
    password: password
  }
  useEffect(() => {
    if (!(authState.isAdmin && authState.status)) {
      navigate('/admin/login')
    }
  }, [])
  const updatePassword = () => {
    if (rePassword === password) {
      setError("");
      axios.put("http://localhost:8080/admin/settings", data).then((res) => {
        if (res.data.error) {
          setError(res.data.error);
        } else {
          setPassword("")
          setRePassword("")
          navigate("/admin/settings");
        }
      })
    } else {
      setError("Error: password doesnot match re enter again")
    }
  }
  return (
    <>
      <div className='flex justify-between'>
        <div className='text-2xl'>AdminSettings</div>
        <Link className='text-xl hover:text-zinc-200' to={'/admin/dashboard/viewdashboard'}>Go back to admin dashboard</Link>
      </div>
      {
        error && <div>
          {error}
        </div>
      }
      <br />
      <section className='w-100 h-100 flex justify-center'>
        <div className='mt-32'>
          <div>
            <label className='text-xl text-zinc-200' htmlFor="password">New Password: </label>
            <input  className="input input-bordered input-warning w-full max-w-xs mt-2" name='password' value={password} type="password" placeholder='enter new password' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div mt-2>
            <label className='text-xl text-zinc-200' htmlFor="reenterpasword">Re enter Password: </label>
            <input  className="input input-bordered input-warning w-full max-w-xs mt-2" name='reenterpassword' value={rePassword} type="password" placeholder='re enter new password' onChange={(e) => setRePassword(e.target.value)} />
          </div>
          <div className='w-100 flex justify-center'>
            <button className='btn btn-outline btn-error btn-sm mr-8 mt-5' onClick={updatePassword}>Update Password</button>
          </div>
        </div>
      </section>
    </>
  )
}

export default AdminSettings