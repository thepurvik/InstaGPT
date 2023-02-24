import React, { useEffect, useState } from 'react';
import { addClassToBody, getLocalStorage, getWithToken, postWithToken } from '../API/Api';
import { AiOutlineSearch } from 'react-icons/ai';
import '../assets/styles/Installed.css';
import FACEBOOK_ICON from '../assets/icons/Facebook.svg';
import WHATSAPP_ICON from '../assets/icons/Whatsapp.svg';
import INSTAGRAM_ICON from '../assets/icons/Instagram.svg';
import { FaFacebookSquare } from 'react-icons/fa';
import { BsFillCircleFill } from 'react-icons/bs';
import CHATBOX_LOGO from '../assets/icons/ChatBox_Logo.svg';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Installed = () => {
  const [loader, setLoader] = useState(false);
  const [activeTab, setActiveTab] = useState('3');
  const [apiTokenData, setApiTokenData] = useState('');
  const [facebookUserAccessToken, setFacebookUserAccessToken] = useState('');
  const [userName, setUserName] = useState('');
  const [userFbId, setUserFbId] = useState('');
  let newObj = {};

  useEffect(() => {
    addClassToBody('no-chat');

    let token = getLocalStorage('apiToken');
    if (token) {
      setApiTokenData(JSON.parse(token));
      GetFBAuthFlow(JSON.parse(token));
      window.FB.getLoginStatus((response) => {
        setFacebookUserAccessToken(response?.authResponse?.accessToken);
        if (response?.authResponse?.accessToken) {
          FBAuthFlow(JSON.parse(token), response?.authResponse?.accessToken, false);
        }
      });
    }
  }, []);

  const GetFBAuthFlow = (token) => {
    // setLoader(true);
    getWithToken('facebook_authflow', token)
      .then((response) => {
        if (response.status == 200) {
          setUserName(response?.data?.insta_username);
          setUserFbId(response?.data?.instagram_bussiness_account_id);
          // setLoader(false);
        } else if (response.status == 400) {
          // logOutOfFB();
          // setLoader(false);
          // toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error('Something went wrong');
        setLoader(false);
      });
  };

  const logInToFB = () => {
    window.FB.login(
      (response) => {
        setFacebookUserAccessToken(response?.authResponse?.accessToken);
        if (response?.authResponse?.accessToken) {
          FBAuthFlow(apiTokenData, response?.authResponse?.accessToken, true);
        }
      },
      {
        Scope:
          'pages_show_list, read_page_mailboxes, ads_management, business_management, pages_messaging, instagram_basic, instagram_manage_comments, instagram_manage_insights, instagram_content_publish, instagram_manage_messages, pages_read_engagement, pages_manage_metadata, public_profile',
      }
    );
  };

  const logOutOfFB = () => {
    window.FB.logout(() => {
      setFacebookUserAccessToken(undefined);
      setUserName('');
      setUserFbId('');
      toast.success('Logout successful with Meta');
    });
  };

  const FBAuthFlow = (apiTokenData, accessToken, status) => {
    let newObj = {
      access_token: accessToken,
    };
    setLoader(true);
    postWithToken('facebook_authflow', apiTokenData, newObj)
      .then((response) => {
        if (response.status == 200) {
          setUserName(response?.data?.insta_username);
          setUserFbId(response?.data?.instagram_bussiness_account_id);
          setLoader(false);
          if (status) {
            toast.success('Login successful with Meta');
          }
        } else if (response.status == 400) {
          logOutOfFB();
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error('Something went wrong');
      });
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className='chatbot-container'>
          <div className='chatbot-header'>
            <h3 className='opensans-bold mb-0'>Installed</h3>
          </div>
          {/* <div className='autoresponse-navheader d-flex flex-wrap justify-content-between align-items-center px-md-5 px-2 py-sm-2'>
          <div className='intelichat-conatiner-right-select  d-flex align-items-center'>
            <h3 className='opensens-bold m-0'>Installed</h3>
          </div>
          <div className='intelichat-conatiner-right-input'>
            <div class='input-box'>
              <input type='text' class='form-control' placeholder='Search' />
              <AiOutlineSearch />
            </div>
          </div>
        </div> */}
          <div className='mt-5 ps-md-5 ps-sm-3 ps-3 pe-xxl-5 pe-xl-4 pe-md-4 pe-sm-3 pe-3'>
            {/* <div className='chatbox-field'> */}
            <div className='knowledgebase-text mb-5'>
              <h3 className='opensans-bold'>Connect Channels</h3>
            </div>
            <div className='row mx-0'>
              <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12 px-0'>
                {/* <div className={`installed-btn p-2 ${activeTab === '1' && 'activeLink'}`} onClick={() => setActiveTab('1')}>
                <div className='d-flex align-items-center installed-icon'>
                  <img src={FACEBOOK_ICON} alt='facebook-icon' />
                  <h1 className='opensans-regular ms-2'>Facebook</h1>
                </div>
              </div> */}
                {/* <div className={`installed-btn p-2 ${activeTab === '2' && 'activeLink'}`} onClick={() => setActiveTab('2')}>
                <div className='d-flex align-items-center installed-icon'>
                  <img src={WHATSAPP_ICON} alt='whatsapp-icon' />
                  <h1 className='opensans-regular ms-2'>Whatsapp</h1>
                </div>
              </div> */}
                <div className={`installed-btn p-2 ${activeTab === '3' && 'activeLink'}`} onClick={() => setActiveTab('3')}>
                  <div className='d-flex align-items-center installed-icon'>
                    <img src={INSTAGRAM_ICON} alt='instagram-icon' />
                    <h4 className='opensans-regular ms-2 mb-0'>Instagram</h4>
                  </div>
                </div>
              </div>
              <div className='col-xxl-6 col-xl-8 col-lg-7 col-md-12 col-sm-12 col-12 px-0 offset-xxl-1 offset-xl-1 offset-lg-1 offset-md-0 offset-sm-0 offset-xs-0'>
                {activeTab === '1' && (
                  <div className='installed-right'>
                    <div className='installed-right-text'>
                      <h6>Facebook</h6>
                      {/* <div className='d-flex align-items-center flex-wrap'>
                      <div className='d-flex align-items-center'>
                        <div className='me-2 circle-svg'>
                          <BsFillCircleFill />
                        </div>
                        <p className='m-0 opensans-regular'>You are logged in as</p>
                      </div>
                      <div className='d-flex align-items-center ms-md-3 ms-0'>
                        <div className='me-2 facebook-svg'>
                          <FaFacebookSquare />
                        </div>
                        <span className='opensans-regular'>John Luna Design Agent</span>
                      </div>
                    </div> */}
                      <div className='mt-4'>
                        <div className='d-flex flex-wrap'>
                          <div className='flex-shrink-0 installed-chatbox-logo'>
                            <img src={CHATBOX_LOGO} alt='chatbox-logo' />
                          </div>
                          <div className='flex-grow-1 ms-md-3 ms-0 autoresponse-body-text'>
                            <h3 className='opensans-bold'>John Luna Design Agent</h3>
                            <p className='opensans-regular'>0001192495171461</p>
                          </div>
                          <div class='dropdown installed-dropdown'>
                            <button
                              class='btn  dropdown-toggle dropdown-btn opensans-regular'
                              type='button'
                              id='dropdownMenuButton1'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'
                            >
                              Connect
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='installed-link mt-4'>
                        <h3 className='m-0 opensans-regular'>Create a new page</h3>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === '2' && (
                  <div className='installed-right'>
                    <div className='installed-right-text'>
                      <h6>Whatsapp</h6>
                      {/* <div className='d-flex align-items-center flex-wrap'>
                      <div className='d-flex align-items-center'>
                        <div className='me-2 circle-svg'>
                          <BsFillCircleFill />
                        </div>
                        <p className='m-0 opensans-regular'>You are logged in as</p>
                      </div>
                      <div className='d-flex align-items-center ms-md-3 ms-0'>
                        <div className='me-2 facebook-svg'>
                          <FaFacebookSquare />
                        </div>
                        <span className='opensans-regular'>John Luna Design Agent</span>
                      </div>
                    </div> */}
                      <div className='mt-4'>
                        <div className='d-flex flex-wrap'>
                          <div className='flex-shrink-0 installed-chatbox-logo'>
                            <img src={CHATBOX_LOGO} alt='chatbox-logo' />
                          </div>
                          <div className='flex-grow-1 ms-md-3 ms-0 autoresponse-body-text'>
                            <h3 className='opensans-bold'>John Luna Design Agent</h3>
                            <p className='opensans-regular'>0001192495171461</p>
                          </div>
                          <div class='dropdown installed-dropdown'>
                            <button
                              class='btn  dropdown-toggle dropdown-btn opensans-regular'
                              type='button'
                              id='dropdownMenuButton1'
                              data-bs-toggle='dropdown'
                              aria-expanded='false'
                            >
                              Connect
                            </button>
                            {/* <ul class='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                          <li>
                            <a class='dropdown-item' href='#'>
                              Action
                            </a>
                          </li>
                        </ul> */}
                          </div>
                        </div>
                      </div>

                      <div className='installed-link mt-4'>
                        <h3 className='m-0 opensans-regular'>Create a new page</h3>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === '3' && (
                  <div className='installed-right'>
                    <div className='installed-right-text'>
                      <h1 className='opensans-semibold text-black mb-0 pb-3'>Instagram</h1>
                      {/* <div className='d-flex align-items-center flex-wrap'>
                      <div className='d-flex align-items-center'>
                        <div className='me-2 circle-svg'>
                          <BsFillCircleFill />
                        </div>
                        <p className='m-0 opensans-regular'>You are logged in as</p>
                      </div>
                      <div className='d-flex align-items-center ms-md-3 ms-0'>
                        <div className='me-2 facebook-svg'>
                          <FaFacebookSquare />
                        </div>
                        <span className='opensans-regular'>John Luna Design Agent</span>
                      </div>
                    </div> */}
                      <div className='mt-4'>
                        <div className='d-flex flex-wrap'>
                          <div className='flex-shrink-0 installed-chatbox-logo'>
                            <img src={CHATBOX_LOGO} alt='chatbox-logo' />
                          </div>
                          {userName ? (
                            <div className='flex-grow-1 ms-md-3 ms-0 autoresponse-body-text'>
                              <h3 className='opensans-semibold text-lightSky'>{userName}</h3>
                              <h4 className='opensans-regular text-notBlack'>{userFbId}</h4>
                            </div>
                          ) : (
                            <div className='flex-grow-1 ms-md-3 ms-0 autoresponse-body-text'>
                              <h3 className='opensans-semibold text-lightSky'>Chatbot Agent</h3>
                            </div>
                          )}

                          <div className='mt-xxl-0 mt-4'>
                            {/* <button className='btn btn-submit-login text-uppercase rounded-3'>Connect</button> */}
                            {facebookUserAccessToken ? (
                              <button onClick={logOutOfFB} className='btn btn-submit-login text-uppercase rounded-3'>
                                Log out of META
                              </button>
                            ) : (
                              <button onClick={logInToFB} className='btn btn-submit-login text-uppercase rounded-3'>
                                Login with META
                              </button>
                            )}
                          </div>
                          {/* <div class='dropdown installed-dropdown mt-xxl-0 mt-4'>
                          <button class='btn  dropdown-toggle dropdown-btn opensans-regular' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                            Connect
                          </button>
                        </div> */}
                        </div>
                      </div>

                      {/* <div className='installed-link mt-4'>
                      <h3 className='m-0 opensans-regular'>Create a new page</h3>
                    </div> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Installed;
