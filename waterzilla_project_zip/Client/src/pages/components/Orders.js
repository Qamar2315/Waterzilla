import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';

function Orders() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [orders, setOrders] = useState();
  useEffect(() => {
    if (authState.status && authState.isAdmin) {
      axios.get('http://localhost:8080/admin/dashboard/orders').then((res) => {
        if (res.data.orders[0].id) {
          setOrders(res.data.orders);
        } else {
          res.data.orders.map((value, key) => {
            value.id = value._id;
          })
          setOrders(res.data.orders);
        }
      })
    } else {
      navigate('/admin/login');
    }
  }, [])
  return (
    <>
      <div className='ml-5 mt-4'>
        <h1 className='text-2xl'>Order Management Section</h1>
        <div className='overflow-y-auto h-80 mt-3'>
          {orders &&
            <div>
              <h1 className='text-xl text-zinc-200'>Total Orders: {orders.length}</h1>
              <h2 className='text-green-400 mt-4'>New Orders:</h2>
              <ul>
                {
                  orders.map((values, key) => {
                    return (
                      values.status === "new" &&
                      <div className='bg-green-800 rounded shadow-lg shadow-slate-900 flex w-1/2 justify-between mt-2 p-2'>
                        <Link to={`/admin/dashboard/orders/${values.id}`} ><li>OrderId: {values.id} {values.Bottle.name} Ordered By: {values.Customer.name} <button className='btn btn-sm ml-5 btn-outline btn-success'>view</button></li></Link>
                      </div>
                    )
                  })
                }
              </ul>
              <h2 className='text-blue-400 mt-4'>Accepted Orders:</h2>
              <ul>
                {
                  orders.map((values, key) => {
                    return (
                      values.status === "accepted" &&
                      <div className='bg-blue-800 rounded shadow-lg shadow-slate-900 flex w-1/2 justify-between mt-2 p-2'>
                        <Link to={`/admin/dashboard/orders/${values.id}`} ><li>OrderId: {values.id} {values.Bottle.name} Ordered By: {values.Customer.name} <button className='btn btn-sm ml-5 btn-outline btn-info'>view</button></li></Link>
                      </div>
                    )
                  })
                }
              </ul>
              <h2 className='text-orange-400 mt-4'>Delivered Orders:</h2>
              <ul>
                {
                  orders.map((values, key) => {
                    return (
                      values.status === "delivered" &&
                      <div className='bg-orange-800 rounded shadow-lg shadow-slate-900 flex w-1/2 justify-between mt-2 p-2'>
                        <h1></h1>
                        <Link to={`/admin/dashboard/orders/${values.id}`} ><li>OrderId: {values.id} {values.Bottle.name} Ordered By: {values.Customer.name} <button className='btn btn-sm ml-5 btn-outline btn-warning'>view</button> </li></Link>
                      </div>
                    )
                  })
                }
              </ul>
              <h2 className='text-red-500 mt-2'>Cancelled Orders:</h2>
              <ul>
                {
                  orders.map((values, key) => {
                    return (
                      values.status === "cancelled" &&
                      <div className='bg-red-800 rounded shadow-lg shadow-slate-900 flex w-1/2 justify-between mt-2 p-2'>
                        <Link to={`/admin/dashboard/orders/${values.id}`} ><li>OrderId: {values.id} {values.Bottle.name} Ordered By: {values.Customer.name} <button className='btn btn-sm ml-5 btn-outline btn-error'>view</button></li></Link>
                      </div>
                    )
                  })
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Orders