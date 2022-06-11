/*
  Main Component
 */

import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom";
import {TabBar} from "antd-mobile";
import RecruiterInfo from "../recruiter-info/recruiter-info";
import HunterInfo from "../hunter-info/hunter-info";
import JobDetail from "../job-detail/job-detail";
import {useSelector} from "react-redux";
import Personal from "../personal/personal";

function Main(props) {

  const user = useSelector((state) => state.userReducer.user)

  return (
    <div>
      <Routes>
        <Route index element={<div>main</div>}/>
        <Route path="recruiter-info" element={<RecruiterInfo/>}/>
        <Route path="job-detail" element={<JobDetail/>} />
        <Route path="hunter-info" element={<HunterInfo/>}/>
        <Route path="personal" element={<Personal/>}/>
      </Routes>
    </div>
  );
}

export default Main;