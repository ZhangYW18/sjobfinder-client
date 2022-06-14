import React, {useState} from 'react';
import {
  AutoCenter,
  Button,
  Grid,
  Image,
  List,
  Selector, Space,
  TextArea, Toast
} from "antd-mobile";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {jobLevelMap} from "../../constants/job";
import {jobAPI} from "../../api/job";
import {logout as logoutUser, deleteJob} from "../../redux/reducers/user";
import Cookies from "js-cookie";

// JobsSelector component for recruiter users
function JobsSelector(props) {
  const navigate = props.navigate
  const dispatch = props.dispatch;
  const [jobs, setJobs] = useState(props.jobs)
  // Mock data for jobs: useState([{title: "SDE", level: 1, _id: '1'}, {title: "SE", level: 2, _id: '2'}])
  const [selectedJobId, setSelectedJobId] = useState('') // useState(props.jobs[0]._id)

  const selectorOptions = jobs.map(((job) => {
    return {
      label: job.title,
      description: jobLevelMap[job.level] + ' Level',
      value: job._id,
    }
  }))

  const updateSelectedJob = () => {
    if (selectedJobId === '') {
      Toast.show({
        content: 'Please select a job',
      });
      return;
    }
    // Get the detailed information of the job first, and then send it to job-detail page when navigating.
    jobAPI.get(selectedJobId).then(function (response) {
      if (response.data.code !== 0) {
        Toast.show({
          icon: 'fail',
          content: 'Failed to get job details: ' + response.data.msg,
        })
        return;
      }
      const job = response.data.data
      // console.log(job)

      navigate("/job-detail", {
        state: {
          action: 'update',
          jobId: selectedJobId,
          title: job.title,
          level: job.level,
          description: job.description,
        },
      })
    }).catch(function (err) {
      console.log(err)
      Toast.show({
        icon: 'fail',
        content: 'Failed to get job details: ' + err.toString(),
      });
    });
  }

  const deleteSelectedJob = () => {
    if (selectedJobId === '') {
      Toast.show({
        content: 'Please select a job',
        duration: 1000,
      });
      return;
    }
    // Get the detailed information of the job first, and then send it to job-detail page when navigating.
    jobAPI.delete(selectedJobId).then(function (response) {
      console.log(response)
      if (response.data.code === 0) {
        Toast.show({
          icon: 'success',
          content: response.data.msg,
        })
        dispatch(deleteJob({jobId: selectedJobId}));
        let newJobs = []
        for (let i = 0; i < jobs.length; i++) {
          if (jobs.at(i)._id !== selectedJobId) {
            newJobs.push(jobs.at(i))
          }
        }
        console.log(newJobs)
        setJobs(newJobs)
      } else {
        Toast.show({
          icon: 'fail',
          content: response.data.msg,
        });
      }
    }).catch(function (err) {
      console.log(err)
      Toast.show({
        icon: 'fail',
        content: 'Failed to delete job: ' + err.toString(),
      });
    });
  }

  return (
    <List.Item>
      {/*<div style={{'textAlign':'center'}}>Job Posts List</div>*/}
       {/*Job Posts List*/}
      <Selector
        columns={2}
        options={selectorOptions}
        //defaultValue={jobs.length > 0 ? [jobs[0]._id] : []}
        onChange={(value) => {setSelectedJobId(value.length > 0 ? value[0] : '')}}
      />
      <Space/>
      <Button block color='warning' onClick={updateSelectedJob}>Update / View Selected</Button>
      <Grid columns={2}>
        <Button block color='success' onClick={() =>
          navigate("/job-detail", {
              state: {
                action: 'add',
              },
            }
          )}>Post a Job</Button>
        <Button color='danger' onClick={deleteSelectedJob}>Delete Selected</Button>
      </Grid>
      <Space/>
    </List.Item>
  );
}

// Personal function defines Personal Center component for recruiters and job hunters.
function Personal(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.userReducer.user)
  const jobs = useSelector((state) => state.userReducer.jobs)

  const logout = () => {
    // Clear cookie and redux
    Cookies.remove('userid');
    dispatch(logoutUser());
    Toast.show({
      content: 'Logout Success',
      position: 'bottom',
    });
    navigate("/login");
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
          <AutoCenter style={{'fontSize': '22px'}}>{user.name}</AutoCenter>
          <AutoCenter>{user.identity === 'recruiter' ? user.company : user.headline}</AutoCenter>
          {
            user.identity === 'hunter' ?
              <List.Item>
                <TextArea
                  placeholder={user.introduction}
                  autoSize={{ minRows: 1, maxRows: 1000 }}
                  disabled
                  style={{
                    '--font-size': '14px',
                    '--disabled-color': 'black'
                  }}
                />
              </List.Item>
              : null
          }
          <Space/>
          <Button block color='warning' size='large' onClick={() => {
            if (user.identity === 'recruiter')
              navigate("/recruiter-info");
            else
              navigate("/hunter-info");
          }}>
            Update My Profile
          </Button>
        </List.Item>

        {user.identity === 'recruiter' ? <JobsSelector navigate={navigate} dispatch={dispatch} jobs={jobs}/> : null}

        <List.Item>
          <Button block color='danger' size='large' onClick={logout}>
            Logout
          </Button>
        </List.Item>

      </List>

    </div>
  );
}

export default Personal;