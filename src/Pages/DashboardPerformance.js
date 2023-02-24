import React, { useState, useEffect } from 'react';
import '../App.css';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import USERS_ICON from '../assets/icons/newUsers.svg';
import MESSAGES_ICON from '../assets/icons/totalMessages.svg';
import { toast } from 'react-toastify';
import { getLocalStorage, postWithToken } from '../API/Api';
import { useNavigate } from 'react-router-dom';
import ConversationChart from './ConversationChart';
import ContactChart from './ContactChart';
import CHATBOX_ICON from '../assets/icons/ChatBox_Icon.svg';
import CONTACT_ICON from '../assets/icons/Contact.svg';
import Loader from '../components/Loader';

const DashboardPerformance = () => {
  const Navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [dashData, setDashData] = useState('');
  const [apiTokenData, setApiTokenData] = useState('');
  const [userCount, setUserCount] = useState('');
  const [userPercent, setUserPercent] = useState('');
  const [messageToBot, setMessageToBot] = useState('');
  const [messageToBotPer, setMessageToBotPer] = useState('');
  const [messageFromBot, setMessageFromBot] = useState('');
  const [messageFromBotPer, setMessageFromBotPer] = useState('');

  useEffect(() => {
    let token = getLocalStorage('apiToken');
    if (token) {
      setLoader(false);
    }
    if (!token) {
      Navigate('/login');
    } else {
      setApiTokenData(JSON.parse(token));
      getDashboardData(JSON.parse(token));
    }
  }, []);
  const getDashboardData = (token) => {
    let body = {
      filter: { start: null, end: null },
    };
    postWithToken('DashboardAPI', token, body)
      .then((response) => {
        if (response.status == 200) {
          setDashData(response.data);
          setUserCount(response?.data?.user?.count);
          setUserPercent(response?.data?.user?.since_last_month);
          setMessageToBot(response?.data?.message_to_bot?.count);
          setMessageToBotPer(response?.data?.message_to_bot?.since_last_month);
          setMessageFromBot(response?.data?.message_from_bot?.count);
          setMessageFromBotPer(response?.data?.message_from_bot?.since_last_month);
        } else if (response.status == 400) {
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
        <div className='dashboard-performance-card pt-5'>
          {/* <div className='row m-0 px-xl-3 px-lg-3 px-md-3 px-sm-2 px-xs-2'>
          <div className='col-xl-12 col-sm-12 mb-xl-0 mb-4'>
            <div className='db-header-raw align-items-center'>
              <span className='new-text-grey opensans-light'>Filter data of</span> <input type='text' className='form-control ' />{' '}
              <span className='new-text-grey opensans-light'>for</span> <input type='text' className='form-control ' />
            </div>
          </div>
        </div> */}
          <div className='row m-0 pt-5 px-xl-3 px-lg-3 px-md-3 px-sm-2 px-xs-2'>
            <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-xl-0 mb-4'>
              <div className='card'>
                <div className='card-header p-3 pt-2'>
                  <div className='db-icons-fr'>
                    <img src={USERS_ICON} className='img-fluid' alt='users-icon' />
                  </div>
                  <div className='text-end pt-1'>
                    <p className='text-sm mb-0 db-title-color opensans-regular'>New Users</p>
                    <h4 className='mb-0 db-title-color opensans-regular'>{userCount.toLocaleString()}</h4>
                  </div>
                </div>
                <hr className='dark horizontal my-0 hr-custom' />
                <div className='card-footer p-3 text-center'>
                  <p className='mb-0 text-grey opensans-regular'>
                    <span className='text-green text-sm arrow-position'>
                      {{ userPercent } >= '0' ? <BsArrowUp /> : <BsArrowDown />}
                      {userPercent}%{' '}
                    </span>
                    Since last month
                  </p>
                </div>
              </div>
            </div>
            <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-xl-0 mb-4'>
              <div className='card'>
                <div className='card-header p-3 pt-2'>
                  <div className='db-icons-fr'>
                    <img src={MESSAGES_ICON} className='img-fluid' alt='messages-icon' />
                  </div>
                  <div className='text-end pt-1'>
                    <p className='text-sm mb-0 db-title-color opensans-regular'>Message to bots</p>
                    <h4 className='mb-0 db-title-color opensans-regular'>{messageToBot.toLocaleString()}</h4>
                  </div>
                </div>
                <hr className='dark horizontal my-0 hr-custom' />
                <div className='card-footer p-3 text-center'>
                  <p className='mb-0 text-grey opensans-regular'>
                    <span className='text-green text-sm arrow-position'>
                      {{ messageToBotPer } >= '0' ? <BsArrowUp /> : <BsArrowDown />}
                      {messageToBotPer}%{' '}
                    </span>
                    Since last month
                  </p>
                </div>
              </div>
            </div>
            <div className='col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-xl-0 mb-4'>
              <div className='card'>
                <div className='card-header p-3 pt-2'>
                  <div className='db-icons-fr'>
                    <img src={MESSAGES_ICON} className='img-fluid' alt='messages-icon' />
                  </div>
                  <div className='text-end pt-1'>
                    <p className='text-sm mb-0 db-title-color opensans-regular'>Message from bots</p>
                    <h4 className='mb-0 db-title-color opensans-regular'>{messageFromBot.toLocaleString()}</h4>
                  </div>
                </div>
                <hr className='dark horizontal my-0 hr-custom' />
                <div className='card-footer p-3 text-center'>
                  <p className='mb-0 text-grey opensans-regular'>
                    <span className='text-green text-sm arrow-position'>
                      {{ messageFromBotPer } >= '0' ? <BsArrowUp /> : <BsArrowDown />}
                      {messageFromBotPer}%{' '}
                    </span>
                    Since last month
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className='row mt-5 mx-0'> */}
          <div className='row m-0 pt-5 px-xl-3 px-lg-3 px-md-3 px-sm-2 px-xs-2'>
            <div className='col-xl-5 col-lg-5 col-sm-12 mb-xl-0 mb-4'>
              <div className='charts-card p-2'>
                <div className='d-flex align-items-center flex-wrap card-box-text'>
                  <img src={CHATBOX_ICON} alt='chatbox-icon' />
                  <h1 className='opensans-bold text-skyBlue me-2 my-0'>{dashData?.conversations?.count}</h1>
                  <h4 className='opensans-bold text-greenBlack my-0'>Conversations</h4>
                </div>
                <ConversationChart data={dashData?.conversations} />
              </div>
            </div>
            <div className='col-xl-7 col-lg-7 col-sm-12 mb-xl-0 mb-4'>
              <div className='charts-card p-2'>
                <div className='d-flex align-items-center flex-wrap card-box-text'>
                  <img src={CONTACT_ICON} alt='contact-icon' />
                  <h1 className='opensans-bold text-skyBlue me-2 my-0'>{dashData?.contact?.count}</h1>
                  <h4 className='opensans-bold text-greenBlack my-0'>Contacts</h4>
                </div>
                <ContactChart data={dashData?.contact} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPerformance;
