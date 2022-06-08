/*
  Main Component
 */

import React, {Component} from 'react';
import {Route, Routes} from "react-router-dom";
import {TabBar} from "antd-mobile";
import RecruiterInfo from "../recruiter-info/recruiter-info";
import HunterInfo from "../hunter-info/hunter-info";
import NewPost from "../new-post/new-post";

class Main extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route index element={<div>main</div>}/>
          <Route path="recruiter-info" element={<RecruiterInfo/>}/>
          <Route path="new-post" element={<NewPost/>} />
          <Route path="hunter-info" element={<HunterInfo/>}/>
        </Routes>
      </div>
    );
  }
}

export default Main;