/*
  Recruiter Info Component
 */
import React, {useState} from 'react';
import AvatarSelector from "../../components/avatar-selector/avatar-selector";
import {Button, Form, Radio, Space, TextArea} from "antd-mobile";
import FormInput from "../../components/form-inputs/form-input";
import checkEmpty from "../../utils/check-empty";

function RecruiterInfo(props) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('entry')
  const [description, setDescription] = useState('')
  const [avatar, setAvatar] = useState(0)

  const submitRecruiterInfo = () => {
    console.log(avatar)
    console.log(name)
    console.log(level)
    console.log(description)
    if (checkEmpty(name, "Empty Name")) return;


  }

  return (
    <div className='recruiter-info'>
      <Form
        layout='horizontal'
        footer={<Button block color='primary' onClick={submitRecruiterInfo}>Submit</Button>}
      >
        <Space direction='vertical' block style={{ '--gap': '3px' }}>
          <Form.Item name='Avatar'>
            <AvatarSelector avatar={avatar} setAvatar={setAvatar}/>
          </Form.Item>
          <FormInput name='Name*' val={name} setVal={setName}/>
          <FormInput name='Company Name' val={company} setVal={setCompany}/>
          <FormInput name='Job Post Title' val={title} setVal={setTitle}/>
          <Form.Item label='Job Level'>
            <Radio.Group
              value={level}
              onChange={val => {
                setLevel(val)
              }}
            >
              <Space direction='vertical'>
                <Radio value='entry'>Entry</Radio>
                <Radio value='senior'>Senior</Radio>
                <Radio value='expert'>Expert</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item name='Description'>
            <TextArea
                className='description'
                placeholder='Job Description'
                value={description}
                onChange={val => {
                  setDescription(val)
                }}
                showCount
                maxLength={500}
                autoSize={{ minRows: 2, maxRows: 5 }}
              />
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
}

export default RecruiterInfo;
