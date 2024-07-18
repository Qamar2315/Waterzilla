import React, { useContext, useEffect, useState } from 'react'
import EditCustomer from './EditCustomer';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../../helpers/AuthContext';
import { reach } from 'yup';

function ViewCustomer() {
    const { authState } = useContext(AuthContext)
    let navigate = useNavigate();
    const [customerData, setCustomerData] = useState("");
    // const [customerProfileData,setCustomerProfileData]= useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [customerAccount, setCustomerAccount] = useState("");
    const [active, setActive] = useState();
    let { id } = useParams();
    useEffect(() => {
        if (authState.status && authState.isAdmin) {
            axios.get(`http://localhost:8080/admin/dashboard/customers/${id}`).then((res) => {
                if(res.data.customer._id){
                    res.data.customer.id=res.data.customer._id;
                    res.data.address.id=res.data.address._id;
                    res.data.account.id=res.data.account._id;
                    res.data.customer.User=res.data.customer.user;
                }
                setCustomerData(res.data.customer);
                setCustomerAddress(res.data.address);
                setCustomerAccount(res.data.account);
            })
        } else {
            navigate('/admin/login')
        }

    }, []);
    const setActiveState = () => {
        if (active === "") {
            setActive("edit")
        } else {
            setActive("")
        }
    }
    const deleteCustomer = () => {
        axios.delete(`http://localhost:8080/admin/dashboard/customers/${id}`).then((res) => {
            navigate('/admin/dashboard/customers')
        })
    }
    return (
        <>
            <div>
                <section className='flex'>
                    {customerData && <div className='w-1/3 ml-3'>
                        <h1 className='text-2xl'>Customer Details</h1>
                        <img width={100} src={customerData.profilePic} alt="" />
                        <h1>Customer Id: {customerData.id}</h1>
                        <h2>Name: {customerData.name}</h2>
                        <h2>Username: {customerAccount && <>{customerAccount.username}</>}</h2>
                        <h2>Age: {customerData.User.age} Gender: {customerData.User.gender}</h2>
                        <h2>Cnic: {customerData.User.cnic}</h2>
                        <h2>Phone: {customerData.User.phone}</h2>
                        <h2>Email: {customerData.User.email}</h2>
                        <h1 className='text-xl text-zinc-200'>Address: </h1>
                        {
                            customerAddress &&
                            <>
                                <h2>House No: {customerAddress.houseNo}</h2>
                                <h2>City: {customerAddress.city}</h2>
                                <h2>Street No: {customerAddress.streetNo}  Zipcode: {customerAddress.zipCode}</h2>
                            </>
                        }
                        <button className='btn btn-outline btn-info btn-sm' onClick={setActiveState}>edit customer</button>
                        <button className='btn btn-outline btn-error btn-sm ml-5' onClick={deleteCustomer}>delete customer</button>

                    </div>}
                    <div>
                        {
                            active === "edit" && <EditCustomer id={customerData.id} />
                        }

                    </div>
                </section>
                {/* <Outlet/> */}
            </div>
        </>
    )
}

export default ViewCustomer