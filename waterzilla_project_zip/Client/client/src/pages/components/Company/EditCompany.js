import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function EditCompany(props) {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState();
  let { id } = useParams();
  const [selectedImage, setSelectedImage] = useState();
  const [image, setImage] = useState(null)
  const [name, setName] = useState();

  const onImageChange = (event) => {
    setSelectedImage(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/admin/dashboard/company/${props.id}`).then((res) => {
      setCompanyData(res.data.company);
      setImage(res.data.company.logo)
    })
  }, []);
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
        axios.put(`http://localhost:8080/admin/dashboard/company/${props.id}`, { name: name, logo: data.url }).then((res) => {
          navigate("/admin/dashboard/company");
        });
      })
  };
  return (
    <>
      {
        companyData &&
        <div className='bg-slate-800 rounded shadow-lg shadow-slate-900 ml-20 mt-5 pb-3 pr-2'>
          <div className='mt-5 ml-10'>
            <br />
            <h2 className='text-2xl'>Update Company Info</h2>
            <div className='mt-3'>
              <label htmlFor="">Update Company Name: </label>
              <input type="text" placeholder={companyData.name} onChange={(event) => { setName(event.target.value) }} />
            </div>
            <div className='mt-3'>
              <label htmlFor="">Logo: </label>
              <img src={image} width={100} alt="" />
            </div>
            <div className='mt-3'>
              <label htmlFor="">Upload Logo: </label>
              <input type="file" onChange={onImageChange} />
            </div>
            <div className='flex w-1/2 justify-center'>
              <button className='btn btn-outline btn-sm btn-success mt-8 ml-28' onClick={onSubmit}>Update Company</button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default EditCompany