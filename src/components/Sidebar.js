import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { IoSettings, IoGameController } from 'react-icons/io5';
import LOGO from '../assets/icons/Logo.svg';
import DASHBOARD_ICON from '../assets/icons/Dashboard_icon.svg';
import CHATBOT_ICON from '../assets/icons/ChatBot_icon.svg';
import KNOWLEDGE_BASE_ICON from '../assets/icons/Knowledge_base_icon.svg';
import INTEGRATIONS_ICON from '../assets/icons/Integrations_icon.svg';
import SETTINGS_ICON from '../assets/icons/Settings_icon.svg';
import SHARE_ICON from '../assets/icons/Share_icon.svg';
import BELL_ICON from '../assets/icons/Bell_icon.svg';
import USER_ICON from '../assets/icons/User1_icon.svg';
import GUIDEUSER_ICON from '../assets/icons/GuideUser.svg';
import '../assets/styles/Sidebar.css';
import { GrDocumentUser } from 'react-icons/gr';

const Sidebar = () => {
  const location = useLocation();
  const handleOpen = () => {
    const div = document.getElementById('PopUpShowHide');
    div.style.display = 'block';
  };
  return (
    <div className='sidebar-menu-left'>
      <div className='sidebar-conatiner'>
        <div className='logo-icon'>
          <NavLink to='/dashboard'>
            <img src={LOGO} alt='logo' />
          </NavLink>
        </div>
        <nav className='sidebar-nav-content'>
          <ul className='m-0'>
            <li className={`sidebar-icon ${location?.pathname == '/dashboard' && 'active-border-left'}`}>
              <NavLink to='/dashboard' onClick={() => handleOpen()}>
                <img src={DASHBOARD_ICON} alt='dashboard-icon' />
              </NavLink>
            </li>
            <li
              className={`sidebar-icon ${(location?.pathname == '/chatbot' || location?.pathname == '/chatbot/knowledgebase') && 'active-border-left'}`}
              onClick={() => handleOpen()}
            >
              <NavLink to='/chatbot'>
                <img src={CHATBOT_ICON} alt='chatbot-icon' />
              </NavLink>
            </li>
            <li className={`sidebar-icon ${location?.pathname == '/knowledgebase' && 'active-border-left'}`} onClick={() => handleOpen()}>
              <NavLink to='/knowledgebase'>
                <img src={KNOWLEDGE_BASE_ICON} alt='knowledgebase-icon' />
              </NavLink>
            </li>
            <li className={`sidebar-icon ${location?.pathname == '/integrations' && 'active-border-left'}`} onClick={() => handleOpen()}>
              <NavLink to='/integrations'>
                <img src={INTEGRATIONS_ICON} alt='integrations_icon' />
              </NavLink>
            </li>
            <li className={`sidebar-icon ${location?.pathname == '/guide' && 'active-border-left'}`} onClick={() => handleOpen()}>
              <NavLink to='/guide'>
                <img src={GUIDEUSER_ICON} alt='share-icon' />
              </NavLink>
            </li>
            <li
              className={`sidebar-icon ${(location?.pathname == '/setting' || location?.pathname == '/setting/changepassword') && 'active-border-left'}`}
              onClick={() => handleOpen()}
            >
              <NavLink to='/setting'>
                <img src={SETTINGS_ICON} alt='knowledgebase-icon' />
              </NavLink>
            </li>
          </ul>
          <ul className='m-0 d-none'>
            <li className='sidebar-icon'>
              <NavLink to='/upcoming'>
                <img src={SHARE_ICON} alt='share-icon' />
              </NavLink>
            </li>
            <li className='sidebar-icon'>
              <NavLink to='/notification'>
                <img src={BELL_ICON} alt='bell-icon' />
              </NavLink>
            </li>
            <li className='sidebar-icon'>
              <NavLink to='/profile'>
                <img src={USER_ICON} alt='user-icon' />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
