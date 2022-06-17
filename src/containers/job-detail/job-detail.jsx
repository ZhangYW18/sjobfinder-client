import React, {useState} from 'react';
import {Button, Form, NavBar, Radio, Space, TextArea, Toast} from "antd-mobile";
import FormInput from "../../components/form-inputs/form-input";
import {useLocation, useNavigate} from "react-router-dom";
import checkEmpty from "../../utils/check-empty";
import {addJob, updateJob} from "../../redux/reducers/user";
import {useDispatch, useSelector} from "react-redux";
import {jobAPI} from "../../api/job";

function JobDetail(props) {
  const location = useLocation();
  const jobId = location.state.jobId;
  const action = location.state.action;

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userReducer.user._id)

  const [title, setTitle] = useState(location.state.title === undefined ? '' : location.state.title)
  const [level, setLevel] = useState(location.state.level === undefined ?  1 : location.state.level)
  const [description, setDescription] = useState(location.state.description === undefined ? '' : location.state.description)

  const navigate = useNavigate();

  const submit = () => {
    if (checkEmpty(title, "Empty Name")) return;
    if (checkEmpty(description, "Empty Company Name")) return;
    console.log(location.state);
    console.log('userId', userId)

    let api;
    if (action === 'update') {
      api = jobAPI.update
    } else {
      api = jobAPI.add
    }
    // Submit info to server and add
    api(action === 'update' ? jobId : userId, title, level, description).then(resp => {
      console.log("resp", resp)
      if (resp.data.code === 0) {
        Toast.show({
          icon: 'success',
          content: resp.data.msg,
        });
        const job = {
          _id: action === 'update' ? jobId : resp.data.data.jobId,
          level,
          title,
        }
        if (action === 'update')
          dispatch(updateJob({job}));
        else
          dispatch(addJob({job}));
        back();
      } else {
        Toast.show({
          icon: 'fail',
          content: resp.data.msg,
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
        initialValues={{
          title: title,
          level: level,
          description: description,
        }}
        layout='horizontal'
        footer={<Button block color='success' onClick={submit}>Submit</Button>}
      >
        <FormInput name='title' placeholder='Job Title' val={title} setVal={setTitle}/>
        <Form.Item name='level' label='Job Level'>
          <Radio.Group
            value={level}
            onChange={val => {
              console.log(level)
              setLevel(val)
            }}
          >
            <Space direction='vertical'>
              <Radio value={1}>Entry Level</Radio>
              <Radio value={2}>Mid Level</Radio>
              <Radio value={3}>Senior Level</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item name='description'>
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

export default JobDetail;