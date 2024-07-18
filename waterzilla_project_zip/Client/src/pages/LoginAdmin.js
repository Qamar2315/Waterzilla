import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import Alert from './components/Alert';

function LoginAdmin() {
    const { setAuthState } = useContext(AuthContext);
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState();
    const data = {
        username: username,
        password: password
    }
    const login = () => {
        axios.post("http://localhost:8080/admin", data).then((res) => {
            if (res.data.error) {
                setMessage({ error: res.data.error });
            } else {
                localStorage.setItem("accessToken", res.data.token);
                setAuthState({
                    username: res.data.username,
                    id: res.data.id,
                    status: true,
                    isAdmin: true
                })
                navigate("/admin/dashboard/viewdashboard");
            }
        })
    }
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className='min-w-fit flex-col border bg-neutral px-6 py-14 shadow-md rounded-[4px]'>
                    {message &&
                        <Alert message={message} />
                    }
                    <h1 className='text-center mb-10 text-xl pt-5'>Login Admin</h1>
                    <div className='flex flex-col text-sm rounded-md'>
                        <input className='mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500' name='username' type="text" placeholder='username' onChange={(event) => { setUsername(event.target.value) }} />
                        <input className='border rounded-[4px] p-3 hover:outline-none focus:outline-none hover:border-yellow-500' name='password' type="password" placeholder='password' onChange={(event) => { setPassword(event.target.value) }} />
                    </div>
                    <button onClick={login} className='mt-5 w-full border p-2 bg-gradient-to-r from-gray-800 bg-gray-500 text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300'>Log In</button>
                </div>
            </div>
        </>
    )
}

export default LoginAdmin;