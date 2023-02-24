import React, { useEffect, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getLocalStorage, getWithToken, patchWithToken } from '../API/Api';
import Loader from '../components/Loader';
import TIMEZONE from '../Weekday_Time_List.json';

const InitialValues = {
  welcome_msg: '',
  product_information: '',
  week_day: '',
  open_hours: '',
  open_minutes: '',
  close_hours: '',
  close_minutes: '',
};

const weekValues = {
  week_day: '',
  open_hours: '',
  open_minutes: '',
  close_hours: '',
  close_minutes: '',
};

const ValidationErrors = {
  empty: {
    welcome_msg: 'Message required',
    product_information: 'Message required',
    week_day: 'Weekday required',
    open_hours: 'required',
    open_minutes: 'required',
    close_hours: 'required',
    close_minutes: 'required',
  },
};

const KnowledgeBaseSetMessage = () => {
  const [inputList, setInputList] = useState([
    {
      week_day: '',
      open_hours: '',
      open_minutes: '',
      close_hours: '',
      close_minutes: '',
      full_time: '',
    },
  ]);
  const [isChecked, setIsChecked] = useState(false);
  const [values, setValues] = useState({
    welcome_msg: '',
    product_information: '',
  });
  const [loader, setLoader] = useState(false);

  const [botId, setBotId] = useState('');
  const [apiTokenData, setApiTokenData] = useState('');

  const Navigate = useNavigate();

  const { welcome_msg, product_information } = values;

  const [errors, setErrors] = useState({
    welcome_msg: '',
    product_information: '',
    week_day: '',
    open_hours: '',
    open_minutes: '',
    close_hours: '',
    close_minutes: '',
    full_time: '',
  });

  const handleListAdd = () => {
    if (inputList.length < 7) {
      setInputList([
        ...inputList,
        {
          week_day: '',
          open_hours: '',
          open_minutes: '',
          close_hours: '',
          close_minutes: '',
          full_time: '',
        },
      ]);
    }
  };

  const handleChange = (event, index) => {
    if (index >= 0) {
      let tempArray = [];
      inputList.forEach((element, newIndex) => {
        if (index == newIndex) {
          let newObj = { ...element, [event.target.name]: event.target.value, full_time: event.target.checked };
          tempArray.push(newObj);
        } else {
          tempArray.push(element);
        }
      });
      setInputList(tempArray);
      setErrors({ ...errors, [event.target.name]: '' });
    } else {
      setValues({ ...values, [event.target.name]: event.target.value });
      setErrors({ ...errors, [event.target.name]: '' });
    }
  };

  const handleRemoveItem = (index) => {
    if (inputList.length > 1) {
      const newList = [...inputList];
      newList.pop();
      setInputList(newList);

      setErrors('');
    }
  };

  useEffect(() => {
    let token = getLocalStorage('apiToken');
    if (token) {
      setApiTokenData(JSON.parse(token));
      getBotDetails(JSON.parse(token));
    } else {
      Navigate('/login');
    }
  }, []);

  const getBotDetails = (token) => {
    setLoader(true);
    getWithToken('company_base/', token)
      .then((response) => {
        if (response.status == 201) {
          setBotId(response?.data?.id);
          setValues({
            ...values,
            welcome_msg: response?.data?.welcome_msg,
            product_information: response?.data?.product_information,
          });
          setLoader(false);
          let setNewWeekArray = [];

          response?.data?.bussiness_hour?.forEach((ele, i) => {
            if (inputList.length < response?.data?.bussiness_hour.length) {
              setNewWeekArray.push(weekValues);
            }
          });

          let responseWeekArray = [];
          let newResponseObj = {};

          response?.data?.bussiness_hour?.forEach((ele, indx) => {
            setNewWeekArray.forEach((element, index) => {
              if (indx == index) {
                let openGetHours = ele.opening_time.split(':');
                let openHours = openGetHours[0];
                let openMins = openGetHours[1];
                let closeGetHours = ele.closing_time.split(':');
                let closeHours = closeGetHours[0];
                let closeMins = closeGetHours[1];
                newResponseObj = {
                  week_day: ele.week_day,
                  close_hours: closeHours,
                  close_minutes: closeMins,
                  open_hours: openHours,
                  open_minutes: openMins,
                };
                responseWeekArray.push(newResponseObj);
              }
              setInputList(responseWeekArray);
            });
          });
        }
        if (response.status == 200) {
        }
      })
      .catch((error) => {
        toast.error('Something went wrong');
      });
  };

  const handleSubmit = () => {
    const tempErrors = { ...errors };
    Object.keys(values).map((key) => {
      if (!values[key]) {
        tempErrors[key] = ValidationErrors.empty[key];
      }
    });

    inputList.map((elem, i) => {
      Object.keys(elem).map((key) => {
        if (!elem[key]) {
          tempErrors[key] = ValidationErrors.empty[key];
        }
      });
    });

    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((obj) => !!obj).length > 0) {
      return false;
    }

    let addNewArray = [];
    if (inputList) {
      inputList.forEach((newData, i) => {
        let newArray = {
          week_day: newData.week_day,
          opening_time: `${newData?.open_hours}:${newData?.open_minutes}`,
          closing_time: `${newData?.close_hours}:${newData?.close_minutes}`,
        };

        addNewArray.push(newArray);
      });
    }
    const payload = {
      bussiness_hour: addNewArray,
      welcome_msg: welcome_msg,
      product_information: product_information,
    };
    setLoader(true);

    patchWithToken('company_base/' + botId + '/', apiTokenData, payload)
      .then((response) => {
        if (response.status == 200) {
          toast.success(response.message);
          setValues(InitialValues);
          getBotDetails(apiTokenData);
          setLoader(false);
        } else if (response.status == 400) {
          toast.error(response.message);
          setLoader(false);
        }
      })
      .catch((error) => {
        toast.error('Something went wrong');
      });
  };

  const getDisableData = (inputListWeekDay, Day) => {
    if (inputListWeekDay.filter((e) => e.week_day === Day).length > 0) {
      return true;
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className='chatbot-container'>
          {/* <div className='chatbot-header'>
          <h3 className='opensans-bold mb-0'>User Guide</h3>
        </div> */}
          <div className='m-0 mt-5 ps-md-5 ps-sm-3 ps-3'>
            <div className='chatbox-field'>
              <div>
                <div className='knowledgebase-text mb-4'>
                  <h3 className='opensans-bold'>Welcome Message</h3>
                </div>
                <div className='textarea-custom position-relative'>
                  <label className='opensans-semibold'>Bot Message</label>
                  <textarea
                    name='welcome_msg'
                    rows='5'
                    value={welcome_msg}
                    placeholder='Setup a welcome message for your users'
                    onChange={(event) => handleChange(event, -1)}
                  ></textarea>
                  <div className='chat-error'>{errors.welcome_msg && <p className='text-danger insta-smart-error'>{errors.welcome_msg}</p>}</div>
                </div>
                {/* <div className='d-flex justify-content-between mt-3'>
                <button className='btn btn-submit-discard rounded-3 text-uppercase'>Discard</button>
                <button className='btn btn-submit-save rounded-3 text-uppercase'>Save</button>
              </div> */}
              </div>
              <div className='mt-5'>
                <div className='knowledgebase-text mb-4'>
                  <h3 className='opensans-bold'>Product Information</h3>
                </div>
                <div className='textarea-custom position-relative'>
                  <label className='opensans-semibold'>Tell us about your product</label>
                  <textarea
                    className='opensans-regular'
                    name='product_information'
                    rows='5'
                    value={product_information}
                    placeholder='My business...'
                    onChange={(event) => handleChange(event, -1)}
                  ></textarea>
                  <div className='chat-error'>{errors.product_information && <p className='text-danger insta-smart-error'>{errors.product_information}</p>}</div>
                </div>
                {/* <div className='d-flex justify-content-between mt-3'>
                <button className='btn btn-submit-discard rounded-3 text-uppercase'>Discard</button>
                <button className='btn btn-submit-save rounded-3 text-uppercase'>Save</button>
              </div> */}
              </div>
              <div className='mt-5'>
                <div className='knowledgebase-text mb-4'>
                  <h3 className='opensans-bold'>Business Hour</h3>
                </div>
                {inputList.length > 0
                  ? inputList.map((elment, index) => (
                      <div
                        className='row select-custom mx-0 mb-3 justify-content-between'
                        // key={index}
                      >
                        <div className='col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-12 px-0'>
                          <label className='opensans-regular'>
                            Weekday
                            <span className='text-danger'>*</span>
                          </label>
                          <div className='mt-2'>
                            <select name='week_day' id={index} className='form-control' value={elment.week_day} onChange={(event) => handleChange(event, index)}>
                              <option value='' disabled>
                                Select Weekday
                              </option>
                              {TIMEZONE?.weeksDay?.map((dayObj, i) => {
                                return (
                                  <option key={i} disabled={getDisableData(inputList, dayObj.day)}>
                                    {dayObj.day}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className='chat-error'>{!elment.week_day ? errors.week_day && <p className='text-danger insta-smart-error'>{errors.week_day}</p> : ''}</div>
                        </div>
                        <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 px-0'>
                          <div className='row mx-0 align-items-center'>
                            {!elment?.full_time && (
                              <div className='col-xl-5 col-lg-12 col-md-12 col-sm-12 px-0'>
                                <label className='opensans-regular'>
                                  Opening Time<span className='text-danger'>*</span>
                                </label>
                                <div className='row mx-0 mt-2 select-hour'>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-6 px-0'>
                                    <select name='open_hours' id={index} className='form-control' value={elment.open_hours} onChange={(event) => handleChange(event, index)}>
                                      <option value='' disabled>
                                        hr
                                      </option>
                                      {TIMEZONE?.hours?.map((hourObj, i) => (
                                        <option key={i}>{hourObj.hour}</option>
                                      ))}
                                    </select>
                                    <div className='chat-error'>
                                      {!elment.open_hours ? errors.open_hours && <p className='text-danger insta-smart-error'>{errors.open_hours}</p> : ''}
                                    </div>
                                  </div>

                                  <div className='col-xl-6 col-lg-6 col-md-6 col-6 px-0'>
                                    <select name='open_minutes' id={index} className='form-control' value={elment.open_minutes} onChange={(event) => handleChange(event, index)}>
                                      <option value='' disabled>
                                        min
                                      </option>
                                      {TIMEZONE?.minutes?.map((minObj, i) => (
                                        <option key={i}>{minObj.min}</option>
                                      ))}
                                    </select>
                                    <div className='chat-error'>
                                      {!elment.open_minutes ? errors.open_minutes && <p className='text-danger insta-smart-error'>{errors.open_minutes}</p> : ''}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {!elment?.full_time && (
                              <div className='col-xl-5 col-lg-12 col-md-12 col-sm-12 px-0'>
                                <label className='opensans-regular'>
                                  Closing Time<span className='text-danger'>*</span>
                                </label>
                                <div className='row mx-0 mt-2 select-hour'>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-6 px-0'>
                                    <select
                                      name='close_hours'
                                      id={index}
                                      className='form-control'
                                      value={elment.close_hours}
                                      onChange={(event) => handleChange(event, index)}
                                      // disabled={!elment.open_hours}
                                    >
                                      <option value='' disabled>
                                        hr
                                      </option>
                                      {TIMEZONE?.hours?.map((hourObj, i) => (
                                        <option key={i} disabled={hourObj.hour < elment.open_hours}>
                                          {hourObj.hour}
                                        </option>
                                      ))}
                                    </select>
                                    <div className='chat-error'>
                                      {!elment.close_hours ? errors.close_hours && <p className='text-danger insta-smart-error'>{errors.close_hours}</p> : ''}
                                    </div>
                                  </div>
                                  <div className='col-xl-6 col-lg-6 col-md-6 col-6 px-0'>
                                    <select
                                      name='close_minutes'
                                      id={index}
                                      className='form-control'
                                      value={elment.close_minutes}
                                      onChange={(event) => handleChange(event, index)}
                                      // disabled={!elment.open_minutes}
                                    >
                                      <option value='' disabled>
                                        min
                                      </option>
                                      {TIMEZONE?.minutes?.map((minObj, i) => (
                                        <option key={i}>{minObj.min}</option>
                                      ))}
                                    </select>
                                    <div className='chat-error'>
                                      {!elment.close_minutes ? errors.close_minutes && <p className='text-danger insta-smart-error'>{errors.close_minutes}</p> : ''}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className='col-xl-2 col-lg-12 col-md-12 col-sm-12 px-0'>
                              <div className='checkbox-wrapper'>
                                <label>24/7</label>
                                <div className='mt-3'>
                                  {/* <input type='checkbox' className={isChecked ? 'checked' : ''} checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} /> */}
                                  <input
                                    type='checkbox'
                                    id={index}
                                    className={elment?.full_time ? 'checked' : ''}
                                    name='full_time'
                                    // checked={elment?.full_time}
                                    onChange={(event) => handleChange(event, index)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : 'No item in the list '}
              </div>
              <div className='d-flex mt-4'>
                {inputList.length < 7 && (
                  <button className='btn btn-submit-add rounded-3' onClick={() => handleListAdd()}>
                    <span className='me-2'>
                      <AiOutlinePlusCircle />
                    </span>
                    Add
                  </button>
                )}

                {inputList.length !== 1 && (
                  <button className={`btn btn-submit-add rounded-3 ${inputList.length == 7 ? 'ms-0' : 'ms-3'} `} onClick={() => handleRemoveItem()}>
                    <span className='me-2'>
                      <AiOutlineMinusCircle />
                    </span>
                    Remove
                  </button>
                )}
              </div>

              <div className='d-flex justify-content-center  my-5'>
                <button className='btn btn-submit-login rounded-pill text-uppercase w-50' onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default KnowledgeBaseSetMessage;
