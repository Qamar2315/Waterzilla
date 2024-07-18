import React, { useContext, useEffect,useState } from 'react'
import EditAdmin from './components/Admin/EditAdmin';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function AdminProfile() {
    let navigate=useNavigate();
    const {authState}= useContext(AuthContext);
    const [adminData,setAdminData]= useState("");
    const [adminAddress,setAdminAddress]= useState("");
    const [adminAccount,setAdminAccount]= useState("");
    const [active,setActive]= useState();
    useEffect(()=>{
        if(authState.status && authState.isAdmin){
            axios.get(`http://localhost:8080/admin/profile`).then((res)=>{
                setAdminData(res.data.admin);
                setAdminAddress(res.data.address);
                setAdminAccount(res.data.account);
            })
        }else{
            navigate('/admin/login');
        }
    },[]);
    const setActiveState=()=>{
        if(active === ""){
            setActive("edit")
        }else{
            setActive("")
        }
    }
  return (
    <>
    <div className='flex justify-between'>
        <div className='text-2xl'>AdminProfile</div>
        <Link className='text-xl hover:text-zinc-200' to={'/admin/dashboard/viewdashboard'}>Go back to admin dashboard</Link>
    </div>
    <div>
        <section className='flex flex-row'>
                {adminData && <div className='ml-5'>
                    <br />
                    <h2>Name: {adminData.name}</h2>
                    <h2>Username: {adminAccount && <>{adminAccount.username}</>}</h2>
                    <h2>Age: {adminData.age}</h2>
                    <h2>Gender: {adminData.gender}</h2>
                    <h2>Cnic: {adminData.cnic}</h2>
                    <h2>Phone: {adminData.phone}</h2>
                    <h2>Email: {adminData.email}</h2>
                    <h1>Address: </h1>
                    {
                        adminAddress && 
                        <>
                            <h2>House No: {adminAddress.houseNo}</h2>
                            <h2>City: {adminAddress.city}</h2>
                            <h2>Street No: {adminAddress.streetNo}</h2>
                            <h2>Zipcode: {adminAddress.zipCode}</h2>
                        </>
                    }
                    <button className='btn btn-outline btn-info btn-sm mt-5' onClick={setActiveState}>edit info</button>
                </div>}
                <div>
                    {
                        active==="edit" && <EditAdmin/>
                    }

                </div>
            </section>
            {/* <Outlet/> */}
        </div>
    </>
  )
}

export default AdminProfile