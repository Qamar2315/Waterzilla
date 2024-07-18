import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';

function Pages() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [aboutUs, setAboutUs] = useState();
  const [oldAboutUs, setOldAboutUs] = useState();
  const [image, setImage] = useState();
  const [oldImage, setOldImage] = useState();
  const [selectedImage, setSelectedImage] = useState();
  useEffect(() => {
    if (authState.status && authState.isAdmin) {
      axios.get("http://localhost:8080/admin/dashboard/pages").then((res) => {
        setOldAboutUs(res.data.website.aboutUs);
        setOldImage(res.data.website.image)
      })
    } else {
      navigate('/admin/login');
    }
  }, [])
  const onImageChange = (event) => {
    setSelectedImage(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }
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
        axios.put(`http://localhost:8080/admin/dashboard/pages`, { aboutUs: aboutUs, image: data.url }).then((res) => {
          navigate("/admin/dashboard");
        });
      })
  };

  return (
    <div>
      <br />
      <h1 className='text-2xl'>Edit About Us Page</h1>
      <div className='flex justify-around mt-5'>
        <div className='flex w-1/2'>
          <div>
            <h2>Old Image:</h2>
            <img src={oldImage} alt="" width={100} />
          </div>
          <div className='ml-2'>
            <h2>Old Description: </h2>
            <p>{oldAboutUs}</p>
          </div>

        </div>
        <div className='flex w-1/2'>
          <div className=''>
            <h2>New Image: </h2>
            <img src={image} alt="" width={150} />
          </div>
          <div className='ml-2'>
            <h2>New description: </h2>
            <p>{aboutUs}</p>
          </div>
        </div>
      </div>
      <div className='flex justify-around mt-10'>
        <div>
          <label htmlFor="">Write about us description</label>
          <br />
          <textarea cols="40" rows="3" onChange={(event) => { setAboutUs(event.target.value) }}></textarea>
        </div>
        <div>
          <label htmlFor="">Upload an image for about us page</label>
          <br />
          <input type="file" onChange={onImageChange} />
        </div>
      </div>
      <div className='flex w-4/5 justify-center mt-3'>
        <button className='btn btn-outline btn-sm btn-success mt-8 ml-20' onClick={onSubmit}>Update About Us Page</button>
      </div>
    </div>
  )
}

export default Pages;