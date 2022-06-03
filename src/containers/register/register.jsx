/*
  Register Component
 */

import React from 'react';
import {
  Button, NavBar, Radio, Input, Form, Space
} from "antd-mobile";
import Logo from "../../components/logo/logo";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [identity, setIdentity] = useState('')

  let navigate = useNavigate();
  const toLogin = () => navigate("/login", { replace: true })

  const register = () => {
    console.log(username)
    console.log(password)
    console.log(confirm)
    console.log(identity)

  }

  return (
    <div>
      <Space direction='vertical'>

        <NavBar back='Back' onBack={toLogin}>
          JobFinder
        </NavBar>

        <Logo/>

        <Form
          layout='horizontal'
          footer={
            <Button block onClick={register} color='primary' size='middle'>
              Register
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

          <Form.Item label='Confirm' name='confirm'>
            <Input
              placeholder='Confirm Password'
              type='password'
              value={confirm}
              onChange={val => {
                setConfirm(val)
              }}
              clearable />
          </Form.Item>

          <Form.Item>
            <Space direction='vertical'>
              <div>Identity</div>
              <Radio.Group
                defaultValue='hunter'
                value={identity}
                onChange={val => {
                  setIdentity(val)
                }}
              >
                <Radio value='hunter'>Job Hunter</Radio>&nbsp;&nbsp;
                <Radio value='recruiter'>Recruiter</Radio>
              </Radio.Group>
            </Space>
          </Form.Item>
        </Form>

      </Space>
    </div>
  );
}
