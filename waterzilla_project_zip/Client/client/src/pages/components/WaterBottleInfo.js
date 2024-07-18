import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';

function WaterBottleInfo() {
  const { authState } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState();
  const [image, setImage] = useState(null)
  const [listOfBottles, setListOfBottles] = useState([])
  const [listOfCompanies, setListOfCompanies] = useState([])

  const onImageChange = (event) => {
    setSelectedImage(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  let navigate = useNavigate();
  const initialValues = {
    name: "",
    quantity: 0,
    price: 0,
    size: "250 ml",
    company: "Dasani",
    image: ""
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Enter a bottle name"),
    quantity: Yup.number().required(),
    price: Yup.number().required("Enter a valid bottle price"),
    size: Yup.string().required("Select a valid size"),
    company: Yup.string().required(),
    image: Yup.string()
  });

  const onSubmit = (data_, onSubmitProps) => {
    onSubmitProps.resetForm();
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
        data_.image = data.url;
      })
      .then(() => {
        axios.post("http://localhost:8080/admin/dashboard/waterbottle", data_).then(() => {
          navigate("/admin/dashboard/waterbottle")
        })
      })
  };

  useEffect(() => {
    if (authState.status && authState.isAdmin) {
      axios.get("http://localhost:8080/admin/dashboard/waterbottle").then((res) => {
        if(res.data.bottles[0].id){
          setListOfBottles(res.data.bottles);
          setListOfCompanies(res.data.companies);
        }else{
          res.data.bottles.map((value,key)=>{
            value.id=value._id;
          })
          setListOfBottles(res.data.bottles);
          setListOfCompanies(res.data.companies);
        }
      })
    } else {
      navigate('/admin/login');
    }
  }, [])

  return (
    <>
      <div className='ml-5 mt-3 flex'>
        <div className='w-1/2'>
          <h1 className='text-2xl	'>Bottle Management Section</h1>
          <h2 className='mt-5 mb-2'>Add a new bottle</h2>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
              <div>
                <label>Name: </label>
                <ErrorMessage className='text-xs text-red-500' name='name' component="span"></ErrorMessage>
                <Field
                  name="name"
                  placeholder="enter bottle name" />

                <div>
                  <label>Image: </label>
                  <img src={image} width={100} alt="" />
                </div>

              </div>

              <div className='mt-3'>
                <label>Quantity: </label>
                <ErrorMessage name='quantity' component="span"></ErrorMessage>
                <Field name="quantity" placeholder="enter quantity" type="number" />

                <label>Price: </label>
                <ErrorMessage name='price' component="span"></ErrorMessage>
                <Field
                  name="price"
                  placeholder="enter price"
                  type="number" />
              </div>
              <div className='mt-3'>
                <label>Size: </label>
                <Field name="size" as="select">
                  <option value="250 ml">250 ml</option>
                  <option value="500 ml">500 ml</option>
                  <option value="1 liter">1 liter</option>
                  <option value="5 liter">5 liter</option>
                  <option value="20 liter">20 liter</option>
                </Field>

                <label>Company: </label>
                <ErrorMessage name='company' component="span"></ErrorMessage>
                <Field name="company" as="select">
                  {
                    listOfCompanies.map((value, key) => {
                      return (
                        <option value={value.name}>{value.name}</option>
                      )
                    })
                  }
                </Field>
              </div>
              <div className='mt-3'>
                <label>Upload Image:  </label>
                <ErrorMessage name='image' component="span"></ErrorMessage>
                <Field name="image" type="file" onChange={onImageChange} />
              </div>
              <br />
              <div className='flex w-1/2 justify-center'>
                <button className='btn btn-outline btn-accent mt-2' type='submit'>add bottle</button>
              </div>
            </Form>
          </Formik>
        </div>

        <div className='w-1/2'>
          <section className='mt-8 mr-5'>
            <h1 className='text-xl'>Bottles Info</h1>
            <h2 className='mt-2'>Total Bottles : {listOfBottles.length}</h2>
            <div className="overflow-y-auto h-60 bg-slate-800 rounded mt-2 shadow-lg shadow-slate-900">
            {
              listOfBottles.map((value, key) => {
                return (
                  <>
                      <div className='flex justify-around pt-5'>
                        <img src={value.image} width={50} alt="" />
                        <h3>{value.name}</h3>
                        <Link to={`/admin/dashboard/waterbottle/${value.id}`} ><button className='btn btn-outline btn-sm'>view</button></Link>
                    </div>
                  </>
                )
              })
            }
            </div>
          </section>
        </div>
      </div>
    </>

  )
}

export default WaterBottleInfo