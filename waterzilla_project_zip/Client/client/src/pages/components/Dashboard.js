import React,{useState} from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
import { useContext } from 'react';
import Alert from './Alert';

function Dashboard() {
    const {authState,setAuthState}=useContext(AuthContext);
    const [dashboardInfo,setDashboardInfo]= useState({});
    const [message,setMessage]= useState();
    let navigate= useNavigate();
    
    useEffect(()=>{
        if(authState.status && authState.isAdmin){
            axios.get("http://localhost:8080/admin/dashboard").then((res)=>{
            setDashboardInfo(res.data);
        })
        }else{
            navigate('/admin/login');
        }
    },[])
  return (
    <>
    <br />
    <br />
    {dashboardInfo &&
    <>
    {
        message &&
        <div className='w-100 flex justify-center mb-10'>
            <div className='w-1/2'>
                <Alert message={message} />
            </div>
        </div>
    }
    <div className='flex justify-around w-100 mt-5'>
        <div className='w-30'>
            <div className="card bg-fuchsia-600 text-primary-content hover:bg-fuchsia-500">
                <div className="card-body">
                    <h2 className="card-title">Total Orders: {dashboardInfo.totalOrders}</h2>
                </div>
            </div>
        </div>
        <div className='w-30'>
            <div className="card bg-teal-600 text-primary-content hover:bg-teal-500">
                <div className="card-body">
                    <h2 className="card-title">Total New Orders: {dashboardInfo.totalNewOrders}</h2>
                </div>
            </div>
        </div>
        <div className='w-30'>
            <div className="card bg-amber-400 text-primary-content hover:bg-amber-300">
                <div className="card-body">
                    <h2 className="card-title">Total Accepted Orders: {dashboardInfo.totalAcceptedOrders}</h2>
                </div>
            </div>
        </div>
        <div className='w-30'>
            <div className="card bg-indigo-600 text-primary-content hover:bg-indigo-500">
                <div className="card-body">
                    <h2 className="card-title">Total Delivered Orders: {dashboardInfo.totalDeliveredOrders}</h2>
                </div>
            </div>
        </div>

    </div>
    <br></br>
    <div className='flex justify-around w-100 mt-5'>
        <div>
            <div className="card w-25 bg-red-500 text-primary-content hover:bg-red-400">
                <div className="card-body">
                    <h2 className="card-title">Total Cancelled Orders: {dashboardInfo.totalCancelledOrders}</h2>
                </div>
            </div>
        </div>
        <div>
            <div className="card w-25 bg-sky-400 text-primary-content hover:bg-sky-300">
                <div className="card-body">
                    <h2 className="card-title">Total Company: {dashboardInfo.totalCompanies}</h2>
                </div>
            </div>
        </div>
        <div>
            <div className="card w-25 bg-lime-500 text-primary-content hover:bg-lime-400">
                <div className="card-body">
                    <h2 className="card-title">Total Registered Customers: {dashboardInfo.totalCustomers}</h2>
                </div>
            </div>
        </div>
        <div>
            <div className="card w-25 bg-green-600 text-primary-content hover:bg-green-500">
                <div className="card-body">
                    {
                        dashboardInfo.totalSales &&
                        <h2 className="card-title">Total Sales: Rs.{dashboardInfo.totalSales.total_sale}</h2>
                    }
                </div>
            </div>
        </div>
    </div>
    </>
    }
    <Outlet/>
    </>
  )
}

export default Dashboard