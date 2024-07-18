import { Outlet } from 'react-router-dom'
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';

function CompanyInfo() {
  const { authState } = useContext(AuthContext);
  const [companies, setCompanies] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [image, setImage] = useState(null)
  const [name, setName] = useState();
  const onImageChange = (event) => {
    setSelectedImage(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }
  let navigate = useNavigate();
  useEffect(() => {
    if (authState.status && authState.isAdmin) {
      axios.get(`http://localhost:8080/admin/dashboard/company`).then((res) => {
        if(res.data.company[0].id){
          setCompanies(res.data.company);
        }else{
          res.data.company.map((value,key)=>{
            value.id=value._id;
          })
        setCompanies(res.data.company);
        }
        //setCompanies(res.data.company);
      })
    } else {
      navigate('/admin/login')
    }
  }, [])
  const onSubmit = () => {
    setImage(null);
    const data = new FormData();
    data.append("file", selectedImage);
    data.append("upload_preset", "fbyvq0uw");
    data.append("cloud_name", "dmiqkr7ja");
    fetch("https://api.cloudinary.com/v1_1/dmiqkr7ja/image/upload", {
      method: "post",
      body: data
    })
      .then((res) => res.json())
      .then((data) => {
        axios.post("http://localhost:8080/admin/dashboard/company", { name: name, logo: data.url }).then((res) => {
          navigate("/admin/dashboard/company");
        });
      })
  };
  return (
    <div className='flex'>
      <div className='ml-5 mt-3'>
        <h1 className='text-2xl	'>Company Managemnt Section</h1>
        <h2 className='mt-5 mb-2 text-l'>Add a new company</h2>

        <div className='mt-3'>
          <label htmlFor="">Company Name: </label>
          <input type="text" placeholder='enter company name' onChange={(event) => { setName(event.target.value) }} />
        </div>

        <div className='mt-3'>
          <label htmlFor="">Company Logo: </label>
          <img src={image} width={100} alt="" />
        </div>

        <div className='mt-3'>
          <label htmlFor="">Upload logo: </label>
          <input type="file" onChange={onImageChange} />
        </div>
        <div className='mt-10 flex justify-center'>
          <button className='btn btn-outline btn-accent' onClick={onSubmit}>Add Company</button>
        </div>
      </div>
      <div className='w-1/2'>
        {
          companies &&
          <div className='mt-10'>
            <h1 className='text-xl'>Company Info</h1>
            <h1 className='mt-2'>Total Companies: {companies.length}</h1>
            <div className="overflow-y-auto h-60 bg-slate-800 rounded mt-2 shadow-lg shadow-slate-900">
            {
              companies.map((value, key) => {
                return (
                  <div className='flex justify-around pt-5' >
                    <img src={value.logo} alt="" width={100} height={100} />
                    <h1>{value.name}</h1>
                    <Link to={`/admin/dashboard/company/${value.id}`}><button className='btn btn-outline btn-sm'>view</button></Link>
                  </div>
                )
              })
            }
            </div>
          </div>
        }
      </div>
      <Outlet />
    </div>
  )
}

export default CompanyInfo