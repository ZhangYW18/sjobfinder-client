import React, {useEffect, useState} from 'react';
import {
  AutoCenter,
  Button,
  Card,
  Ellipsis,
  Grid,
  Image,
  List,
  Modal,
  Result,
  Selector,
  Space,
  TextArea
} from "antd-mobile";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {jobLevelMap} from "../../constants/job";
import {userAPI} from "../../api/user";


function JobsSelector(props) {
  const navigate = props.navigate
  const [jobs, setJobs] = useState([{title: "SDE", level: 1, _id: '1'}, {title: "SE", level: 2, _id: '2'}])
  const [selectedJobId, setSelectedJobId] = useState('')

  const selectorOptions = jobs.map(((job, index) => {
    return {
      label: job.title,
      description: jobLevelMap[job.level] + ' Level',
      value: job._id,
    }
  }))

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

  return (
    <List.Item>
      <div style={{'textAlign':'center'}}>Job Posts List</div>
       {/*Job Posts List*/}
      <Button block color='success' onClick={() =>
          navigate("/job-detail", {
            state: {
              action: 'add',
            },
          }
        )}>Add a Post</Button>
      <Grid columns={2}>
        <Button color='warning' onClick={() => {
          navigate("/job-detail", {
            state: {
              action: 'update',
              jobId: selectedJobId,
            },
          })
        }}>Update Selected</Button>
        <Button color='danger'>Delete Selected</Button>
      </Grid>
      <Selector
        columns={2}
        options={selectorOptions}
        defaultValue={jobs.length > 0 ? [jobs[0]._id] : []}
        onChange={(value) => {setSelectedJobId(value[0])}}
      />
    </List.Item>
  );
}


function Personal(props) {
  const navigate = useNavigate()

  const user = useSelector((state) => state.user.user)
  console.log(user)

  const logout = () => {
    Modal.show({

    })
  }

  return (
    <div>
      <List>
        <List.Item>
          <AutoCenter>
            <Image
              src={require(`../../assets/images/avatars/avatar${((user.avatar >= 0 && user.avatar < 20) ? user.avatar : 0) + 1}.png`)}
              width={64}
              height={64}
              style={{
                borderRadius: 32,
              }}
            />
          </AutoCenter>
        </List.Item>

        <List.Item>
          <AutoCenter>{user.name}</AutoCenter>
          {user.identity === 'recruiter' ? <AutoCenter>{user.company}</AutoCenter> : null}
        </List.Item>

        {
          user.identity === 'hunter' ?
            <List.Item>
              <TextArea
                placeholder={user.introduction}
                autoSize={{ minRows: 1, maxRows: 1000 }}
                disabled
                style={{'--font-size': '14px'}}
              />
            </List.Item>
          : null
        }

        <List.Item>
          <Button block color='primary' size='large' onClick={() => {
            if (user.identity === 'recruiter')
              navigate("/recruiter-info");
            else
              navigate("/hunter-info");
          }}>
            Update My Profile
          </Button>
        </List.Item>

        {user.identity === 'recruiter' ? <JobsSelector navigate={navigate}/> : null}

        <List.Item>
          <Button block color='danger' size='large'>
            Logout
          </Button>
        </List.Item>

      </List>

    </div>
  );
}

export default Personal;