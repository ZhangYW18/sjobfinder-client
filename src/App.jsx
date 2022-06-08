import {HashRouter, Route, Routes} from "react-router-dom";
import Main from "./containers/main/main";
import Login from "./containers/login/login";
import Register from "./containers/register/register";
import React from "react";

export default () => {
  return (
    <HashRouter>
      <Routes>
        <Route index path="/*" element={<Main/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
      </Routes>
    </HashRouter>
  );
}



