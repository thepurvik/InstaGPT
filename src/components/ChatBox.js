import React, { useEffect, useRef, useState } from 'react';
import '../assets/styles/Chatbot.css';
import { MdArrowBackIos } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';
import CHATBOX_LOGO from '../assets/icons/ChatBox_Logo.svg';
import CHATBOT_ICON from '../assets/icons/ChatBot_icon.svg';
import CHATBOX_ICON from '../assets/icons/ChatBox_Icon.svg';
import { toast } from 'react-toastify';
import { IoClose } from 'react-icons/io5';
import { getLocalStorage, getWithToken, postWithToken } from '../API/Api';
import ThreeDotLoader from './ThreeDotLoader';
import Linkify from 'react-linkify';

const initial_value = {
  text: '',
};

const ChatBox = () => {
  const [chatBoxPopUp, setChatBoxPopUp] = useState(false);
  const [values, setValues] = useState('');
  // const [values, setValues] = useState({
  //   text: '',
  // });

  const [messages, setMessages] = useState([]);

  const [loader, setLoader] = useState(false);

  const bottomRef = useRef(null);

  const [chatData, setChatData] = useState([]);

  const [apiTokenData, setApiTokenData] = useState('');
  const [botName, setBotName] = useState('');

  // const handleChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  const getBotDetails = (token) => {
    // setLoader(true);
    getWithToken('company/', token)
      .then((response) => {
        if (response.status == 201) {
          setBotName(response?.data?.sales_representative_name);
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

  const handleClick = (e) => {
    setValues(initial_value);

    e.preventDefault();
    if (values != '') {
      let newObj = { prmt: values };
      chatData.push(newObj);
      let body = {
        prompt: values,
      };
      setLoader(true);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      postWithToken('ChatGPTAPI_', apiTokenData, body)
        .then((response) => {
          if (response.status == 200) {
            chatData.pop();
            setChatData([...chatData, response.data]);
            setLoader(false);
          } else if (response.status == 400) {
            toast.error(response.message);
            setLoader(false);
          }
        })
        .catch((error) => {
          toast.error('Something went wrong');
          setLoader(false);
        });
    } else {
      toast.dismiss();
      toast.error('Message is empty');
      setLoader(false);
    }
  };

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    let token = getLocalStorage('apiToken');
    if (token) {
      setApiTokenData(JSON.parse(token));
      getBotDetails(JSON.parse(token));
    }
  }, [chatData, chatBoxPopUp]);

  return (
    <>
      {chatBoxPopUp && <div className='chatbox-overlay' onClick={() => setChatBoxPopUp(!chatBoxPopUp)}></div>}
      {chatBoxPopUp && (
        <div className='chatbox-container'>
          <div className='chatbox-header'>
            <div className='chatbox-header-icon'>
              {/* <div className='cursor-pointer' onClick={() => setChatBoxPopUp(!chatBoxPopUp)}>
                <MdArrowBackIos />
              </div> */}
              <div className='cursor-pointer chatbox-close-icon' onClick={() => setChatBoxPopUp(!chatBoxPopUp)}>
                <IoClose />
              </div>
              <div className='chatbox-logo'>
                <img src={CHATBOX_LOGO} alt='chatbox-logo' />
              </div>
            </div>
            <div className='chatbox-header-text'>
              <h3>{botName}</h3>
              <p>Online</p>
            </div>
          </div>
          <div className='chatbox-body p-3'>
            <>
              {chatData.length > 0 &&
                chatData?.map((obj, i) => {
                  return (
                    <>
                      <div className='d-flex align-items-center justify-content-end mt-3'>
                        <div className='chatbox-user-text'>
                          <p className='m-0'>{obj?.prmt}</p>
                        </div>
                        <div className='chatbox-user-icon' style={{ marginLeft: '10px' }}>
                          <img src={CHATBOT_ICON} alt='chatbot-icon' />
                        </div>
                      </div>
                      <div ref={bottomRef} />
                      {/* {loader ? (
                      <>
                        {!obj?.text && (
                          <div className='d-flex align-items-center'>
                            <div className='chatbox-user-icon'>
                              <img src={CHATBOT_ICON} alt='chatbot-icon' />
                            </div>
                            <ThreeDotLoader />
                          </div>
                        )}
                      </>
                    ) : (
                      ''
                    )} */}
                      {obj?.text && (
                        <div className='d-flex align-items-center mt-3'>
                          <div className='chatbox-user-icon' style={{ marginRight: '10px' }}>
                            <img src={CHATBOT_ICON} alt='chatbot-icon' />
                          </div>
                          <div className='chatbox-user-text'>
                            <p className='m-0'>
                              <Linkify>{obj?.text}</Linkify>
                            </p>
                          </div>
                          <div ref={bottomRef} />
                        </div>
                      )}
                    </>
                  );
                })}
            </>
          </div>
          {loader ? (
            <>
              <div className='d-flex align-items-center p-3'>
                <div className='chatbox-user-icon'>
                  <img src={CHATBOT_ICON} alt='chatbot-icon' />
                </div>
                <ThreeDotLoader />
              </div>
            </>
          ) : (
            ''
          )}
          <hr />
          <form className='chatbox-group d-flex justify-content-between align-items-center my-3 px-3' type='submit'>
            {/* <input type='text' className='form-control' placeholder='Text Message' name='text' value={values.text} onChange={handleChange} /> */}
            <input type='text' className='form-control' placeholder='Text Message' name='text' value={values.text} onChange={(e) => setValues(e.target.value)} autoComplete='off' />
            <div className='h-100' onClick={handleClick}>
              <button className='btn btn-submit-login rounded-pill new h-100'>Send</button>
            </div>
          </form>
        </div>
      )}
      <div className='chatbox-icon' onClick={() => setChatBoxPopUp(!chatBoxPopUp)}>
        <img src={CHATBOX_ICON} alt='chatbox-icon' />
      </div>
    </>
  );
};

export default ChatBox;
