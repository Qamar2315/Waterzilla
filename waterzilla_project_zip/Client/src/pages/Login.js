import React, { useEffect, useState, useContext } from 'react';
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import Alert from './components/Alert';

function Login() {
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
        axios.post("http://localhost:8080/admin/dashboard/customers/login", data).then((res) => {
            if (res.data.error) {
                setMessage({ error: res.data.error });
            } else {
                localStorage.setItem("accessToken", res.data.token);
                setAuthState({
                    username: res.data.username,
                    id: res.data.id,
                    status: true,
                    isAdmin: false
                })
                navigate("/home");
            }
        })
    }
    return (
        <div>
            {
                message && <Alert message={message} />
            }
            <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" >
                <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                    <div className="text-white">
                        <div className="mb-8 flex flex-col items-center">
                            <img src="https://res.cloudinary.com/dmiqkr7ja/image/upload/v1672076033/Waterfox_Logo__redesigned_2015_owjumb.png" width="100" alt="" srcset="" />
                            <Link to={'/home'}><h1 className="mb-2 text-2xl">Waterzilla</h1></Link>
                            <span className="text-gray-300">Enter Login Details</span>
                        </div>
                        <div >
                            <div className="mb-4 text-lg">
                                <input onChange={(event)=>{setUsername(event.target.value)}} className="rounded-3xl border-none bg-cyan-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="text" name="name" placeholder="username" />
                            </div>

                            <div className="mb-4 text-lg">
                                <input onChange={(event)=>{setPassword(event.target.value)}} className="rounded-3xl border-none bg-cyan-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="Password" name="name" placeholder="*********" />
                            </div>
                            <div className="mt-8 flex justify-center text-lg text-black">
                                <button onClick={login}className="rounded-3xl bg-blue-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-blue-600">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login