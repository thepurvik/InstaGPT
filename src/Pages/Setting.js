import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { addClassToBody } from '../API/Api';
import INTELICHAT_LOGO from '../assets/icons/Intelichat_logo.svg';
import Sidebar from '../components/Sidebar';
import ToogleSidebar from '../components/ToogleSidebar';

const Setting = () => {
  const location = useLocation();
  useEffect(() => {
    addClassToBody('no-chat');
  }, []);
  return (
    <>
      <div className='d-flex'>
        <Sidebar />
        <div className='sidebar-menu-right'>
          <div className='intelichat-container'>
            <div className='row m-0 h-100'>
              <div className='col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-12 intelichat-conatiner-left' id='PopUpShowHide'>
                <ToogleSidebar />
                <div className='intelichat-conatiner-contain'>
                  <div className='intelichat-header-text'>
                    <h3>Profile</h3>
                  </div>
                  <div className='intelichat-body-text'>
                    <div className='intelichat-link'>
                      <Link to='/setting' className={`opensans-medium ${location.pathname === '/setting' ? 'active' : ''}`}>
                        Profile
                      </Link>
                    </div>
                    <div className='intelichat-link'>
                      <Link to='/setting/changepassword' className={`opensans-medium ${location.pathname === '/setting/changepassword' ? 'active' : ''}`}>
                        Change password
                      </Link>
                    </div>
                    {/* <div className='intelichat-link'>
                      <Link to='/setting/integration' className={`opensans-medium ${location.pathname === '/setting/integration' ? 'active' : ''}`}>
                        Integration
                      </Link>
                    </div>

                    <div className='intelichat-link'>
                      <Link to='/setting/subscription' className={`opensans-medium ${location.pathname === '/setting/subscription' ? 'active' : ''}`}>
                        Subscription
                      </Link>
                    </div>

                    <div className='intelichat-link'>
                      <Link to='/setting/billing' className={`opensans-medium ${location.pathname === '/setting/billing' ? 'active' : ''}`}>
                        Billing
                      </Link>
                    </div>

                    <div className='intelichat-link'>
                      <Link to='/setting/security' className={`opensans-medium ${location.pathname === '/setting/security' ? 'active' : ''}`}>
                        Security
                      </Link>
                    </div> */}
                  </div>
                </div>
                <div className='intelichat-logo'>
                  <img src={INTELICHAT_LOGO} alt='logo' />
                </div>
              </div>
              <div className='col-xxl-10 col-xl-9 col-lg-9 col-md-8 col-sm-12 p-0 intelichat-overflow'>
                <div className='intelichat-conatiner-right'>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
