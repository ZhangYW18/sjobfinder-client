/*
  Recruiter Info Component
 */
import React, {useState} from 'react';
import AvatarSelector from "../../components/avatar-selector/avatar-selector";
import {Button, Form, NavBar, Space, Toast} from "antd-mobile";
import FormInput from "../../components/form-inputs/form-input";
import checkEmpty from "../../utils/check-empty";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateProfileAsync} from "../../redux/reducers/user";

function RecruiterInfo(props) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userReducer.user)
  // TODO set default value for form items

  const [avatar, setAvatar] = useState(user.avatar === -1 ? 0 : user.avatar)
  const [name, setName] = useState(user.name)
  const [company, setCompany] = useState(user.company)

  const navigate = useNavigate()

  const submitRecruiterInfo = () => {
    if (checkEmpty(name, "Empty Name")) return;
    if (checkEmpty(company, "Empty Company Name")) return;

    // Submit info to server and update
    dispatch(updateProfileAsync({
      _id: user._id,
      //_id: "629b3eefebfad22e4a47dd85",
      avatar: avatar,
      name: name,
      company: company,
    })).then((resp) => {
      // console.log('resp', resp)
      if (resp.payload.code === 0) {
        Toast.show({
          icon: 'success',
          content: resp.payload.msg,
        });
        navigate("/personal");
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
        Update Your Profile
      </NavBar>

      <Form
        layout='horizontal'
        footer={<Button block loading='auto' color='primary' onClick={submitRecruiterInfo}>Submit</Button>}
      >
        <Space direction='vertical' block style={{ '--gap': '3px' }}>
          <Form.Item>
            <AvatarSelector avatar={avatar} setAvatar={setAvatar}/>
          </Form.Item>
          <FormInput placeholder='Name' val={name} defaultValue={user.name} setVal={setName} />
          <FormInput placeholder='Company Name' val={company} defaultValue={user.company} setVal={setCompany}/>
        </Space>
      </Form>
    </div>
  );
}

export default RecruiterInfo;
