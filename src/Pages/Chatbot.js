import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../assets/styles/Chatbot.css';
import INTELICHAT_LOGO from '../assets/icons/Intelichat_logo.svg';
import Sidebar from '../components/Sidebar';
import ToogleSidebar from '../components/ToogleSidebar';

const Chatbot = () => {
  const location = useLocation();
  return (
    <>
      <div className='d-flex'>
        <Sidebar />
        <div className='sidebar-menu-right'>
          <div className='intelichat-container h-100'>
            <div className='row m-0 h-100'>
              <div className='col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-12 intelichat-conatiner-left' id='PopUpShowHide'>
                <ToogleSidebar />
                <div className='intelichat-conatiner-contain'>
                  <div className='intelichat-header-text'>
                    <h3 className='opensans-semibold'>Chatbot</h3>
                  </div>
                  <div className='intelichat-body-text'>
                    <div className='intelichat-link'>
                      <Link to='/chatbot' className={`opensans-medium ${location.pathname === '/chatbot' ? 'active' : ''}`}>
                        Profile
                      </Link>
                    </div>
                    <div className='intelichat-link'>
                      <Link to='/chatbot/knowledgebase' className={`opensans-medium ${location.pathname === '/chatbot/knowledgebase' ? 'active' : ''}`}>
                        Set Message
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='intelichat-logo'>
                  <img src={INTELICHAT_LOGO} alt='intelichat-logo' />
                </div>
              </div>
              <div className='col-xxl-10 col-xl-9 col-lg-9 col-md-8 col-sm-12 p-0 position-relative intelichat-overflow'>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
