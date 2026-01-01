import React, { useState } from 'react';
import './App.css';

import SideMenu from './components/sidemenu/SideMenu';
import ListFood from './pages/listfood/ListFood';
import AddFood from './pages/addfood/AddFood';
import OrderFood from './pages/orderfood/OrderFood';
import TopMenu from './components/topmenu/TopMenu';
import { Routes, Route } from 'react-router-dom';
import { asset } from './assets/assets';
import { ToastContainer } from "react-toastify";

const App = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="d-flex" id="wrapper">

      {/* Sidebar */}
      <div
        id="sidebar-wrapper"
        className={`border-end bg-white ${showSidebar ? 'active' : 'collapsed'}`}
      >
        <div className="sidebar-heading border-bottom bg-light">
          <img src={asset.logo} alt="logo" height={56} width={150} />
        </div>
        <SideMenu />
      </div>

      {/* Page content */}
      <div id="page-content-wrapper" className="flex-grow-1">
        <TopMenu toggleSidebar={() => setShowSidebar(prev => !prev)} />

        <ToastContainer position="top-right" autoClose={3000} />

        <div className="container-fluid">
          <Routes>
            <Route path="/add" element={<AddFood />} />
            <Route path="/listFood" element={<ListFood />} />
            <Route path="/orderFood" element={<OrderFood />} />
            <Route path="/" element={<ListFood />} />
          </Routes>
        </div>
      </div>

    </div>
  );
};

export default App;
