/*
  Job Hunter Info Component
 */

import React, {useState} from 'react';
import {Button, Form, Space, TextArea} from "antd-mobile";
import AvatarSelector from "../../components/avatar-selector/avatar-selector";
import FormInput from "../../components/form-inputs/form-input";

function HunterInfo(props) {
  const [avatar, setAvatar] = useState(0)
  const [name, setName] = useState('')
  const [preference, setPreference] = useState('')
  const [introduction, setIntroduction] = useState('')

  const submitHunterInfo = () => {
    console.log(avatar)
    console.log(name)
    console.log(introduction)
  }

  return (
    <div className='recruiter-info'>
      <Form
        layout='horizontal'
        footer={<Button block color='primary' onClick={submitHunterInfo}>Submit</Button>}
      >
        <Space direction='vertical' block style={{ '--gap': '3px' }}>
          <Form.Item name='Avatar'>
            <AvatarSelector avatar={avatar} setAvatar={setAvatar}/>
          </Form.Item>
          <FormInput name='Name' val={name} setVal={setName}/>
          <FormInput name='Job Preference' val={preference} setVal={setPreference}/>
          <Form.Item name='Self Introduction'>
            <TextArea
              placeholder='Self Introduction'
              value={introduction}
              onChange={val => {
                setIntroduction(val)
              }}
              showCount
              maxLength={500}
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
}

export default HunterInfo;
