import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../helpers/AuthContext';


function ViewOrder() {
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    const [order, setOrder] = useState();
    const [status, setStatus] = useState();
    const { id } = useParams();
    useEffect(() => {
        if (authState.status && authState.isAdmin) {
            axios.get(`http://localhost:8080/admin/dashboard/orders/${id}`).then((res) => {
                setOrder(res.data.orders)
            })
        } else {
            navigate('/admin/login')
        }
    }, [])
    const updateStatus = () => {
        axios.put(`http://localhost:8080/admin/dashboard/orders/${id}`, { status: status }).then((res) => {
            navigate('/admin/dashboard/orders');
        })
    }
    const deleteOrder = () => {
        axios.delete(`http://localhost:8080/admin/dashboard/orders/${id}`, { status: status }).then((res) => {
            navigate('/admin/dashboard/orders');
        })
    }
    return (
        <div className='ml-4'>
            {order &&
                <div>
                    <h1 className='text-2xl mt-10'>Order Details :</h1>
                    <div className='flex'>
                        <div className='w-1/3 mt-2'>
                            <h2>Order Id : {order.id}</h2>
                            <h2>Bottle Ordered : {order.Bottle.name}</h2>
                            <h2>Order Status : {order.status}</h2>
                            <h2>Ordered By : {order.Customer.name}</h2>
                        </div>
                        <div>
                            <h2 className='mt-4'>Delivery Address : </h2>
                            <h3>House: {order.Address.houseNo}</h3>
                            <h3>Street: {order.Address.streetNo}</h3>
                            <div className='flex'>
                                <h3>City: {order.Address.city}</h3>
                                <h3 className='ml-10'>ZipCode: {order.Address.zipCode}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div>
                <h1 className='text-2xl mt-4'>Update Order Status</h1>
                <div className='flex mt-4'>
                    <div className='w-1/3'>
                        <label className='text-xl' htmlFor="">New Status: </label>
                        <select className='ml-2' onChange={(event) => { setStatus(event.target.value) }}>
                            <option>new</option>
                            <option>accepted</option>
                            <option>cancelled</option>
                            <option>delivered</option>
                        </select>
                        <button className='btn btn-outline btn-sm btn-success ml-2' onClick={updateStatus}>Update Status</button>
                    </div>
                    <button className='btn btn-outline btn-error btn-sm' onClick={deleteOrder}>Delete Order</button>
                </div>
            </div>
        </div>
    )
}

export default ViewOrder