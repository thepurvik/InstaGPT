import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import '../assets/styles/Chatbot.css';
import COUNTRYLIST from '../Country_Nationality_List.json';
import { getLocalStorage, getWithToken, patchWithToken, postWithToken, removeClassToBody } from '../API/Api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const ValidationErrors = {
  empty: {
    email: 'Email id Required',
    password: 'Password Required',
    sales_representative_name: 'Bot name required',
    company: 'Company name required',
    country: 'Country name required',
    city: 'City name required',
    address: 'Address required',
    tone: 'Tone required',
    product: 'Product name required',
    website: 'Website required',
    about_company: 'About Company required',
  },
};

const TONES = [
  { name: 'Friendly' },
  { name: 'Professional' },
  { name: 'Casual' },
  { name: 'Formal' },
  { name: 'Humorous' },
  { name: 'Persuasive' },
  { name: 'Empathetic' },
  { name: 'Confident' },
  { name: 'Assertive' },
  { name: 'Patient' },
  { name: 'Helpful' },
  { name: 'Supportive' },
  { name: 'Encouraging' },
  { name: 'Positive' },
  { name: 'Optimistic' },
  { name: 'Innovative' },
];

const ChatBotProfile = () => {
  const [loader, setLoader] = useState(false);
  const Navigate = useNavigate();
  const [companyValues, companySetValues] = useState({
    sales_representative_name: '',
    company: '',
    country: '',
    city: '',
    address: '',
    product: '',
    website: '',
    about_company: '',
    tone: '',
  });

  const [errors, setErrors] = useState({
    sales_representative_name: '',
    company: '',
    country: '',
    city: '',
    address: '',
    product: '',
    website: '',
    about_company: '',
    tone: '',
  });

  const { sales_representative_name, company, country, city, address, product, website, about_company, tone } = companyValues;

  const [apiTokenData, setApiTokenData] = useState('');
  const [botId, setBotId] = useState('');
  const [chatbotUrl, setChatbotUrl] = useState('');

  const bottomRef = useRef(null);

  const companyHandleChange = (e) => {
    companySetValues({ ...companyValues, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const [chatBoxPopUp, setChatBoxPopUp] = useState(false);

  useEffect(() => {
    removeClassToBody('no-chat');
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    getWithToken('company/', token)
      .then((response) => {
        if (response.status == 201) {
          console.log(response, ',.');
          setBotId(response?.data?.id);
          companySetValues({
            ...companyValues,
            sales_representative_name: response?.data?.sales_representative_name,
            company: response?.data?.company,
            country: response?.data?.country,
            city: response?.data?.city,
            address: response?.data?.address,
            product: response?.data?.product,
            website: response?.data?.website,
            about_company: response?.data?.about_company,
            tone: response?.data?.tone,
          });
          setChatbotUrl(response?.data?.CHATBOT_URL);
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

  const companyHandleClick = () => {
    const tempErrors = { ...errors };
    Object.keys(companyValues).map((key) => {
      if (!companyValues[key]) {
        tempErrors[key] = ValidationErrors.empty[key];
      }
    });
    setErrors(tempErrors);

    if (Object.values(tempErrors).filter((obj) => !!obj).length > 0) {
      return false;
    }
    setLoader(true);
    if (botId) {
      patchWithToken('company/' + botId + '/', apiTokenData, companyValues)
        .then((response) => {
          if (response.status == 200) {
            getBotDetails(apiTokenData);
            toast.success(response.message);
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
    } else {
      postWithToken('company/', apiTokenData, companyValues)
        .then((response) => {
          if (response.status == 201) {
            getBotDetails(apiTokenData);
            toast.success(response.message);
            setLoader(false);
          } else if (response.status == 400) {
            setLoader(false);
            toast.error(response.message);
          }
        })
        .catch((error) => {
          setLoader(false);
          toast.error('Something went wrong');
        });
    }
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    // send state to server with e.g. `window.fetch`
  };

  const [copySuccess, setCopySuccess] = useState('');
  const textArea = useRef(null);

  const copyToClipboard = async (e) => {
    // var copy_text = document.getElementById('copy-text').innerHTML;
    // await navigator.clipboard.writeText(copy_text).then(() => {
    //   setCopySuccess('Copied!');
    //   setTimeout(function () {
    //     setCopySuccess('Copy');
    //   }, 750);
    // });
    var range = document.createRange();
    range.selectNode(document.getElementById('copy-text'));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    setCopySuccess('Copied!');
    setTimeout(function () {
      setCopySuccess('Copy');
    }, 750);
  };

  return (
    <>
      <div className='intelichat-conatiner-right'>
        <div className='chatbot-container'>
          <div className='chatbot-header'>
            <h3 className='opensans-bold mb-0'>Chatbot Profile</h3>
          </div>
          {loader ? (
            <Loader />
          ) : (
            <div className='row m-0 mt-5 ps-md-5 ps-sm-3 ps-3'>
              <Col xs={12} md={12} lg={12} className='p-0'>
                <form onSubmit={onFormSubmit}>
                  <div className='chatbox-field'>
                    <div className='chatbox-input-text input-GPT new'>
                      <label className='opensans-medium'>Bot Name*</label>
                      <div className='chatbox-input-field'>
                        <input
                          type='text'
                          placeholder='John'
                          className='form-control chatbox-input'
                          id='sales_representative_name'
                          name='sales_representative_name'
                          value={sales_representative_name}
                          autoComplete='off'
                          onChange={companyHandleChange}
                        />
                        <div className='chat-error'>{errors.sales_representative_name && <p className='text-danger insta-smart-error'>{errors.sales_representative_name}</p>}</div>
                      </div>
                    </div>

                    <div className='chatbox-input-text input-GPT new'>
                      <label className='opensans-medium'>Company Name*</label>
                      <div className='chatbox-input-field'>
                        <input
                          type='text'
                          placeholder='Luna Design Agent'
                          className='form-control chatbox-input'
                          id='company'
                          name='company'
                          value={company}
                          autoComplete='off'
                          onChange={companyHandleChange}
                        />
                        <div className='chat-error'>{errors.company && <p className='text-danger insta-smart-error'>{errors.company}</p>}</div>
                      </div>
                    </div>

                    <div className='chatbox-input-text input-GPT new'>
                      <label className='opensans-medium'>Country*</label>
                      <div className='chatbox-input-field'>
                        <select className='form-control' name='country' value={country} onChange={companyHandleChange}>
                          <option selected hidden>
                            Choose the country
                          </option>
                          {COUNTRYLIST.map((row, i) => (
                            <option key={i}>{row?.en_short_name}</option>
                          ))}
                        </select>
                        <div className='chat-error'>{errors.country && <p className='text-danger insta-smart-error'>{errors.country}</p>}</div>
                      </div>
                    </div>

                    <div className='chatbox-input-text input-GPT new'>
                      <label className='opensans-medium'>City Name*</label>
                      <div className='chatbox-input-field'>
                        <input
                          type='text'
                          placeholder='New York'
                          className='form-control chatbox-input'
                          id='city'
                          name='city'
                          value={city}
                          autoComplete='off'
                          onChange={companyHandleChange}
                        />
                        <div className='chat-error'>{errors.city && <p className='text-danger insta-smart-error'>{errors.city}</p>}</div>
                      </div>
                    </div>

                    <div className='chatbox-input-text input-GPT new'>
                      <label className='opensans-medium'>Address*</label>
                      <div className='chatbox-input-field'>
                        <input
                          type='text'
                          placeholder='13th Street. 47 W 13th St'
                          className='form-control chatbox-input'
                          id='address'
                          name='address'
                          value={address}
                          autoComplete='off'
                          onChange={companyHandleChange}
                        />
                        <div className='chat-error'>{errors.address && <p className='text-danger insta-smart-error'>{errors.address}</p>}</div>
                      </div>
                    </div>

                    <div className='chatbox-input-text input-GPT new'>
                      <label className='opensans-medium'>Tone*</label>
                      <div className='chatbox-input-field'>
                        <select className='form-control' name='tone' value={tone} onChange={companyHandleChange}>
                          <option selected hidden>
                            Choose the Tone
                          </option>
                          {TONES.map((row, i) => (
                            <option key={i}>{row?.name}</option>
                          ))}
                        </select>
                        <div className='chat-error'>{errors.tone && <p className='text-danger insta-smart-error'>{errors.tone}</p>}</div>
                      </div>
                    </div>

                    <div className='chatbox-input-text input-GPT new'>
                      <label className='opensans-medium'>Product Name*</label>
                      <div className='chatbox-input-field'>
                        <input
                          type='text'
                          placeholder='Sales'
                          className='form-control chatbox-input'
                          id='product'
                          name='product'
                          value={product}
                          autoComplete='off'
                          onChange={companyHandleChange}
                        />
                        <div className='chat-error'>{errors.product && <p className='text-danger insta-smart-error'>{errors.product}</p>}</div>
                      </div>
                    </div>

                    <div className='chatbox-input-text input-GPT new'>
                      <label className='opensans-medium'>Website*</label>
                      <div className='chatbox-input-field'>
                        <input
                          type='text'
                          placeholder='https://www.google.com/'
                          className='form-control chatbox-input'
                          id='website'
                          name='website'
                          value={website}
                          autoComplete='off'
                          onChange={companyHandleChange}
                        />
                        <div className='chat-error'>{errors.website && <p className='text-danger insta-smart-error'>{errors.website}</p>}</div>
                      </div>
                    </div>

                    <div className='chatbox-input-text input-GPT new'>
                      <label className='opensans-medium'>About Company*</label>
                      <div className='chatbox-input-field'>
                        <textarea
                          rows='10'
                          className='form-control chatbox-input textarea-height'
                          placeholder='Message'
                          id='about_company'
                          name='about_company'
                          value={about_company}
                          autoComplete='off'
                          onChange={companyHandleChange}
                        ></textarea>
                        <div className='chat-error'>{errors.about_company && <p className='text-danger insta-smart-error'>{errors.about_company}</p>}</div>
                      </div>
                    </div>
                    {chatbotUrl && (
                      <div className='d-flex align-items-center justify-content-center'>
                        <a href={chatbotUrl} target='_blank' className='opensans-semibold mb-0 me-3' id='copy-text' ref={textArea}>
                          {chatbotUrl}
                        </a>
                        <div>
                          <button className='btn  btn-submit-login h-25 rounded-2 text-uppercase' onClick={copyToClipboard}>
                            {copySuccess || 'Copy'}
                          </button>
                        </div>
                      </div>
                    )}
                    <div className='pt-4 mb-4 text-center'>
                      <button className='btn btn-submit-login rounded-pill text-uppercase w-50' onClick={companyHandleClick}>
                        Train Agent
                      </button>
                    </div>
                  </div>
                </form>
              </Col>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatBotProfile;
