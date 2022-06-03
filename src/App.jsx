import {HashRouter, Route, Routes} from "react-router-dom";
import Main from "./containers/main/main";
import Login from "./containers/login/login";
import Register from "./containers/register/register";
import React, {Component} from "react";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Routes>
          <Route index element={<Main/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Routes>
      </HashRouter>
    );
  }
}

export default App;


