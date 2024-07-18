import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';

function Customers() {
  const navigate=useNavigate();
  const {authState}= useContext(AuthContext);
  const [customers,setCustomers]=useState();
  useEffect(()=>{
    if(authState.status && authState.isAdmin){
      axios.get('http://localhost:8080/admin/dashboard/customers').then((res)=>{
      if(res.data.customers[0].id){
        setCustomers(res.data.customers);
      }else{
        res.data.customers.map((value,key)=>{
          value.id=value._id;
        })
        setCustomers(res.data.customers);
      }
    })
    }else{
            navigate('/admin/login')
      }
  },[]) 
  return (
    <>
    <div className='ml-5'>
      {
        customers && 
        <div>
          <br />
          <h1 className='text-2xl'>Customers</h1>
          <ol className='overflow-y-auto h-80 mt-3'>
            {
              customers.map((values,key)=>{
                return (
                  <div>
                    <Link className='hover:text-zinc-200' to={`/admin/dashboard/customers/${values.id}`} ><li>{key+1}- {values.name} </li></Link> 
                  </div>
                )
              })
            }
          </ol>
        </div>
      }
      </div>
    </>
  )
}
export default Customers;