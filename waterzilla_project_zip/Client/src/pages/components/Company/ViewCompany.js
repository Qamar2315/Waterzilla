import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import EditCompany from './EditCompany';
import { AuthContext } from '../../../helpers/AuthContext';
import { useContext } from 'react';

function ViewCompany() {
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState();
  const [active, setActive] = useState();
  let { id } = useParams();
  useEffect(() => {
    if (authState.status && authState.isAdmin) {
      axios.get(`http://localhost:8080/admin/dashboard/company/${id}`).then((res) => {
        if (res.data.company.id) {
          setCompanyData(res.data.company);
        } else {
          res.data.company.id = res.data.company._id;
          setCompanyData(res.data.company);
        }
        setCompanyData(res.data.company);
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
  const deleteCompany = () => {
    axios.delete(`http://localhost:8080/admin/dashboard/company/${id}`, {
      headers:
      {
        accessToken: localStorage.getItem("accessToken")
      }
    }).then((res) => {
      navigate('/admin/dashboard/company')
    })
  }
  return (
    <div>
      <br />
      <section className='flex flex-row'>
        <div>
          {companyData && <div>
            <h1 className='text-2xl'>{companyData.name}</h1>
            <div>
              <h2>Logo:</h2>
              <img src={companyData.logo} alt="" width={200} />
            </div>
            <div className='flex justify-around w-100 mt-5'>
              <button className='btn btn-outline btn-info btn-sm' onClick={setActiveState}>edit company</button>
              <button className='btn btn-outline btn-error btn-sm' onClick={deleteCompany}>delete company</button>
            </div>
          </div>}
        </div>
        <div>
          {
            active === "edit" && <EditCompany id={companyData.id} />
          }

        </div>
      </section>
      <Outlet />
    </div>

  )
}

export default ViewCompany