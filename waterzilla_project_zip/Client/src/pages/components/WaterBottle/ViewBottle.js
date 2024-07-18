import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import EditBottle from './EditBottle';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../helpers/AuthContext';

function ViewBottle() {
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();
    const [bottleData, setBottleData] = useState("");
    const [active, setActive] = useState();
    let { id } = useParams();
    useEffect(() => {
        if (authState.status && authState.isAdmin) {
            axios.get(`http://localhost:8080/admin/dashboard/waterbottle/${id}`).then((res) => {
                if( res.data.bottle.Company){
                    setBottleData(res.data.bottle);
                }else{
                    res.data.bottle.id=res.data.bottle._id;
                    res.data.bottle.Company=res.data.bottle.company;
                    setBottleData(res.data.bottle)
                }
            })
        } else {
            navigate('/admin/login');
        }
    }, []);
    const setActiveState = () => {
        if (active === "") {
            setActive("edit")
        } else {
            setActive("")
        }
    }

    const deleteBottle = () => {
        axios.delete(`http://localhost:8080/admin/dashboard/waterbottle/${id}`).then((res) => {
            navigate('/admin/dashboard/waterbottle')
        })
    }
    return (
        <div>
            {bottleData &&
                <section className='flex flex-row'>
                    <div className='ml-5 w-1/3'>
                        <div>
                            <h1 className='text-2xl'>{bottleData.name}</h1>
                            <h2 className='p-2 mt-2'>Price: {bottleData.price}</h2>
                            <h2 className='p-2'>Quantity: {bottleData.quantity}</h2>
                            <h2 className='p-2'>Size: {bottleData.size}</h2>
                            <h2 className='p-2'>Company: {bottleData.Company.name}</h2>
                            <div className='flex justify-around w-100 mt-5'>
                                <button className='btn btn-outline btn-info btn-sm' onClick={setActiveState}>edit bottle</button>
                                <button className='btn btn-outline btn-error btn-sm' onClick={deleteBottle}>delete bottle</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {
                            active === "edit" && <EditBottle id={bottleData.id} />
                        }

                    </div>
                </section>
            }
            <Outlet />
        </div>
    )
}

export default ViewBottle