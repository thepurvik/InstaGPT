import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { addClassToBody, clearLocalStorage, getLocalStorage, postWithToken } from '../API/Api';
import INTELICHAT_LOGO from '../assets/icons/Intelichat_logo.svg';
import Sidebar from '../components/Sidebar';
import ToogleSidebar from '../components/ToogleSidebar';
import { BiLogOut } from 'react-icons/bi';
import { toast } from 'react-toastify';

const User = () => {
  const Navigate = useNavigate();
  // const [apiTokenData, setApiTokenData] = useState('');

  // useEffect(() => {
  //   addClassToBody('no-chat');
  //   let token = getLocalStorage('apiToken');
  //   setApiTokenData(JSON.parse(token));
  // }, []);

  // const handleClick = () => {
  //   postWithToken('logout/', apiTokenData, '')
  //     .then((response) => {
  //       if (response.status == 200) {
  //         clearLocalStorage();
  //         toast.success('Logout Successfully');
  //         Navigate('/login');
  //       } else if (response.status == 400) {
  //         toast.error(response.message);
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error('Something went wrong');
  //     });
  // };
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
                    <h3>User</h3>
                  </div>
                  <div className='intelichat-body-text'>
                    {/* <div className='intelichat-link'>
                      <Link to='/guide' className='active '>
                        Guide
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
                  <div className='chatbot-container'>
                    <div className='chatbot-header'>
                      <h3 className='opensans-bold mb-0'>Profile</h3>
                    </div>
                    {/* <div className='d-flex justify-content-end logout-btn'>
                      <button className='btn btn-submit-add rounded-3 m-3 m-3' onClick={handleClick}>
                        <span className='me-2'>
                          <BiLogOut />
                        </span>
                        LogOut
                      </button>
                    </div> */}
                    <Row className='m-0 ps-md-5 ps-sm-3 ps-3'></Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
