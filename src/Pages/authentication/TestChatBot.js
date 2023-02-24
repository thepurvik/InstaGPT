import React, { useState, useEffect, useRef } from 'react';
import CHATBOX_LOGO from '../../assets/icons/ChatBox_Logo.svg';
import CHATBOT_ICON from '../../assets/icons/ChatBot_icon.svg';
import ThreeDotLoader from '../../components/ThreeDotLoader';
import { toast } from 'react-toastify';
import { addClassToBody, getLocalStorage, postWithoutToken, postWithToken, removeClassToBody } from '../../API/Api';
import Linkify from 'react-linkify';
import { useLocation } from 'react-router-dom';

const TestChatBot = () => {
  const initial_value = {
    text: '',
  };

  const location = useLocation();
  console.log(location.search.split('=')[1], '<>');

  const [chatData, setChatData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [values, setValues] = useState('');

  const [apiTokenData, setApiTokenData] = useState('');

  const bottomRef = useRef(null);
  const handleClick = (e) => {
    e.preventDefault();
    if (values != '') {
      let newObj = { prmt: values };
      chatData.push(newObj);
      let body = {
        prompt: values,
      };
      setLoader(true);
      setValues('');
      postWithoutToken('LoginChatGPTAPI' + `${location.search}`, body)
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
          toast.error('Something went wrong 1');
          setLoader(false);
        });
    } else {
      toast.dismiss();
      toast.error('Message is empty');
      setLoader(false);
    }
  };
  useEffect(() => {
    addClassToBody('no-chat');
    addClassToBody('auth-page');
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatData]);

  return (
    <>
      {
        <div className='d-flex align-items-center h-100'>
          <div className='test-chatbox-container'>
            <div className='chatbox-header'>
              <div className='chatbox-header-icon'>
                <div className='chatbox-logo'>
                  <img src={CHATBOX_LOGO} alt='chatbox-logo' />
                </div>
              </div>
              <div className='chatbox-header-text'>
                <h3>Test bot</h3>
                <p>Online</p>
              </div>
            </div>
            <div className='chatbox-body p-3'>
              <>
                {chatData?.map((obj, i) => {
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
                        </div>
                      )}
                      <div ref={bottomRef} />
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
              <input type='text' className='form-control' placeholder='Text Message' value={values} onChange={(e) => setValues(e.target.value)} autoComplete='off' />
              <div className='h-100' onClick={handleClick}>
                <button className='btn btn-submit-login rounded-pill new h-100'>Send</button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
};

export default TestChatBot;
