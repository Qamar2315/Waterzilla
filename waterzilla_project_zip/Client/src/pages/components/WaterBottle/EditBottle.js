import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function EditBottle(props) {
  const [bottleData, setBottleData] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [listOfCompanies, setListOfCompanies] = useState([])

  const [image, setImage] = useState(null)
  const navigate = useNavigate();

  const onImageChange = (event) => {
    setSelectedImage(event.target.files[0])
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/admin/dashboard/waterbottle/${props.id}`).then((res) => {
      setBottleData(res.data.bottle);
      setImage(res.data.bottle.image)
    })
    axios.get(`http://localhost:8080/admin/dashboard/company`).then((res) => {
      setListOfCompanies(res.data.company);
    })
  }, []);

  const initialValues = {
    name: "",
    quantity: 0,
    price: 0,
    size: "",
    company: "",
    image: "" 
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Enter bottle name"),
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
        axios.put(`http://localhost:8080/admin/dashboard/waterbottle/${props.id}`, data_).then(() => {
          navigate("/admin/dashboard/waterbottle")
        })
      })
  };
  return (
    <>
      {bottleData &&
      <div className='bg-slate-800 rounded mt-2 shadow-lg shadow-slate-900 pt-2 pb-3 pr-2'>
        <div className='ml-5'>
          <h1 className='mt-5 mb-2 text-xl'>Edit Bottle Info</h1>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
              <div>
                <label>Name: </label>
                <ErrorMessage className='text-xs text-red-500' name='name' component="span"></ErrorMessage>
                <Field
                  name="name"
                  placeholder={bottleData.name} />
                <div>
                  <label>Image: </label>
                  <img src={image} width={100} alt="" />
                </div>
              </div>
              <div className='mt-3'>
                <label>Quantity: </label>
                <ErrorMessage name='quantity' component="span"></ErrorMessage>
                <Field name="quantity" placeholder={bottleData.quantity} type="number" />

                <label>Price: </label>
                <ErrorMessage name='price' component="span"></ErrorMessage>
                <Field
                  name="price"
                  placeholder={bottleData.price}
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
                <label >Upload image: </label>
                <ErrorMessage name='image' component="span"></ErrorMessage>
                <Field name="image" type="file" onChange={onImageChange} />
              </div>
              <div className='flex w-1/2 justify-center'>
                <button className='btn btn-outline btn-sm btn-success mt-6 ml-40' type='submit'>update bottle</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      }
    </>
  )
}

export default EditBottle