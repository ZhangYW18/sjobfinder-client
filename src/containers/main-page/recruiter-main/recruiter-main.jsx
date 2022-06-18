import React, {useEffect, useState} from 'react';
import {userAPI} from "../../../api/user";
import {Avatar, Button, List, Space, Toast} from "antd-mobile";
import {useNavigate} from "react-router-dom";

function RecruiterMain(props) {
  const [hunters, setHunters] = useState([])
  const navigate = useNavigate();

  // Get job hunters' list first.
  useEffect(() => {
    userAPI.getUserByIdentity('hunter').then(response => {
      if (response.data.code !== 0) {
        Toast.show({
          icon: 'fail',
          content: 'Failed to get job hunters: ' + response.data.msg,
        })
        return;
      }
      setHunters(response.data.data);
    })
  }, [])

  const chatWith = (userId) => {
    navigate(`/msgs/${userId}`);
  }

  return (
    <div>
      <h2>Available job hunters:</h2>
      <Space direction={'vertical'} block style={{'paddingBottom': '50px'}}>
        {
          hunters.map((hunter) => {
            return (
              <List key={hunter._id}>
                <List.Item prefix={<Avatar src={require(`../../../assets/images/avatars/avatar${hunter.avatar + 1}.png`)} />}
                           description={hunter.headline}
                           extra={<Button onClick={() => chatWith(hunter._id)}>Message</Button>}
                           style={{'backgroundColor': '#C6F7FB'}}>
                  {hunter.name}
                </List.Item>
                <List.Item>
                  <div>{hunter.introduction}</div>
                </List.Item>
              </List>
            )
          })
        }
      </Space>
    </div>
  );
}

export default RecruiterMain;