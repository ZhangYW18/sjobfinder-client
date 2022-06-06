/*
  Register Component
 */

import React from 'react';
import {
  Button, NavBar, Radio, Input, Form, Space, Toast, DotLoading
} from "antd-mobile";
import Logo from "../../components/logo/logo";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {registerAsync} from "../../redux/reducers/user";

export default () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [identity, setIdentity] = useState('hunter')

  const navigate = useNavigate();

  const dispatch = useDispatch()
  const loading = useSelector((state) => state.user.loading)

  const toLogin = () => navigate("/login", { replace: true })
  const toMain = () => navigate("/", { replace: true })

  const register = () => {
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

    if (confirm === '') {
      Toast.show({
        content: 'Empty Confirm Password',
        position: 'bottom',
      })
      return;
    }

    if (password !== confirm) {
      Toast.show({
        content: 'Two passwords inputted are not consistent',
        position: 'bottom',
      })
      return;
    }

    dispatch(registerAsync({
      username: username,
      password: password,
      identity: identity,
    })).then((resp) => {
      console.log('resp', resp)
      if (resp.payload.code === 0) {
        Toast.show({
          icon: 'success',
          content: resp.payload.msg,
        });
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
        content: err.message(),
      })
    });
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
              {loading === `pending` ? <DotLoading color='primary' /> : `Register`}
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
