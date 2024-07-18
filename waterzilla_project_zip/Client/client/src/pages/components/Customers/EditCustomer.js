import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function EditCustomer(props) {
  const [customerData, setCustomerData] = useState();
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerAccount, setCustomerAccount] = useState("");
  const [selectedImage, setSelectedImage] = useState();

  const [image, setImage] = useState(null)
  const navigate = useNavigate();

  const onImageChange = (event) => {
    setSelectedImage(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/admin/dashboard/customers/${props.id}`).then((res) => {
      setCustomerData(res.data.customer);
      setCustomerAddress(res.data.address);
      setCustomerAccount(res.data.account);
      setImage(res.data.customer.profilePic);
    })
  }, []);

  const initialValues = {
    profilePic: "",
    name: "",
    username: "" ,
    age: 0 ,
    gender: "male",
    cnic: 0 ,
    phone: 0 ,
    email: "" ,
    password: "",
    repassword: "",
    houseNo: 0 ,
    city: "" ,
    streetNo: 0,
    zipCode: 0
  }
  const validationSchema = Yup.object().shape({
    profilePic: Yup.string(),
    name: Yup.string().required("Enter your name"),
    username: Yup.string().required("Enter your username"),
    age: Yup.number().required("enter age"),
    gender: Yup.string().required(),
    cnic: Yup.number().required(),
    phone: Yup.number().required(),
    email: Yup.string().required("Enter your email"),
    password: Yup.string().required(),
    repassword: Yup.string().required(),
    houseNo: Yup.number().required(),
    city: Yup.string().required("Enter your city"),
    streetNo: Yup.number().required(),
    zipCode: Yup.number().required(),

  });
  const onSubmit = (data_, onSubmitProps) => {
    data_.uid = customerData.User.id
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
        data_.profilePic = data.url;
      })
      .then(() => {
        axios.put(`http://localhost:8080/admin/dashboard/customers/${props.id}`, data_).then(() => {
          navigate("/admin/dashboard/customers")
        })
      })
  };
  return (
    <>
      <div className='bg-slate-800 rounded mt-2 shadow-lg shadow-slate-900 pb-1 pt-2 pl-4 pr-4'>
        {customerData &&
          <div>
            <h1 className='text-xl text-zinc-200 mt-5'>Edit Customer Info</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              <Form>
                <img src={image} width={80} alt="" />
                <label>Upload Profile Picture: </label>
                <ErrorMessage name='profilePic' component="span"></ErrorMessage>
                <Field name="profilePic" type="file" onChange={onImageChange} />

                <div>
                  <div className='mt-2'>
                    <label>Name: </label>
                    <ErrorMessage className='text-xs text-white' name='name' component="span"></ErrorMessage>
                    <Field
                      name="name"
                      placeholder="enter customer name" />

                    <label>Username: </label>
                    <ErrorMessage className='text-xs text-white' name='username' component="span"></ErrorMessage>
                    <Field
                      name="username"
                      placeholder="enter customer's username" />
                  </div>

                  <div className='mt-2'>
                    <label>Age: </label>
                    <ErrorMessage className='text-xs text-white' name='age' component="span"></ErrorMessage>
                    <Field name="age" placeholder="enter age" type="number" />

                    <label>Gender: </label>
                    <Field name="gender" as="select">
                      <option value="male">male</option>
                      <option value="female">female</option>
                    </Field>
                  </div>

                  <div className='mt-3'>
                    <label>Cnic: </label>
                    <ErrorMessage className='text-xs text-white' name='cnic' component="span"></ErrorMessage>
                    <Field
                      name="cnic"
                      placeholder="enter cnic"
                      type="number" />

                    <label>Phone: </label>
                    <ErrorMessage className='text-xs text-white' name='cnic' component="span"></ErrorMessage>
                    <Field
                      name="phone"
                      placeholder="enter phone number"
                      type="tel" />

                  </div>
                  <div className='mt-2'>
                  <label >Email: </label>
                  <ErrorMessage className='text-xs text-white' name='email' component="span"></ErrorMessage>
                  <Field
                    name="email"
                    placeholder="enter email"
                    type="email" />
                    </div>
                  <div className='mt-2'>
                    <label>Password: </label>
                    <ErrorMessage className='text-xs text-white' name='password' component="span"></ErrorMessage>
                    <Field
                      name="password"
                      placeholder="enter password"
                      type='password'
                    />

                    <label>Re Enter Password: </label>
                    <ErrorMessage className='text-xs text-white' name='repassword' component="span"></ErrorMessage>
                    <Field
                      name="repassword"
                      placeholder="re enter password"
                      type='password'
                    />
                  </div>
                </div>
                <div>
                  <div className='mt-2'>
                    <label>House No: </label>
                    <ErrorMessage name='houseNo' component="span"></ErrorMessage>
                    <Field name="houseNo" placeholder="enter house number" type="number" />

                    <label>City: </label>
                    <ErrorMessage className='text-xs text-white' name='city' component="span"></ErrorMessage>
                    <Field
                      name="city"
                      placeholder="enter city" />
                  </div>

                  <div className='mt-2'>

                    <label>Street No: </label>
                    <ErrorMessage name='streetNo' component="span"></ErrorMessage>
                    <Field name="streetNo" placeholder="enter sreet number" type="number" />

                    <label>Zipcode: </label>
                    <ErrorMessage name='zipCode' component="span"></ErrorMessage>
                    <Field name="zipCode" placeholder="enter zipcode" type="number" />
                  </div>

                </div>
                <button className='btn btn-outline btn-sm btn-success mt-4' type='submit'>update customer</button>
              </Form>
            </Formik>
          </div>
        }
      </div>
    </>
  )
}

export default EditCustomer