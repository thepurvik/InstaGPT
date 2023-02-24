import React, { useEffect, useState } from 'react';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { HashLink as Link } from 'react-router-hash-link';
import { toast } from 'react-toastify';
import { addClassToBody, getLocalStorage, postWithoutToken, setLocalStorage } from '../../API/Api';
import { validateEmail, validatePwd } from '../../assets/Helper/utils';
import { useNavigate } from 'react-router-dom';

const ValidationErrors = {
  empty: {
    email: 'Email id Required',
    password: 'Password Required',
  },
  invalid: {
    email: 'Invalid Email',
    // password: 'Invalid password',
  },
};

const LoginForm = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const Navigate = useNavigate();

  const { email, password } = values;

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  useEffect(() => {
    addClassToBody('auth-page');
    let token = getLocalStorage('apiToken');
    if (token) {
      Navigate('/dashboard');
    }
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
        // if (key == 'password' && !validatePwd(values[key])) {
        //   tempErrors.password = ValidationErrors.invalid.password;
        // }
      }
    });
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((obj) => !!obj).length > 0) {
      return false;
    }

    postWithoutToken('login/', values)
      .then((response) => {
        if (response.status == 200) {
          toast.success(response.message);
          setLocalStorage('apiToken', response?.data?.access);
          Navigate('/dashboard');
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
      <div className='container h-100-vh'>
        <div className='row h-100-vh justify-content-center'>
          <div className='col-xl-5 col-lg-5 col-md-7 col-sm-12 col-12 align-self-center'>
            <div className='login-card'>
              <div className='login-title'>
                <h4 className='opensans-bold mb-0 text-themeBlack text-center'>SIGN IN TO YOUR ACCOUNT</h4>
              </div>
              <form onSubmit={onFormSubmit}>
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

                <div className='form-group position-relative input-GPT'>
                  <label htmlFor='password' className='text-themeBlack opensans-semibold font16 mb-1'>
                    Password*:
                  </label>
                  <div className='input-group mb-0'>
                    <input
                      type={showPwd ? 'text' : 'password'}
                      className='form-control auth-input pass border-right-0'
                      value={password}
                      id='password'
                      name='password'
                      placeholder='**********'
                      onChange={handleChange}
                      autoComplete='off'
                    />
                    <div className='input-group-append'>
                      <button className='btn btn-show-eye' type='button' onClick={() => setShowPwd(!showPwd)}>
                        {!showPwd ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                      </button>
                    </div>
                  </div>
                  {errors.password && <p className='text-danger insta-smart-error'>{errors.password}</p>}
                </div>

                <div className='pt-2'>
                  <button className='btn btn-submit-login text-uppercase' onClick={handleClick}>
                    Sign In
                  </button>
                </div>
              </form>

              <div className='row'>
                <div className='col-md-6 col-sm-12 col-xs-12 mt-2'>
                  <div className='text-start'>
                    <Link to='/forgotpassword' className='opensans-semibold color-theme-blue'>
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className='col-md-6 col-sm-12 col-xs-12 mt-2'>
                  <div className='text-md-end text-sm-start text-xs-start'>
                    <Link to='/register' className='opensans-semibold color-theme-blue'>
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
              <div className='col-md-12 col-sm-12 col-xs-12 mt-2'>
                <div className='text-start'>
                  <Link to='/testchatbot' className='opensans-semibold color-theme-blue'>
                    Chatbot
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
