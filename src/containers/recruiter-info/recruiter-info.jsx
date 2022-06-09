/*
  Recruiter Info Component
 */
import React, {useEffect, useState} from 'react';
import AvatarSelector from "../../components/avatar-selector/avatar-selector";
import {Button, Form, Grid, NavBar, Selector, Space, Toast} from "antd-mobile";
import FormInput from "../../components/form-inputs/form-input";
import checkEmpty from "../../utils/check-empty";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateProfileAsync} from "../../redux/reducers/user";

function RecruiterInfo(props) {
  const dispatch = useDispatch()
  // TODO set default value for form items
  const user = useSelector((state) => state.user)

  const [avatar, setAvatar] = useState(user.avatar === -1 ? 0 : user.avatar)
  const [name, setName] = useState(user.name)
  const [company, setCompany] = useState(user.company)
  const [jobPostList, setJobPostList] = useState(user.jobs)// useState([{title: "SDE", level: "Entry"}])

  useEffect(() => {
    // Get jobPostList and other info from server when page is about to mount
    /*dispatch(getProfileAsync({
      // _id: user._id,
      _id: "629b3eefebfad22e4a47dd85",
    })).catch((err) => {
      console.log(err)
      Toast.show({
        icon: 'fail',
        content: err.message(),
      })
    });*/
  }, [])

  const navigate = useNavigate()

  const selectorOptions = jobPostList.map(((job, index) => {
    return {
      label: job.title,
      description: job.level + ' Level',
      value: job._id,
    }
  }))

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
      console.log('resp', resp)
      if (resp.payload.code === 0) {
        Toast.show({
          icon: 'success',
          content: resp.payload.msg,
        });
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
      <NavBar onBack={() => navigate("/")}>
        Complete Your Profile
      </NavBar>

      <Form
        layout='horizontal'
        footer={<Button block loading='auto' color='primary' onClick={submitRecruiterInfo}>Submit</Button>}
      >
        <Space direction='vertical' block style={{ '--gap': '3px' }}>
          <Form.Item name='Avatar'>
            <AvatarSelector avatar={avatar} setAvatar={setAvatar}/>
          </Form.Item>
          <FormInput name='Name' val={name} setVal={setName}/>
          <FormInput name='Company Name' val={company} setVal={setCompany}/>
          <Form.Item name='Job Posts'>
            <div style={{'textAlign':'center'}}>Job Posts List</div>
             {/*Job Posts List*/}
            <Button block color='success' onClick={() => navigate("/new-post")}>Add a Post</Button>
            <Grid columns={2}>
              <Button color='warning' onClick={() => {
                navigate("/new-post", {
                  state: {
                    title: "xxx",
                  },
                })
              }}>Modify Selected</Button>
              <Button color='danger'>Delete Selected</Button>
            </Grid>
            <Selector
              columns={2}
              options={selectorOptions}
            />
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
}

export default RecruiterInfo;
