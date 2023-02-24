import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import INTELICHAT_LOGO from '../assets/icons/Intelichat_logo.svg';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { addClassToBody, getLocalStorage, postWithToken } from '../API/Api';
import ToogleSidebar from '../components/ToogleSidebar';

const Dashboard = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    let token = getLocalStorage('apiToken');
    if (!token) {
      Navigate('/login');
    }
    addClassToBody('no-chat');
  }, []);

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
                    <h3>Dashboard</h3>
                  </div>
                  <div className='intelichat-body-text'>
                    <div className='intelichat-link'>
                      <Link to='/dashboard' className='active '>
                        Performance
                      </Link>
                    </div>
                    {/* <div className='intelichat-link'>
                      <Link to='/dashboard'>Customer Interactions</Link>
                    </div>
                    <div className='intelichat-link'>
                      <Link to='/dashboard'>Analytics</Link>
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
                  {/* <DashboardPerformance/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
