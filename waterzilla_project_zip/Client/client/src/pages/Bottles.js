import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Bottles() {
    const { authState } = useContext(AuthContext);
    const navigate= useNavigate();
    let [listOfBottles, setListOfBottles] = useState([])
    useEffect(() => {
        if (authState.status && authState.isAdmin === false) {
            axios.get("http://localhost:8080/admin/dashboard/waterbottle").then((res) => {
                if(res.data.bottles[0].id){
                    setListOfBottles(res.data.bottles);
                }else{
                    res.data.bottles.map((value,key)=>{
                        value.id=value._id;
                    })
                    setListOfBottles(res.data.bottles);
                }
            })
        }else{
            navigate('/login')
        }
    }, [])
    const buy = (bid) => {
        navigate(`/checkout/${bid}`);
    }
    return (
        <>
            <div className='w-100 flex justify-center'>
                <div>
                    {
                        listOfBottles.map((value, key) => {
                            return (
                                <>
                                    <div className="card w-96 bg-base-100 glass shadow-xl mt-10">
                                        <figure><img src={value.image} alt="Shoes" /></figure>
                                        <div className="card-body">
                                            <h2 className="card-title">{value.name}</h2>
                                            <p>Rs. {value.price}</p>
                                            <p>{value.quantity > 0 ? 'Qty.' + value.quantity : 'out of stock'}</p>
                                            <div className="card-actions justify-end">
                                                {
                                                    value.quantity === 0 ? (
                                                        <button className="btn btn-primary" disabled> Buy Bottle </button>
                                                    ) : (
                                                        <button onClick={()=>{buy(value.id,authState.id)}} className="btn btn-primary" > Buy Bottle </button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Bottles