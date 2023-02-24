import React, { useEffect, useState } from 'react';
import '../assets/styles/AutoResponse.css';
import FACEBOOK_ICON from '../assets/icons/Facebook.svg';
import WHATSAPP_ICON from '../assets/icons/Whatsapp.svg';
import INSTAGRAM_ICON from '../assets/icons/Instagram.svg';
import CHATBOX_LOGO from '../assets/icons/ChatBox_Logo.svg';
import { AiOutlineSearch } from 'react-icons/ai';
import { getLocalStorage, getWithToken, patchWithToken } from '../API/Api';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const AutoResponse = () => {
  const [autoresponseValues, setAutoResponseValue] = useState(false);
  const [loader, setLoader] = useState(false);
  const Navigate = useNavigate();
  const [apiTokenData, setApiTokenData] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [userName, setUserName] = useState('');
  const [userFbId, setUserFbId] = useState('');
  useEffect(() => {
    let token = getLocalStorage('apiToken');
    if (token) {
      setApiTokenData(JSON.parse(token));
      getBotDetails(JSON.parse(token));
      GetFBAuthFlow(JSON.parse(token));
    } else {
      Navigate('/login');
    }
  }, []);

  const getBotDetails = (token) => {
    // setLoader(true);
    getWithToken('company/', token)
      .then((response) => {
        if (response.status == 201) {
          setAutoResponseValue(response?.data?.is_autoresponce);
          setCompanyId(response?.data?.id);
          setLoader(false);
        }
        if (response.status == 200) {
          setLoader(false);
        }
      })
      .catch((error) => {
        toast.error('Something went wrong');
      });
  };

  const GetFBAuthFlow = (token) => {
    // setLoader(true);
    getWithToken('facebook_authflow', token)
      .then((response) => {
        if (response.status == 200) {
          setUserName(response?.data?.insta_username);
          setUserFbId(response?.data?.instagram_bussiness_account_id);
          // setLoader(false);
        } else if (response.status == 400) {
          // toast.error(response.message);
          // setLoader(false);
        }
      })
      .catch((error) => {
        // setLoader(false);
        toast.error('Something went wrong');
      });
  };

  const changeAutoResponseStatus = () => {
    // setLoader(true);
    if (companyId) {
      const payload = {
        is_autoresponce: autoresponseValues == false ? true : false,
      };
      patchWithToken('company/' + companyId + '/', apiTokenData, payload)
        .then((response) => {
          if (response.status == 200) {
            if (response.data.is_autoresponce) {
              setAutoResponseValue(true);
              getBotDetails(apiTokenData);
              toast.dismiss();
              toast.success('Autoresponse Activated.');
            } else {
              setAutoResponseValue(false);
              getBotDetails(apiTokenData);
              toast.dismiss();
              toast.error('Autoresponse deactivated.');
            }
            setLoader(false);
          } else if (response.status == 400) {
            setLoader(false);
            toast.error(response.message);
          }
        })
        .catch((error) => {
          toast.error('Something went wrong');
          setLoader(false);
        });
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className='chatbot-container'>
          <div className='chatbot-header'>
            <h3 className='opensans-bold mb-0'>Auto Response</h3>
          </div>
          {/* <div className='autoresponse-navheader d-flex flex-wrap justify-content-between align-items-center px-md-5 px-2 py-sm-2'>
          <div className='intelichat-conatiner-right-select  d-flex align-items-center'>
            <label className='pe-4'>Select bot</label>
            <select name='' className='form-control'>
              <option>john</option>
              <option>1</option>
            </select>
          </div>
          <div className='intelichat-conatiner-right-input'>
            <div class='input-box'>
              <input type='text' class='form-control' placeholder='Search' />
              <AiOutlineSearch />
            </div>
          </div>
        </div> */}

          <div className='m-0 pt-5 ps-md-5 ps-sm-3 ps-3'>
            <div className='chatbox-field'>
              {/* <div className='facebook'>
                <div className='autoresponse-main'>
                  <div className='autoresponse-header p-3 d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center header-icon'>
                      <img src={FACEBOOK_ICON} alt='facebook-icon' />
                      <h1 className='opensans-regular ms-2'>Facebook</h1>
                    </div>
                    <div className='switch--background'>
                      <label className='switch'>
                      <input type='checkbox' id='' />
                        <span className='slider round'></span>
                      </label>
                    </div>
                  </div>
                  <div className='autoresponse-body row mx-0 align-items-center py-4 px-2'>
                    <div className='col-xxl-7 col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 px-0'>
                      <div className='d-flex'>
                        <div className='flex-shrink-0 autoresponse-chatbox-logo'>
                          <img src={CHATBOX_LOGO} alt='chatbox-logo' />
                        </div>
                        <div className='flex-grow-1 ms-3 autoresponse-body-text'>
                          <h3 className='opensans-bold'>John Luna Design Agent</h3>
                          <p className='opensans-regular'>0001192495171461</p>
                        </div>
                      </div>
                    </div>
                    <div className='col-xxl-5 col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 px-0 text-center autoresponse-btn'>
                      <button className='btn btn-submit-login rounded-pill text-uppercase'>View Conversation</button>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className='whatsapp mt-5'>
                <div className='autoresponse-main'>
                  <div className='autoresponse-header p-3 d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center header-icon'>
                      <img src={WHATSAPP_ICON} alt='facebook-icon' />
                      <h1 className='opensans-regular ms-2'>Whatsapp</h1>
                    </div>
                    <div className='switch--background'>
                      <label className='switch'>
                        <input type='checkbox' id='' />
                        <span className='slider round'></span>
                      </label>
                    </div>
                  </div>
                  <div className='autoresponse-body row mx-0 align-items-center py-4 px-2'>
                    <div className='col-xxl-7 col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 px-0'>
                      <div className='d-flex'>
                        <div className='flex-shrink-0 autoresponse-chatbox-logo'>
                          <img src={CHATBOX_LOGO} alt='chatbox-logo' />
                        </div>
                        <div className='flex-grow-1 ms-3 autoresponse-body-text'>
                          <h3 className='opensans-bold'>John Luna Design Agent</h3>
                          <p className='opensans-regular'>0001192495171461</p>
                        </div>
                      </div>
                    </div>
                    <div className='col-xxl-5 col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 px-0 text-center autoresponse-btn'>
                      <button className='btn btn-submit-login rounded-pill text-uppercase '>View Conversation</button>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className='instagram mt-5'>
                <div className='autoresponse-main'>
                  <div className='autoresponse-header p-3 d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center header-icon'>
                      <img src={INSTAGRAM_ICON} alt='facebook-icon' />
                      <h1 className='opensans-regular ms-2'>Instagram</h1>
                    </div>
                    <div className='switch--background'>
                      <label className='switch'>
                        <input type='checkbox' id='' name='autoresponseValues' checked={autoresponseValues} onChange={() => changeAutoResponseStatus()} />
                        <span className='slider round'></span>
                      </label>
                    </div>
                  </div>
                  <div className='autoresponse-body row mx-0 align-items-center py-4 px-2'>
                    <div className='col-xxl-7 col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 px-0'>
                      <div className='d-flex'>
                        <div className='flex-shrink-0 autoresponse-chatbox-logo'>
                          <img src={CHATBOX_LOGO} alt='chatbox-logo' />
                        </div>
                        {userName ? (
                          <div className='flex-grow-1 ms-3 autoresponse-body-text'>
                            <h3 className='opensans-bold'>{userName}</h3>
                            <p className='opensans-regular'>{userFbId}</p>
                          </div>
                        ) : (
                          <div className='flex-grow-1 ms-md-3 ms-0 autoresponse-body-text'>
                            <h3 className='opensans-bold'>Chatbot Agent</h3>
                            <p className='opensans-regular'>Chatbot ID</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <div className='col-xxl-5 col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 px-0 text-center autoresponse-btn mt-xxl-0 mt-lg-0 mt-4'>
                      <button className='btn btn-submit-login rounded-pill text-uppercase '>View Conversation</button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AutoResponse;
