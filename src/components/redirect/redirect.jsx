import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

function Redirect(props) {
  const navigate = useNavigate();
  useEffect(() => {
    // Check if the user have logged in first. If not, redirect to login page, else redirect to main page.
    const userId = Cookies.get('userid');
    if (!userId) {
      navigate('/login', {replace: true})
    } else {
      navigate('/', {replace: true});
    }
  }, [])

  return (
    <div/>
  );
}

export default Redirect;