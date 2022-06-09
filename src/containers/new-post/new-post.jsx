import React, {useState} from 'react';
import {Button, Form, NavBar, Radio, Space, TextArea} from "antd-mobile";
import FormInput from "../../components/form-inputs/form-input";
import {useLocation, useNavigate} from "react-router-dom";

function NewPost(props) {
  const location = useLocation();

  const [title, setTitle] = useState(location.state.title)
  const [level, setLevel] = useState('entry')
  const [description, setDescription] = useState(location.state.title)

  const navigate = useNavigate();

  const addNewJobPost = () => {
    console.log(title)

    // if (success) navigate(-1)
  }

  const toRecruiterInfo = () => {
    navigate("/recruiter-info")
  }

  return (
    <div>
      <NavBar onBack={toRecruiterInfo}>
        Add a New Job Post
      </NavBar>
      <Form
        layout='horizontal'
        footer={<Button block color='success' onClick={addNewJobPost}>Add This Job Post</Button>}
      >
        <FormInput name='Job Title' val={title} setVal={setTitle} defaultValue={location.state.title}/>
        <Form.Item label='Job Level'>
          <Radio.Group
            value={level}
            onChange={val => {
              setLevel(val)
            }}
          >
            <Space direction='vertical'>
              <Radio value='entry'>Entry Level</Radio>
              <Radio value='mid'>Mid Level</Radio>
              <Radio value='senior'>Senior Level</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item name='Description'>
          <TextArea
            className='description'
            placeholder='Job Description'
            defaultValue={location.state.description}
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