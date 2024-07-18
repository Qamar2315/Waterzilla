import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';

function Notifications() {
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState();
    useEffect(() => {
        if (authState.status && authState.isAdmin) {
            axios.get('http://localhost:8080/admin/dashboard/notifications').then((res) => {
                if(res.data.notifications[0].id){
                    setNotifications(res.data.notifications);
                }else{
                    res.data.notifications.map((value,key)=>{
                        value.id=value._id;
                    })
                    setNotifications(res.data.notifications);
                }
            })
        } else {
            navigate('/admin/login');
        }
    }, [])
    const clearAll = () => {
        axios.delete("http://localhost:8080/admin/dashboard/notifications").then((res) => {
            setNotifications([]);
        })
    }
    const deleteNoti = (id) => {
        axios.delete(`http://localhost:8080/admin/dashboard/notifications/${id}`).then(() => {
            setNotifications(notifications.filter((val) => {
                return val.id != id;
            }));
        })
    }
    return (
        <div className='ml-5'>
            <h1 className='text-2xl mt-3'>Notifications</h1>
            <button className='text-zinc-500 hover:text-zinc-300' onClick={clearAll}>clear all</button>
            <div className="overflow-y-auto h-80">
            {
                notifications &&
                <ul>
                    {
                        notifications.map((values, key) => {
                            return (
                                <div className='bg-slate-800 rounded shadow-lg shadow-slate-900 flex w-1/2 justify-between mt-4 p-3'>
                                    <h1>{values.notification}</h1>
                                    <button onClick={() => { deleteNoti(values.id) }}>X</button>
                                </div>
                            )
                        })
                    }
                </ul>
            }
            </div>
        </div>
    )
}

export default Notifications