import React, {useEffect, useState} from 'react';
import {Button, List, Space, Toast} from "antd-mobile";
import {jobAPI} from "../../../api/job";
import {jobLevelMap} from "../../../constants/job";
import {lorem} from "../../../constants/common";

function HunterMain(props) {
  const [jobs, setJobs] = useState([{
      "_id": "62a447f7a5b4d201a7b573cf",
      "userId": "62a2dd99b40f6562c9c6df39",
      "title": "SRE",
      "company": "Meta",
      "description": lorem,
      "level": 2,
      "create_time": "2022-06-11T07:44:55.026Z",
      "update_time": "2022-06-11T07:44:55.026Z",
      "__v": 0
    },
    {
      "_id": "62a44a2ca5b4d201a7b573d9",
      "userId": "62a2dd99b40f6562c9c6df39",
      "title": "Manager",
      "company": "Google",
      "description": lorem,
      "level": 3,
      "create_time": "2022-06-11T07:54:20.812Z",
      "update_time": "2022-06-11T10:25:36.502Z",
      "__v": 0
    },
    {
      "_id": "62a44a2ca5b4d201a7b573d9assd",
      "userId": "62a2dd99b40f6562c9c6df39",
      "title": "Manager",
      "company": "Google",
      "description": lorem,
      "level": 3,
      "create_time": "2022-06-11T07:54:20.812Z",
      "update_time": "2022-06-11T10:25:36.502Z",
      "__v": 0
    }]);

  useEffect(() => {
    jobAPI.get().then(response => {
      if (response.data.code !== 0) {
        Toast.show({
          icon: 'fail',
          content: 'Failed to get jobs: ' + response.data.msg,
        })
        return;
      }
      //setJobs(response.data.data);
    })
  }, [])

  const chatWith = (userId) => {
    console.log(userId)
    return {};
  }

  return (
    <div>
      <Space direction={'vertical'} block style={{'paddingBottom': '50px'}}>
        {
          jobs.map((job) => {
            return (
              <List key={job._id}>
                <List.Item description={jobLevelMap[job.level] + ' Level, posted 12 months ago'}
                           extra={<Button onClick={() => chatWith(job.userId)}>Message</Button>}
                           style={{'backgroundColor': '#C6F7FB'}}>
                  {job.title}
                </List.Item>
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