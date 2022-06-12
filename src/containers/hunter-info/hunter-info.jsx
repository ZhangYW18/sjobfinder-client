/*
  Job Hunter Info Component
 */

import React, {useState} from 'react';
import {Button, Form, NavBar, Space, TextArea, Toast} from "antd-mobile";
import AvatarSelector from "../../components/avatar-selector/avatar-selector";
import FormInput from "../../components/form-inputs/form-input";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateProfileAsync} from "../../redux/reducers/user";

function HunterInfo(props) {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.userReducer.user)

  const [avatar, setAvatar] = useState(user.avatar === -1 ? 0 : user.avatar)
  const [name, setName] = useState(user.name)
  const [preference, setPreference] = useState(user.preference)
  const [introduction, setIntroduction] = useState(user.introduction)
  // TODO add a picker to select education level
  // const [education, setEducation] = useState('')

  const navigate = useNavigate()

  const submitHunterInfo = () => {
    // Submit info to server and update
    dispatch(updateProfileAsync({
      _id: user._id,
      //_id: "629d83d538155d457dcbea77",
      avatar: avatar,
      name: name,
      preference,
      introduction,
    })).then((resp) => {
      //console.log('resp', resp)
      if (resp.payload.code === 0) {
        Toast.show({
          icon: 'success',
          content: resp.payload.msg,
        });
        navigate("/personal")
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
    <div className='recruiter-info'>
      <NavBar onBack={() => navigate("/personal")}>
        Complete Your Profile
      </NavBar>

      <Form
        layout='horizontal'
        footer={<Button block color='primary' onClick={submitHunterInfo}>Submit</Button>}
      >
        <Space direction='vertical' block style={{ '--gap': '3px' }}>
          <Form.Item name='avatar'>
            <AvatarSelector avatar={avatar} setAvatar={setAvatar}/>
          </Form.Item>
          <FormInput placeholder='Name' val={name} defaultValue={name} setVal={setName}/>
          <FormInput plcaeholder='Job Preference' val={preference} defaultValue={preference} setVal={setPreference}/>
          <Form.Item name='introduction'>
            <TextArea
              placeholder='Self Introduction'
              value={introduction}
              defaultValue={introduction}
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
