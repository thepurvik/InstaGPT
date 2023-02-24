import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addClassToBody, postWithoutToken } from '../../API/Api';
import { validateEmail, validatePwd } from '../../assets/Helper/utils';

const ValidationErrors = {
  empty: {
    email: 'Email id Required',
  },
  invalid: {
    email: 'Invalid Email',
  },
};

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({
    email: '',
  });

  const { email } = values;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  useEffect(() => {
    addClassToBody('auth-page');
  }, []);

  const handleClick = () => {
    const tempErrors = { ...errors };
    Object.keys(values).map((key) => {
      if (!values[key]) {
        tempErrors[key] = ValidationErrors.empty[key];
      } else {
        if (key == 'email' && !validateEmail(values[key])) {
          tempErrors.email = ValidationErrors.invalid.email;
        }
      }
    });
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((obj) => !!obj).length > 0) {
      return false;
    }
    postWithoutToken('forgetpassword_mail', values)
      .then((response) => {
        if (response.status == 200) {
          toast.success(response.message);
        } else if (response.status == 400) {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        toast.error('Something went wrong');
      });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    // send state to server with e.g. `window.fetch`
  };

  return (
    <>
      <>
        <div className='container h-100-vh'>
          <div className='row h-100-vh justify-content-center'>
            <div className='col-xl-5 col-lg-5 col-md-7 col-sm-12 col-12 align-self-center'>
              <form onSubmit={onFormSubmit}>
                <div className='login-card'>
                  <div className='login-title'>
                    <h4 className='opensans-bold mb-0 text-themeBlack text-center'>FORGOT PASSWORD</h4>
                  </div>
                  <div className='form-group position-relative input-GPT'>
                    <label htmlFor='email' className='text-themeBlack opensans-semibold font16 mb-1'>
                      Email*:
                    </label>
                    <input
                      type='text'
                      className='form-control auth-input'
                      id='email'
                      name='email'
                      value={email}
                      placeholder='johnny@intelichat.com'
                      autoComplete='off'
                      onChange={handleChange}
                    />
                    {errors.email && <p className='text-danger insta-smart-error'>{errors.email}</p>}
                  </div>

                  <div className='pt-2'>
                    <button className='btn btn-submit-login text-uppercase' onClick={handleClick}>
                      Send Mail
                    </button>
                  </div>

                  <div className='pt-2 text-end'>
                    <Link to='/login' className='opensans-semibold color-theme-blue'>
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ForgotPassword;
