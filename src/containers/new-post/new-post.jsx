import React, {useEffect, useState} from 'react';
import {Button, Form, NavBar, Radio, Space, TextArea, Toast} from "antd-mobile";
import FormInput from "../../components/form-inputs/form-input";
import {useLocation, useNavigate} from "react-router-dom";
import checkEmpty from "../../utils/check-empty";
import {updateProfileAsync} from "../../redux/reducers/user";
import {useDispatch, useSelector} from "react-redux";
import {jobAPI} from "../../api/job";

// TODO not tested, test after personal page finished
function NewPost(props) {

  const location = useLocation();
  useEffect( () => {
    async function fetchData () {
      if (location.state.action === 'update') {
        const response = await jobAPI.get(location.state.jobId)
        setTitle(response.data.title)
        setLevel(response.data.level)
        setDescription(response.data.description)
      }
    }
    fetchData();
  },[location])

  const userId = useSelector((state) => state.user._id)
  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('')
  const [description, setDescription] = useState('')

  const navigate = useNavigate();

  const submit = () => {
    if (checkEmpty(title, "Empty Name")) return;
    if (checkEmpty(description, "Empty Company Name")) return;

    let api;
    if (location.state.action === 'update') {
      api = jobAPI.add
    } else {
      api = jobAPI.update
    }
    // Submit info to server and add
    jobAPI.add(userId, title, level, description).then(resp => {
      if (resp.code === 0) {
        Toast.show({
          icon: 'success',
          content: resp.msg,
        });
        back();
      } else {
        Toast.show({
          icon: 'fail',
          content: resp.msg,
        })
      }
    }).catch(err => {
      console.log(err)
      Toast.show({
        icon: 'fail',
        content: err.message(),
      })
    });
  }

  const back = () => {
    navigate(-1)
  }

  return (
    <div>
      <NavBar onBack={back}>
        Job Details
      </NavBar>
      <Form
        layout='horizontal'
        footer={<Button block color='success' onClick={submit}>Submit</Button>}
      >
        <FormInput name='Job Title' val={title} setVal={setTitle}/>
        <Form.Item label='Job Level'>
          <Radio.Group
            value={level}
            onChange={val => {
              setLevel(val)
            }}
          >
            <Space direction='vertical'>
              <Radio value='1'>Entry Level</Radio>
              <Radio value='2'>Mid Level</Radio>
              <Radio value='3'>Senior Level</Radio>
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
      </Form>
    </div>
  );
}

export default NewPost;