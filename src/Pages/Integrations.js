import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { addClassToBody } from '../API/Api';
import INTELICHAT_LOGO from '../assets/icons/Intelichat_logo.svg';
import Sidebar from '../components/Sidebar';
import ToogleSidebar from '../components/ToogleSidebar';

const Integrations = () => {
  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState('');

  useEffect(() => {
    addClassToBody('no-chat');
  }, []);

  const logInToFB = () => {
    window.FB.login(
      (response) => {
        setFacebookUserAccessToken(response?.authResponse?.accessToken);
      },
      {
        // Scopes that allow us to publish content to Instagram
        scope: 'instagram_basic,pages_show_list',
      }
    );
  };

  const logOutOfFB = () => {
    window.FB.logout(() => {
      setFacebookUserAccessToken(undefined);
    });
  };

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
                    <h3>Integrations</h3>
                  </div>
                  <div className='intelichat-body-text'>
                    <div className='intelichat-link'>
                      <Link to='/integrations' className='active '>
                        All Integrations
                      </Link>
                    </div>
                  </div>
                </div>
                <div className='intelichat-logo'>
                  <img src={INTELICHAT_LOGO} alt='logo' />
                </div>
              </div>
              <div className='col-xxl-10 col-xl-9 col-lg-9 col-md-8 col-sm-12 p-0 intelichat-overflow'>
                <div className='intelichat-conatiner-right'>
                  {/* {facebookUserAccessToken ? (
                    <button onClick={logOutOfFB} className="btn action-btn">
                      Log out of META
                    </button>
                  ) : (
                    <button onClick={logInToFB} className="btn action-btn">
                      Login with META
                    </button>
                  )} */}
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

export default Integrations;
