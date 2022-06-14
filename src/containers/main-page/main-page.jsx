import React from 'react';
import {useSelector} from "react-redux";
import HunterMain from "./hunter-main/hunter-main";
import RecruiterMain from "./recruiter-main/recruiter-main";

function MainPage(props) {
  const user = useSelector((state) => state.userReducer.user)
  if (user.identity === 'hunter') {
    return (
      <HunterMain/>
    );
  } else {
    return (
      <RecruiterMain/>
    );
  }
}

export default MainPage;
