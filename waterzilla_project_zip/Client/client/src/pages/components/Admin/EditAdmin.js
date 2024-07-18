import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function EditAdmin() {
  const [adminData, setAdminData] = useState("");
  const [adminAddress, setAdminAddress] = useState("");
  const [adminAccount, setAdminAccount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/admin/profile`).then((res) => {
      setAdminData(res.data.admin);
      setAdminAddress(res.data.address);
      setAdminAccount(res.data.account);
    })
  }, []);

  const initialValues = {
    name: "" || adminData.name,
    username: "" || adminAccount.username,
    age: 0 || adminData.age,
    gender: "male" || adminData.gender,
    cnic: 0 || adminData.cnic,
    phone: 0 || adminData.phone,
    email: "" || adminData.email,
    password: "",
    repassword: "",
    houseNo: 0 || adminAddress.houseNo,
    city: "" || adminAddress.city,
    streetNo: 0 || adminAddress.streetNo,
    zipCode: 0 || adminAddress.zipCode
  }
  const validationSchema = Yup.object().shape({
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
  const onSubmit = (data, onSubmitProps) => {
    onSubmitProps.resetForm();
    axios.put(`http://localhost:8080/admin/profile`, data).then(() => {
      navigate("/admin/profile")
    })
  };
  return (
    <>
      {adminData &&
        <div className='bg-slate-800 rounded mt-2 shadow-lg shadow-slate-900 mt-16 ml-5 pb-4 pt-2 pl-4 pr-4'>
          <h1 className='text-2xl'>Edit Admin Info</h1>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
              <div className='mt-3'>
                <div className='mt-2'>
                  <label>Name: </label>
                  <ErrorMessage name='name' component="span"></ErrorMessage>
                  <Field
                    name="name"
                    placeholder="enter name" />

                  <label>Username: </label>
                  <ErrorMessage name='username' component="span"></ErrorMessage>
                  <Field
                    name="username"
                    placeholder="enter username" />
                </div>

                <div className='mt-2'>
                  <label>Age: </label>
                  <ErrorMessage name='age' component="span"></ErrorMessage>
                  <Field name="age" placeholder="enter age" type="number" />

                  <label>Gender: </label>
                  <Field name="gender" as="select">
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </Field>
                </div>

                <div className='mt-2'>
                  <label>Cnic: </label>
                  <ErrorMessage name='cnic' component="span"></ErrorMessage>
                  <Field
                    name="cnic"
                    placeholder="enter cnic"
                    type="number" />

                  <label>Phone: </label>
                  <ErrorMessage name='cnic' component="span"></ErrorMessage>
                  <Field
                    name="phone"
                    placeholder="enter phone number"
                    type="tel" />

                </div>
                <div className='mt-2'>
                  <label >Email: </label>
                  <ErrorMessage name='email' component="span"></ErrorMessage>
                  <Field
                    name="email"
                    placeholder="enter email"
                    type="email" />
                </div>
                <div className='mt-2'>
                  <label>Password: </label>
                  <ErrorMessage name='password' component="span"></ErrorMessage>
                  <Field
                    name="password"
                    placeholder="enter password"
                    type="password"
                  />

                  <label>Re Enter Password: </label>
                  <ErrorMessage name='repassword' component="span"></ErrorMessage>
                  <Field
                    name="repassword"
                    placeholder="re enter password"
                    type="password"
                  />
                </div>
              </div>
              <div>
                <div className='mt-2'>
                  <label>House No: </label>
                  <ErrorMessage name='houseNo' component="span"></ErrorMessage>
                  <Field name="houseNo" placeholder="enter house number" type="number" />

                  <label>City: </label>
                  <ErrorMessage name='city' component="span"></ErrorMessage>
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
              <div className='flex justify-center'>
              <button className='btn btn-outline btn-info btn-sm mt-4' type='submit'>update info</button>

              </div>
            </Form>
          </Formik>
        </div>
      }
    </>

  )
}

export default EditAdmin