import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { addClassToBody } from '../API/Api';
import '../assets/styles/NotFound.css';

const NotFound = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    addClassToBody('no-chat');
  }, []);

  return (
    <>
      <div class='error'>
        <div class='container-floud'>
          <div class='col-xs-12 ground-color text-center'>
            <div class='container-error-404'>
              <div class='clip'>
                {/* <div class='shadow'> */}
                <div class=''>
                  <span class='digit thirdDigit opensans-bold'>4</span>
                </div>
              </div>
              <div class='clip'>
                <div class='ms-3'>
                  <span class='digit secondDigit opensans-bold'>0</span>
                </div>
              </div>
              <div class='clip'>
                <div class='ms-3'>
                  <span class='digit firstDigit opensans-bold'>4</span>
                </div>
              </div>
            </div>
            <h2 class='h1'>Sorry! Page not found</h2>

            <div className='mt-3'>
              <button className='btn btn-submit-login w-50 text-decoration-underline text-truncate' onClick={() => Navigate('/')}>
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
