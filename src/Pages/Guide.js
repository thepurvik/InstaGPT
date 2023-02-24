import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import INTELICHAT_LOGO from '../assets/icons/Intelichat_logo.svg';
import Sidebar from '../components/Sidebar';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { addClassToBody, getLocalStorage } from '../API/Api';
import ToogleSidebar from '../components/ToogleSidebar';

const Guide = () => {
  const [activeTab, setActiveTab] = useState('1');
  const Navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    addClassToBody('no-chat');
  }, []);

  return (
    <>
      <div className='d-flex'>
        <Sidebar />
        <div className='sidebar-menu-right'>
          <div className='intelichat-container h-100'>
            <div className='row m-0 h-100'>
              <div className='col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-12 intelichat-conatiner-left' id='PopUpShowHide'>
                <ToogleSidebar />
                <div className='intelichat-conatiner-contain'>
                  <div className='intelichat-header-text'>
                    <h3>Guide</h3>
                  </div>
                  <div className='intelichat-body-text'>
                    <div className='intelichat-link'>
                      {/* <Link to='/guide' className='active '>
                        Guide
                      </Link> */}
                      <ul className='ps-0'>
                        <li className={`mb-3 ${activeTab == 1 ? 'active' : ''}`} onClick={() => setActiveTab('1')}>
                          <a href='#FbLink' className='opensans-regular'>
                            Create Facebook Business Account
                          </a>
                        </li>
                        <li className={`mb-3 ${activeTab == 2 ? 'active' : ''}`} onClick={() => setActiveTab('2')}>
                          <a href='#IgLink' className='opensans-regular'>
                            Create Instagram Business Professional Account
                          </a>
                        </li>
                        <li className={`mb-3 ${activeTab == 3 ? 'active' : ''}`} onClick={() => setActiveTab('3')}>
                          <a href='#FbPageLink' className='opensans-regular'>
                            Create a Facebook Page
                          </a>
                        </li>
                        <li className={`mb-3 ${activeTab == 4 ? 'active' : ''}`} onClick={() => setActiveTab('4')}>
                          <a href='#Fb_IgPageLink' className='opensans-regular'>
                            Link Facebook & Instagram Account
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className='intelichat-logo'>
                  <img src={INTELICHAT_LOGO} alt='logo' />
                </div>
              </div>
              <div className='col-xxl-10 col-xl-9 col-lg-9 col-md-8 col-sm-12 p-0 intelichat-overflow'>
                <div className='intelichat-conatiner-right'>
                  <div className='chatbot-container'>
                    <div className='chatbot-header'>
                      <h3 className='opensans-bold mb-0'>User Guide</h3>
                    </div>
                    <div className='m-0 mt-5 ps-md-5 ps-sm-3 ps-3'>
                      <div className='border-bottom py-3 scroll-margin-top' id='FbLink'>
                        <h2 className='guide-heading opensans-bold'>Create Facebook Business Account</h2>
                        <div>
                          <h4 className='guide-subheading opensans-bold'> Before you begin</h4>
                        </div>
                        <ul>
                          <li>
                            <span>
                              Make sure that you have a personal Facebook profile to confirm your identity. You need a Facebook profile to create a Business Manager account. You
                              use your Facebook username and password to sign into Business Manager. It's a more secure way to log in than with just an email address and password.
                            </span>
                          </li>
                          <li>
                            <span>
                              You can create only 2 Business Manager accounts. If you need more, please work with someone else in your organization to create additional Business
                              Manager accounts.
                            </span>
                          </li>
                        </ul>
                        <div className='my-3'>
                          <h4 className='guide-subheading opensans-bold'> Create a Business Account</h4>
                        </div>
                        <div className='my-3'>
                          <h6> To set up a business account:</h6>
                        </div>
                        <ol>
                          <li>
                            Go to <a href='https://business.facebook.com/overview'>business.facebook.com/overview</a>.
                          </li>
                          <li>
                            Click <strong>Create account</strong>.
                          </li>
                          <li>
                            Enter a name for your business, your name and work email address and click <strong>Next</strong>.
                          </li>
                          <li>
                            Enter your business details and click <strong>Submit</strong>.
                          </li>
                        </ol>
                      </div>

                      <div className='border-bottom py-3 scroll-margin-top' id='IgLink'>
                        <h2 className='guide-heading opensans-bold'>Create Instagram Business Professional Account</h2>
                        <div>
                          <h4 className='guide-subheading opensans-bold'> Before you begin</h4>
                        </div>
                        <ul>
                          <li>
                            <span>
                              To set up an Instagram business account, you need to
                              <a href='https://help.instagram.com/155940534568753?helpref=faq_content'>create an Instagram account</a> or use an existing Instagram account.
                            </span>
                          </li>
                          <li>
                            <span>
                              <b className='opensans-bold'>Note:</b>
                              <a href='https://help.instagram.com/1682672155283228?helpref=faq_content'> You may only have 5 Instagram accounts</a> at a time.
                            </span>
                          </li>
                        </ul>
                        <div className='my-3'>
                          <h4 className='guide-subheading opensans-bold'> How to start a business account on Instagram</h4>
                        </div>
                        <div className='my-3'>
                          <h6> To set up a business account:</h6>
                        </div>
                        <ol>
                          <span>
                            <li>
                              <span>Go to your profile and tap in the top right-hand corner.</span>
                            </li>
                            <li>
                              <span>
                                Tap <b>Settings.</b>
                              </span>
                            </li>
                          </span>
                        </ol>
                        <ul>
                          <li>
                            For some accounts, the <b>Switch to professional account</b> option will be listed directly under <b>Settings.</b>
                          </li>
                        </ul>
                        <ol>
                          <li>
                            <span>
                              Tap <b>Account</b>.
                            </span>
                          </li>
                          <li>
                            <span>
                              Tap <b>Switch to professional account</b>.
                            </span>
                          </li>
                          <li>
                            <span>
                              Tap <b>Continue.</b>
                            </span>
                          </li>
                          <li>
                            <span>
                              Select a <b>Category</b> for your business and tap <b>Done.</b>
                            </span>
                          </li>
                          <li>
                            <span>
                              Tap <b>OK</b> to confirm.
                            </span>
                          </li>
                          <li>
                            <span>
                              Tap <b>Business</b>.
                            </span>
                          </li>
                          <li>
                            <span>
                              Tap <b>Next</b>.
                            </span>
                          </li>
                          <li>
                            <span>
                              Add contact details and tap <b>Next.</b> To skip this step, tap <b>Don’t use my contact info</b>.
                            </span>
                          </li>
                          <li>
                            <span>
                              If you'd like, you can follow the steps to connect your business account to a Facebook Page associated with your business. This step is optional, and
                              will make it easier to use all of the features available for businesses across Meta. <b>Note:</b> At this time, only one Facebook Page can be
                              connected to your business account.
                            </span>
                          </li>
                          <li>
                            <span>
                              Tap <b>X</b> on the top right corner to return to your profile.
                            </span>
                          </li>
                          <li>
                            <span>
                              To display or hide business information on your profile, go to your profile and tap <b>Edit profile</b>. Go to <b>Profile display</b> under
                              <b>Public business information</b> to choose whether you want to hide or display your category label and contact info. Then, tap <b>Done</b>.
                            </span>
                          </li>
                        </ol>
                      </div>
                      <div className='border-bottom py-3 scroll-margin-top' id='FbPageLink'>
                        <h2 className='guide-heading opensans-bold'>Create a Facebook Page</h2>
                        <div>
                          <h4 className='guide-subheading'>Create a Page</h4>
                        </div>
                        <ol>
                          <li>
                            Go to <a href='https://www.facebook.com/pages/create/?ref_type=hc'>facebook.com/pages/create.</a>
                          </li>
                          <li>
                            Click <strong>Create Page.</strong>
                          </li>
                          <li>If you want to customise your Page, you can add your bio, a profile picture and a cover photo.</li>
                          <li>
                            Click <strong>Done</strong>.
                          </li>
                        </ol>
                      </div>
                      <div className='border-bottom py-3 scroll-margin-top' id='Fb_IgPageLink'>
                        <h2 className='guide-heading opensans-bold'>Link Facebook & Instagram Account</h2>
                        <div className='my-3'>
                          <h4 className='guide-subheading'> From Facebook:</h4>
                        </div>
                        <ol>
                          <li>
                            Log in to Facebook and click <strong>Pages</strong> in the left menu.
                          </li>
                          <li>
                            From your Facebook page, click <strong>Settings</strong>.
                          </li>
                          <li>
                            Scroll down and select <strong>Instagram</strong> in the left column.
                          </li>
                          <li>
                            Click <strong>Connect Account</strong>, and fill in your Instagram username and password.
                          </li>
                        </ol>
                        <div className='my-3'>
                          <h4 className='guide-subheading'> From Instagram:</h4>
                        </div>
                        <ol>
                          <li>Log in to Instagram and go to your profile.</li>
                          <li>
                            Tap <strong>Edit Profile.</strong>
                          </li>
                          <li>
                            Under Public Business/Profile Information, select <strong>Page.</strong>
                          </li>
                          <li>Choose the Facebook page you wish to connect to.</li>
                        </ol>
                      </div>
                      <div className='border-bottom py-3'>
                        <h2 className='guide-heading opensans-bold'>Login Facebook Business Account</h2>
                        <div className='pt-2'>
                          <button className='btn btn-primary text-uppercase'>
                            Sign In <RiArrowRightUpLine style={{ verticalAlign: 'top' }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Guide;
