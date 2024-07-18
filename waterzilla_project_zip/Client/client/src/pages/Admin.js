import React, { useEffect, useState,useContext } from 'react'
import { AuthContext } from '../helpers/AuthContext';
import {useNavigate} from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Admin() {
    const {authState,setAuthState}=useContext(AuthContext);
    const [isActiveOne,setIsActiveOne]=useState();
    const [isActiveTwo,setIsActiveTwo]=useState();
    const [isActiveThree,setIsActiveThree]=useState();
    const [isActiveFour,setIsActiveFour]=useState();
    const [isActiveFive,setIsActiveFive]=useState();
    const [isActiveSix,setIsActiveSix]=useState();
    const [isActiveSeven,setIsActiveSeven]=useState();
    const [isActiveEight,setIsActiveEight]=useState();

    let navigate= useNavigate();
    useEffect(()=>{
        if(!(authState.isAdmin && authState.status)){
            navigate('/admin/login')
        }
    },[])
    const logout= ()=>{
        setAuthState({
            username:"",
            id:0,
            status:false,
            isAdmin:false
        });
        navigate('/admin/login');
    }
    const toggleOne=()=>{
        navigate("/admin/dashboard/viewDashboard")
        setIsActiveOne('bg-purple-700 text-white')
        setIsActiveTwo("")
        setIsActiveThree("")
        setIsActiveFour("")
        setIsActiveFive("")
        setIsActiveSix("")
        setIsActiveSeven("")
        setIsActiveEight("")
    }
    const toggleTwo=()=>{
        navigate("/admin/dashboard/waterbottle")
        setIsActiveOne('')
        setIsActiveTwo("bg-purple-700 text-white")
        setIsActiveThree("")
        setIsActiveFour("")
        setIsActiveFive("")
        setIsActiveSix("")
        setIsActiveSeven("")
        setIsActiveEight("")
    }
    const toggleThree=()=>{
        navigate("/admin/dashboard/company")
        setIsActiveOne('')
        setIsActiveTwo("")
        setIsActiveThree("bg-purple-700 text-white")
        setIsActiveFour("")
        setIsActiveFive("")
        setIsActiveSix("")
        setIsActiveSeven("")
        setIsActiveEight("")
    }
    const toggleFour=()=>{
        navigate("/admin/dashboard/pages")
        setIsActiveOne('')
        setIsActiveTwo("")
        setIsActiveThree("")
        setIsActiveFour("bg-purple-700 text-white")
        setIsActiveFive("")
        setIsActiveSix("")
        setIsActiveSeven("")
        setIsActiveEight("")
    }
    const toggleFive=()=>{
        navigate("/admin/dashboard/notifications")
        setIsActiveOne('')
        setIsActiveTwo("")
        setIsActiveThree("")
        setIsActiveFour("")
        setIsActiveFive("bg-purple-700 text-white")
        setIsActiveSix("")
        setIsActiveSeven("")
        setIsActiveEight("")
    }
    const toggleSix=()=>{
        navigate("/admin/dashboard/orders")
        setIsActiveOne('')
        setIsActiveTwo("")
        setIsActiveThree("")
        setIsActiveFour("")
        setIsActiveFive("")
        setIsActiveSix("bg-purple-700 text-white")
        setIsActiveSeven("")
        setIsActiveEight("")
    }

    const toggleSeven=()=>{
        navigate("/admin/dashboard/customers")
        setIsActiveOne('')
        setIsActiveTwo("")
        setIsActiveThree("")
        setIsActiveFour("")
        setIsActiveFive("")
        setIsActiveSix("")
        setIsActiveSeven("bg-purple-700 text-white")
        setIsActiveEight("")
    }
    const toggleEight=()=>{
        navigate("/admin/dashboard/reports")
        setIsActiveOne('')
        setIsActiveTwo("")
        setIsActiveThree("")
        setIsActiveFour("")
        setIsActiveFive("")
        setIsActiveSix("")
        setIsActiveSeven("")
        setIsActiveEight("bg-purple-700 text-white")
    }
  return (
    <>  
    <div>
        <div className='flex justify-between'>
            <div>
                <img src="" alt="" width={50} />
                <div className='text-2xl'>Admin Panel</div>
            </div>
            <div className='w-1/3 flex justify-around'>
                <Link to={'/admin/profile'}><button className='btn btn-sm text-xs'>Profile</button></Link>
                <Link to={'/admin/settings'}><button className='btn btn-sm text-xs'>Settings </button></Link>
                <button className='btn btn-sm text-xs' onClick={logout}>Logout</button>
            </div>
        </div>
        <div className='ml-10 w-full'>
            <br />
            <ul className='menu menu-horizontal bg-base-100 rounded-box'>
                <li className={`${isActiveOne}`} onClick={toggleOne}> <a> Dashboard</a> </li>
                <li className={`${isActiveTwo}`} onClick={toggleTwo} ><a> Water Bottle Info</a></li>
                <li className={`${isActiveThree}`} onClick={toggleThree}><a>Company Info</a></li>
                <li className={`${isActiveFour}`} onClick={toggleFour}><a>Pages</a></li>
                <li className={`${isActiveFive}`} onClick={toggleFive}><a>Notifications</a></li>
                <li className={`${isActiveSix}`}  onClick={toggleSix}><a>Orders Management</a></li>
                <li className={`${isActiveSeven}`}  onClick={toggleSeven}><a>Customers Info</a></li>
                <li className={`${isActiveEight}`}  onClick={toggleEight}><a>Reports</a></li>
            </ul>
        </div>
    </div>
    <Outlet/>
    </>
  )
}

export default Admin;