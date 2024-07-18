import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function UserOrders() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [orders, setOrders] = useState();
  useEffect(() => {
    if (authState.status && authState.isAdmin === false) {
      axios.get(`http://localhost:8080/checkout/${authState.id}`).then((res) => {
        // setOrders(res.data.orders);
        if (res.data.orders[0].id) {
          setOrders(res.data.orders);
        } else {
          res.data.orders.map((value, key) => {
            value.id = value._id;
          })
          setOrders(res.data.orders);
        }
      })
    } else {
      navigate('/login');
    }
  }, [])
  const cancelOrder = (oid, bid) => {
    axios.put(`http://localhost:8080/checkout/${authState.id}`, { oid: oid, bid: bid, username: authState.username }).then((res) => {
      if (res.data.success) {
        alert("order cancelled");
        navigate('/home')
      } else {
        alert("something went wrong.. try again")
      }
    })
  }
  return (
    <>
      {orders &&
        <div>
          <h1 className='text-xl text-zinc-200'>Total Orders: {orders.length}</h1>
          <h2 className='text-green-400 mt-4'></h2>
          <ul>
            {
              orders.map((values, key) => {
                return (
                  <>
                  {
                    values.status == 'delivered' &&
                    <div className='bg-blue-800 rounded shadow-lg shadow-slate-900 flex w-3/5 justify-between mt-2 p-2'>
                      <li>OrderId: {values.id} {values.Bottle.name} Status: {values.status}
                      </li>
                    </div>
                  }
                    {
                      values.status != 'delivered' &&
                      <div className='bg-green-800 rounded shadow-lg shadow-slate-900 flex w-3/5 mt-2 p-2'>
                        <li className='flex w-3/4 justify-between'>OrderId: {values.id} {values.Bottle.name} Status: {values.status}
                        </li>
                          {
                            values.status != 'cancelled' &&
                            <button onClick={() => { cancelOrder(values.id, values.Bottle.id || values.Bottle) }} className='btn btn-sm ml-14  btn-error hover:bg-red-600'>cancel order</button>
                          }
                      </div>
                    }
                  </>
                )
              })
            }
          </ul>
        </div>
      }
    </>
  )
}

export default UserOrders