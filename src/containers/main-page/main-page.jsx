import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function MainPage(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user)
  useEffect(() => {
    console.log(user.identity)
    navigate(`/${user.identity}-main`, {replace: true})
  }, [])

  return (
    <div/>
  );
}

export default MainPage;
