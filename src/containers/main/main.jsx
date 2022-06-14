/*
  Main Component
 */

import React from 'react';
import {Route, Routes} from "react-router-dom";
import RecruiterInfo from "../recruiter-info/recruiter-info";
import HunterInfo from "../hunter-info/hunter-info";
import JobDetail from "../job-detail/job-detail";
import Personal from "../personal/personal";
import Cookies from "js-cookie";
import MainPage from "../main-page/main-page";
import Redirect from "../../components/redirect/redirect";
import {useSelector} from "react-redux";
import Chats from "../chats/chats";
import NavFooter from "../../components/nav-footer/nav-footer";

import './main.css'

function Main(props) {
  const userId = Cookies.get('userid');
  const user = useSelector((state) => state.userReducer.user)
  // If the user have not logged in, we only show login and register page, and redirect other requests.
  if (!userId) {
    return (
      <div>
        <Routes>
          <Route index path='*' element={<Redirect/>}/>
        </Routes>
      </div>
    )
  }

  return (
    <div className="app">
      <Routes>
        <Route index path='/' element={<MainPage />} />
        {/*
        Whatever other routes the user may request, we redirect them all to main page
        if they have logged in in Redirect component.
        .*/}
        <Route path='*' element={<Redirect />} />
        <Route path="job-detail" element={<JobDetail />} />
        <Route path="personal" element={<Personal />} />
        <Route path="chats" element={<Chats />} />
        {user.identity === 'hunter' ? <Route path="hunter-info" element={<HunterInfo />} />
          : <Route path="recruiter-info" element={<RecruiterInfo />} />}
      </Routes>

      <div className="app-footer">
        <NavFooter/>
      </div>
    </div>
  );
}

export default Main;