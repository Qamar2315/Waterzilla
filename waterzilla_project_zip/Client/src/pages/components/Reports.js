import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";
import { AuthContext } from '../../helpers/AuthContext';
import { PieChart, Pie, Tooltip, Sector, Cell, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, } from 'recharts';
function Reports() {

  const data = [
    {
      name: 'Delivered Orders',
      count: 12,
    },
    {
      name: 'Cancelled Orders',
      count: 12,
    },
    {
      name: 'Accepted Orders',
      count: 78,
    },
    {
      name: 'New Orders',
      count: 98,
    }
  ];

  const navigate = useNavigate();
  const [report, setReport] = useState();
  const [date, setDate] = useState();
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    if (authState.status && authState.isAdmin) {
      axios.get("http://localhost:8080/admin/dashboard/reports").then((res) => {
        setReport(res.data);
        var currentdate = new Date();
        var datetime = " " + currentdate.getDate() + "/"
          + (currentdate.getMonth() + 1) + "/"
          + currentdate.getFullYear() + " @ "
          + currentdate.getHours() + ":"
          + currentdate.getMinutes() + ":"
          + currentdate.getSeconds();
        setDate(datetime);
      })
    } else {
      navigate('/admin/login');
    }
  }, [])
  const printPdf = () => {
    const doc = new jsPDF();
    const text = `
        WATER ZILLA
        Admin: Qamar Ul Islam
        Total Orders: ${report.newOrders[0].total_new +
      report.cancelledOrders[0].total_cancelled +
      report.deliveredOrders[0].total_deliveries +
      report.acceptedOrders[0].total_accepted
      }
        Total New Orders: ${report.newOrders[0].total_new}
        Total Cancelled Orders: ${report.cancelledOrders[0].total_cancelled}
        Total Delivered Orders: ${report.deliveredOrders[0].total_deliveries} 
        Total Accepted Orders: ${report.acceptedOrders[0].total_accepted}
        Total Sales: Rs.${report.deliveredOrders[0].total_sale}
        Total Cancelled Orders Price: Rs.${report.cancelledOrders[0].total_sale_cancelled}
        Date: ${date}
      `
    doc.text(text, 10, 10);
    doc.save("report.pdf");
  }
  return (
    <>{
      report &&
      <div className='flex mt-5 justify-around w-4/5' id='graph'>
        <PieChart width={300} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={[
              {name:"Total new orders" ,value: report.newOrders[0].total_new},
              {name:"Total cancelled orders" ,value: report.cancelledOrders[0].total_cancelled},
              {name:"Total delivered orders" ,value: report.deliveredOrders[0].total_deliveries}, 
              {name:"Total accepted orders" ,value: report.acceptedOrders[0].total_accepted}
            ]}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
        <BarChart
          width={300}
          height={300}
          data={[
            {name:"Total new orders" ,count: report.newOrders[0].total_new},
            {name:"Total cancelled orders" ,count: report.cancelledOrders[0].total_cancelled},
            {name:"Total delivered orders" ,count: report.deliveredOrders[0].total_deliveries}, 
            {name:"Total accepted orders" ,count: report.acceptedOrders[0].total_accepted}
          ]}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="count" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      </div>
    }


      {
        report && <div className='ml-5' id='doc'>
          <h1 className='text-2xl'>Report: </h1>
          <div className='flex'>
            <section>
              Total Orders: {
                report.newOrders[0].total_new +
                report.cancelledOrders[0].total_cancelled +
                report.deliveredOrders[0].total_deliveries +
                report.acceptedOrders[0].total_accepted}
              <br />
              Total New Orders: {report.newOrders[0].total_new}
              <br />
              Total Cancelled Orders: {report.cancelledOrders[0].total_cancelled}
              <br />
              Total Delivered Orders: {report.deliveredOrders[0].total_deliveries}
              <br />
              Total Accepted Orders: {report.acceptedOrders[0].total_accepted}
            </section>
            <section className='mt-12 ml-8'>
              <h1>Total Sales: Rs.{report.deliveredOrders[0].total_sale}</h1>
              <h1>Total Cancelled Orders Price: Rs.{report.cancelledOrders[0].total_sale_cancelled}</h1>
              <h2 className='text-zinc-200'>Date: {date}</h2>
            </section>
            <button className='mt-20 ml-8 btn btn-outline btn-sm btn-success' onClick={printPdf}>Print PDF</button>
          </div>
        </div>
      }
    </>
  )
}

export default Reports;