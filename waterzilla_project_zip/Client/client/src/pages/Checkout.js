import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Checkout() {
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();
    const [bottleData, setBottleData] = useState("");
    const [reviews, setReviews] = useState("");
    const [review, setReview] = useState("");
    let { id } = useParams();
    useEffect(() => {
        if (authState.status && authState.isAdmin === false) {
            axios.get(`http://localhost:8080/admin/dashboard/waterbottle/${id}`).then((res) => {
                if(res.data.bottle.Company){
                    setBottleData(res.data.bottle);
                }else{
                    res.data.bottle.id = res.data.bottle._id;
                    res.data.bottle.Company = res.data.bottle.company;
                    setBottleData(res.data.bottle);
                }
            })
            axios.get(`http://localhost:8080/reviews/${id}`).then((res) => {
                setReviews(res.data.reviews);
            })

        } else {
            navigate('/admin/login')
        }
    }, []);
    const placeOrder = () => {
        axios.post(`http://localhost:8080/checkout/${id}`, { cid: authState.id, username: authState.username }).then((res) => {
            if (res.data.success) {
                navigate('/home')
                alert('you order has been placed succesfully')
            } else {
                alert("cannot place order try again")
            }
        })
    }
    const sReview = () => {
        axios.post(`http://localhost:8080/reviews`, { uid: authState.id, description: review, bid: bottleData.id }).then((res) => {
            const reviewToAdd={description: review, Customer:{name:authState.username} };
            setReviews([...reviews, reviewToAdd]);
        })
    }
    const dReview = (id) => {
        axios.delete(`http://localhost:8080/reviews/${id}`).then((res) => {
            {
                setReviews(reviews.filter((val) => {
                    return val.id != id;
                }));
            }
        })
    }
    return (
        <>
            <div className='flex'>
                <div className='ml-5 w-1/2 mt-10 flex justify-center'>
                    {bottleData && <div>
                        <img src={bottleData.image} width={150} alt="" />
                        <h1 className='text-2xl'>{bottleData.name}</h1>
                        <h2 className='p-2'>Quantity: {bottleData.quantity}</h2>
                        <h2 className='p-2'>Size: {bottleData.size}</h2>
                        <h2 className='p-2'>Company: {bottleData.Company.name}</h2>
                        <h2 className='p-2 mt-2'>Total: {bottleData.price}</h2>
                        <div className='flex justify-around w-100 mt-5'>
                            <button className='btn btn-outline btn-info btn-sm' onClick={placeOrder}>Place Order</button>
                        </div>
                    </div>}
                </div>
                {
                    reviews && <div>
                        <h1 className='mt-10 text-2xl'>Reviews:</h1>
                        <div className='overflow-y-auto h-80 w-full bg-slate-800 rounded mt-2 shadow-lg shadow-slate-900'>
                            {
                                reviews.map((value, key) => {
                                    return (
                                        <div className='m-2'>
                                            <h2 >{value.Customer.name}</h2>
                                            <div className='flex'>
                                                <p className='text-sm'>{value.description}</p>
                                                {value.CustomerId +1 === authState.id &&
                                                    <button onClick={() => { dReview(value.id) }} className='btn btn-outline btn-error btn-sm ml-3'>delete</button>
                                                }
                                            </div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='mt-5'>
                            <input onChange={(e) => { setReview(e.target.value) }} className='ml-2' type="text" />
                            <button onClick={sReview} className='btn btn-outline btn-info btn-sm ml-3' >submit</button>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}


export default Checkout;
