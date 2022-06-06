/*
  Login Component
 */

import React from 'react';
import {
  Button, NavBar, Input, Form, Space, Toast, DotLoading
} from "antd-mobile";
import Logo from "../../components/logo/logo";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginAsync} from "../../redux/reducers/user";

export default () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const loading = useSelector((state) => state.user.loading)

  const toRegister = () => navigate("/register", { replace: true })

  const login = () => {
    if (username === '') {
      Toast.show({
        content: 'Empty Username',
        position: 'bottom',
      })
      return;
    }

    if (password === '') {
      Toast.show({
        content: 'Empty Password',
        position: 'bottom',
      })
      return;
    }

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
        content: err.message(),
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
            <Button block onClick={login} color='primary' size='middle'>
              {loading === `pending` ? <DotLoading color='primary' /> : `Login`}
            </Button>
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

        <Button block onClick={toRegister} size='middle'>
          Register
        </Button>

      </Space>
    </div>
  );
}
