import React from 'react';
import {Avatar, Ellipsis, List, Space} from "antd-mobile";


function Avatars(props) {
  const chosen = props.chosen
  const setChosen = props.setChosen

  return (
    <Space wrap style={{ '--gap': '6px'}}>
      {
        Array.from(new Array(props.number), (val, index) => index).map(p => {
          return (
            <List.Item
              arrow={false}
              onClick={() => setChosen(p)}
              key={p}
              style={{ 'backgroundColor': chosen === p ? 'orange' : 'white'}}
            >
              <Avatar
                src={require(`../../assets/images/avatars/avatar${p + 1}.png`)}
              />
            </List.Item>
          )
        })
      }
    </Space>
  );
}

function AvatarSelector(props) {
  return (
    <div>
      <Ellipsis direction='end' content={'Choose an avatar:'} style={{
        'fontSize': '16px',
      }}/>
      <List
        style={{
          '--padding-left': '5px',
          '--padding-right': '5px',
          '--border-top': '5px',
          '--border-bottom': '5px',
        }}
      >
        <Avatars chosen={props.avatar} setChosen={props.setAvatar} number={20}/>
      </List>
    </div>
  );
}

export default AvatarSelector;