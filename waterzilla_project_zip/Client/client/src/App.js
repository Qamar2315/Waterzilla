import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './helpers/AuthContext';

import LoginAdmin from './pages/LoginAdmin';
import Admin from './pages/Admin';
import WaterBottleInfo from './pages/components/WaterBottleInfo';
import Dashboard from './pages/components/Dashboard';
import ViewBottle from './pages/components/WaterBottle/ViewBottle';
import CompanyInfo from './pages/components/CompanyInfo';
import ViewCompany from './pages/components/Company/ViewCompany';
import Pages from './pages/components/Pages';
import Orders from './pages/components/Orders';
import ViewOrder from './pages/components/Order/ViewOrder';
import Reports from './pages/components/Reports';
import Customers from './pages/components/Customers';
import ViewCustomer from './pages/components/Customers/ViewCustomer';
import Notifications from './pages/components/Notifications';
import Error from './pages/Error';
import AdminProfile from './pages/AdminProfile';
import AdminSettings from './pages/AdminSettings';
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './pages/Navbar';
import Register from './pages/Register';
import Bottles from './pages/Bottles';
import Checkout from './pages/Checkout';
import UserProfile from './pages/UserProfile';
import UserOrders from './pages/UserOrders';

function App() {
  const [authState, setAuthState] = useState(
    {
      username: "",
      id: 0,
      status: false,
      isAdmin: false
    });
  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Routes>
            <Route path='/admin'>
              <Route path='login' exact element={<LoginAdmin />} />
              <Route path='dashboard' exact element={<Admin />}>
                <Route path='viewDashboard' exact element={<Dashboard />} />
                <Route path='waterbottle' element={<WaterBottleInfo />} />
                <Route path='waterbottle/:id' element={<ViewBottle />} />
                <Route path='company' element={<CompanyInfo />} />
                <Route path='company/:id' element={<ViewCompany />} />
                <Route path='pages' element={<Pages />} />
                <Route path='notifications' element={<Notifications />} />
                <Route path='orders' element={<Orders />} />
                <Route path='orders/:id' element={<ViewOrder />} />
                <Route path='customers' element={<Customers />} />
                <Route path='customers/:id' element={<ViewCustomer />} />
                <Route path='reports' element={<Reports />} />
              </Route>
              <Route path='settings' exact element={<AdminSettings />} />
              <Route path='profile' exact element={<AdminProfile />} />
            </Route>
            <Route path='/' exact element={<Navbar/>}>
              <Route path='home' exact element={<Home />} />
              <Route path='aboutus' exact element={<AboutUs />} />
              <Route path='bottles' exact element={<Bottles />} />
              <Route path='orders' exact element={<UserOrders />} />
              <Route path='checkout/:id' exact element={<Checkout />} />
            </Route>
            <Route path='login' exact element={<Login />} />
            <Route path='register' exact element={<Register />} />
            
            <Route path='*' element={<Error />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;