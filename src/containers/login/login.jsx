/*
  Login Component
 */

import React from 'react';
import {
  Button, NavBar, Input, Form, Space
} from "antd-mobile";
import Logo from "../../components/logo/logo";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  let navigate = useNavigate();
  const toRegister = () => navigate("/register", { replace: true })

  const login = () => {
    console.log(username)
    console.log(password)
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
              Login
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