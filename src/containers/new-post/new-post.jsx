import React, {useState} from 'react';
import {Button, Form, NavBar, Radio, Space, TextArea} from "antd-mobile";
import FormInput from "../../components/form-inputs/form-input";
import {useNavigate} from "react-router-dom";

function NewPost(props) {
  const [title, setTitle] = useState('')
  const [level, setLevel] = useState('entry')
  const [description, setDescription] = useState('')

  const navigate = useNavigate();

  const addNewJobPost = () => {

  }

  const toRecruiterInfo = () => {
    navigate("/recruiter-info")
  }

  return (
    <div>
      <NavBar back='Back' onBack={toRecruiterInfo}>
        Add a New Job Post
      </NavBar>
      <Form
        layout='horizontal'
        footer={<Button block color='success' onClick={addNewJobPost}>Add This Job Post</Button>}
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