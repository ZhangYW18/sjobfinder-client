/*
  Recruiter Info Component
 */
import React, {useEffect, useState} from 'react';
import AvatarSelector from "../../components/avatar-selector/avatar-selector";
import {Button, Form, Grid, Selector, Space} from "antd-mobile";
import FormInput from "../../components/form-inputs/form-input";
import checkEmpty from "../../utils/check-empty";
import {useNavigate} from "react-router-dom";

function RecruiterInfo(props) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [jobPostList, setJobPostList] = useState([{title: "SDE", level: "Entry"}])
  const [avatar, setAvatar] = useState(0)

  useEffect(() => {
    // Get jobPostList from server when page is about to mount
  }, [])

  const navigate = useNavigate()

  const toNewPost = () => navigate("/new-post")

  const selectorOptions = jobPostList.map(((job, index) => {
    return {
      label: job.title,
      description: job.level + ' Level',
      value: index,
    }
  }))

  const submitRecruiterInfo = () => {
    console.log(avatar)
    console.log(name)
    if (checkEmpty(name, "Empty Name")) return;
    // Submit info to server and update
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
          <Form.Item name='Job Posts'>
            <div style={{'textAlign':'center'}}>Job Posts List</div>
             {/*Job Posts List*/}
            <Grid columns={2}>
              <Button color='success' onClick={toNewPost}>Add a Post</Button>
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
