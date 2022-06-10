/*
  Recruiter Info Component
 */
import React, {useEffect, useState} from 'react';
import AvatarSelector from "../../components/avatar-selector/avatar-selector";
import {Button, Form, Grid, NavBar, Selector, Space, Toast} from "antd-mobile";
import FormInput from "../../components/form-inputs/form-input";
import checkEmpty from "../../utils/check-empty";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {updateProfileAsync} from "../../redux/reducers/user";
import {jobLevelMap} from "../../constants/job";
import {jobAPI} from "../../api/job";
import {userAPI} from "../../api/user";

function RecruiterInfo(props) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  // TODO set default value for form items

  const [avatar, setAvatar] = useState(0)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  // const [jobs, setJobs] = useState([{title: "SDE", level: 1, _id: '1'}, {title: "SE", level: 2, _id: '2'}])
  // const [selectedJobId, setSelectedJobId] = useState('')

  const navigate = useNavigate()

  // const selectorOptions = jobs.map(((job, index) => {
  //   return {
  //     label: job.title,
  //     description: jobLevelMap[job.level] + ' Level',
  //     value: job._id,
  //   }
  // }))
  //
  // useEffect(() => {
  //   console.log('loading info...');
  //   async function fetchProfile(userId) {
  //     const response = await userAPI.getProfile(userId)
  //     setAvatar(response.data.avatar)
  //     setName(response.data.name)
  //     setCompany(response.data.company)
  //     setDescription(response.data.description)
  //   }
  //   fetchProfile(userId);
  //   // Fetch user profile & job list
  // }, [])

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
          <FormInput name='Name' val={name} setVal={setName}/>
          <FormInput name='Company Name' val={company} setVal={setCompany}/>
          {/*<Form.Item>*/}
          {/*  <div style={{'textAlign':'center'}}>Job Posts List</div>*/}
          {/*   /!*Job Posts List*!/*/}
          {/*  <Button block color='success' onClick={() =>*/}
          {/*      navigate("/new-post", {*/}
          {/*        state: {*/}
          {/*          action: 'add',*/}
          {/*        },*/}
          {/*      }*/}
          {/*    )}>Add a Post</Button>*/}
          {/*  <Grid columns={2}>*/}
          {/*    <Button color='warning' onClick={() => {*/}
          {/*      navigate("/new-post", {*/}
          {/*        state: {*/}
          {/*          action: 'update',*/}
          {/*          jobId: selectedJobId,*/}
          {/*        },*/}
          {/*      })*/}
          {/*    }}>Update Selected</Button>*/}
          {/*    <Button color='danger'>Delete Selected</Button>*/}
          {/*  </Grid>*/}
          {/*  <Selector*/}
          {/*    columns={2}*/}
          {/*    options={selectorOptions}*/}
          {/*    defaultValue={jobs.length > 0 ? [jobs[0]._id] : []}*/}
          {/*    onChange={(value) => {setSelectedJobId(value[0])}}*/}
          {/*  />*/}
          {/*</Form.Item>*/}
        </Space>
      </Form>
    </div>
  );
}

export default RecruiterInfo;
