import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './assets/styles/Global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashLayout from './components/DashLayout';
import Chatbot from './Pages/Chatbot';
import Contact from './Pages/Contact';
import Installed from './Pages/Installed';
import UpComing from './Pages/UpComing';
import ChangePassword from './Pages/ChangePassword';
import Dashboard from './Pages/Dashboard';
import RegisterForm from './Pages/authentication/RegisterForm';
import OtpVerification from './Pages/authentication/OtpVerification';
import LoginForm from './Pages/authentication/LoginForm';
import { ToastContainer } from 'react-toastify';
import ChatBox from './components/ChatBox';
import ForgotPassword from './Pages/authentication/ForgotPassword';
import Guide from './Pages/Guide';
import User from './Pages/User';
import Integrations from './Pages/Integrations';
import Setting from './Pages/Setting';
import ResetPassword from './Pages/authentication/ResetPassword';
import Loader from './components/Loader';
import AuthGaurd from './components/Guards/AuthGaurd';
import UnAuthGaurd from './components/Guards/UnAuthGaurd';
import DashboardPerformance from './Pages/DashboardPerformance';
import CustomerInteractions from './Pages/CustomerInteractions';
import KnowledgeBase from './Pages/KnowledgeBase';
import KnowledgeBaseSetMessage from './Pages/KnowledgeBaseSetMessage';
import Notification from './Pages/Notification';
import { getLocalStorage } from './API/Api';
import NotFound from './Pages/NotFound';
import ChatBotProfile from './Pages/ChatBotProfile';
import ComingSoon from './Pages/ComingSoon';
import ThreeDotLoader from './components/ThreeDotLoader';
import AutoResponse from './Pages/AutoResponse';
import TestChatBot from './Pages/authentication/TestChatBot';
import UserProfile from './Pages/UserProfile';

function App() {
  let token = getLocalStorage('apiToken');
  return (
    <>
      <ChatBox />
      <ToastContainer autoClose={1000} />
      <BrowserRouter>
        <Routes>          
          <Route path='/testchatbot' element={<TestChatBot />} />

          {token && <Route path='/' element={<Navigate to='/dashboard' />} />}
          <Route element={<AuthGaurd />}>
            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='/dashboard' element={<DashboardPerformance />} />
              <Route path='/dashboard/customerinteractions' element={<CustomerInteractions />} />
            </Route>
            <Route path='/upcoming' element={<UpComing />} />
            <Route path='/chatbot' element={<Chatbot />}>
              <Route path='/chatbot' element={<ChatBotProfile />} />
              <Route path='/chatbot/knowledgebase' element={<KnowledgeBaseSetMessage />} />
            </Route>
            <Route path='/guide' element={<Guide />} />
            <Route path='/integrations' element={<Integrations />}>
              <Route path='/integrations' element={<Installed />} />
            </Route>
            <Route path='/knowledgebase' element={<KnowledgeBase />}>
              <Route path='/knowledgebase' element={<AutoResponse />} />
            </Route>
            <Route path='/profile' element={<User />} />
            <Route path='/setting' element={<Setting />}>
              <Route path='/setting' element={<UserProfile />} />
              <Route path='/setting/changepassword' element={<ChangePassword />} />
              <Route path='/setting/integration' element={<ComingSoon />} />
              <Route path='/setting/subscription' element={<ComingSoon />} />
              <Route path='/setting/billing' element={<ComingSoon />} />
              <Route path='/setting/security' element={<ComingSoon />} />
            </Route>
            <Route path='/*' exact element={<NotFound />} />
          </Route>
          <Route path='/threedot' exact element={<ThreeDotLoader />} />

          <Route path='/notification' element={<Notification />} />
          <Route path='/notification' element={<Notification />} />
          <Route path='/loader' element={<Loader />} />

          {!token && <Route path='/' element={<Navigate to='/login' />} />}

          <Route element={<UnAuthGaurd />}>
            <Route path='/' element={<LoginForm />}>
              <Route path='/login' element={<LoginForm />} />
            </Route>
            <Route path='/register' element={<RegisterForm />} />

            <Route path='/otpverification/:code' element={<OtpVerification />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/resetpassword/:code/:code' element={<ResetPassword />} />
            <Route path='/*' exact element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
