import React, {useEffect, useState} from 'react';
import {Button, Empty, List, Space, Toast} from "antd-mobile";
import {jobAPI} from "../../../api/job";
import {jobLevelMap} from "../../../constants/job";
import timeAgoFormatter from "../../../utils/timeAgo";
import {useNavigate} from "react-router-dom";

function HunterMain(props) {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    jobAPI.get().then(response => {
      if (response.data.code !== 0) {
        Toast.show({
          icon: 'fail',
          content: 'Failed to get jobs: ' + response.data.msg,
        })
        return;
      }
      setJobs(response.data.data);
    })
  }, [])

  const chatWith = (user) => {
    navigate(`/msgs/${user._id}`, {
      state: {
        user: user,
      },
    });
  }

  if (jobs.length === 0) return (
    <div>
      <Empty description='No Available Jobs' />
    </div>
  );

  return (
    <div>
      <h2>Available jobs:</h2>
      <Space direction={'vertical'} block>
        {
          jobs.map((job) => {
            return (
              <List key={job._id} style={{'--extra-max-width':`30%`}}>
                <List.Item description={
                              <div>
                                <div>Posted by {job.recruiter.company}</div>
                                <div>{jobLevelMap[job.level] + ' Level, posted ' + timeAgoFormatter.format(job.create_time)}</div>
                              </div>
                            }
                           style={{'backgroundColor': '#C6F7FB'}}>
                  {job.title}
                </List.Item>
                <List.Item prefix={'Recruiter: '+ job.recruiter.name}
                           extra={
                              <Button onClick={() => chatWith(job.recruiter)}>Message</Button>
                            }
                           style={{'backgroundColor': '#F0FDFE'}}
                />
                <List.Item>
                  <div>{job.description}</div>
                </List.Item>
              </List>
            )
          })
        }
      </Space>
    </div>
  );
}

export default HunterMain;