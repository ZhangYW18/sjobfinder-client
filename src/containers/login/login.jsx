/*
  Login Component
 */

import React from 'react';
import {
  Button, NavBar, Input, Form, Space, Toast
} from "antd-mobile";
import Logo from "../../components/logo/logo";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginAsync} from "../../redux/reducers/user";
import checkEmpty from "../../utils/check-empty";

function Login(props) {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const loading = useSelector((state) => state.user.loading)

  const toRegister = () => navigate("/register", { replace: true })
  const toMain = () => navigate("/", { replace: true })
  const toInfo = (identity) => {
    if (identity === 'hunter')
      navigate("/hunter-info", { replace: true });
    else
      navigate("/recruiter-info", { replace: true });
  }

  const login = () => {
    if (checkEmpty(username, 'Empty Username')) return;
    if (checkEmpty(password, 'Empty Password')) return;

    dispatch(loginAsync({
      username: username,
      password: password,
    })).then((resp) => {
      console.log('resp', resp)
      if (resp.payload.code === 0) {
        Toast.show({
          icon: 'success',
          content: resp.payload.msg,
        })
        if (!resp.payload.data.user.avatar)
          toInfo(resp.payload.data.user.identity);
        else
          toMain();
      } else {
        Toast.show({
          icon: 'fail',
          content: resp.payload.msg,
        })
      }
    }).catch((err) => {
      console.log(err)
      Toast.show({
        icon: 'fail',
        content: err.toString(),
      })
    });
  }

  return (
    <div>
      <Space direction='vertical'>

        <NavBar backArrow={false}>
          JobFinder
        </NavBar>

        <Logo/>

        <Form
          layout='horizontal'
          footer={
            <div>
              <Button block onClick={login} color='primary' size='large' loading={loading}>
                Login
              </Button>
              <Button block onClick={toRegister} size='large'>
              Register
              </Button>
            </div>
          }
        >
          <Form.Item label='Username' name='username'>
            <Input
              placeholder='Username'
              value={username}
              onChange={val => {
                setUsername(val)
              }}
              clearable />
          </Form.Item>

          <Form.Item label='Password' name='password'>
            <Input
              placeholder='Password'
              type='password'
              value={password}
              onChange={val => {
                setPassword(val)
              }}
              clearable />
          </Form.Item>
        </Form>

      </Space>
    </div>
  );
}

export default Login;
