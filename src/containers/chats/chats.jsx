import React from 'react';
import {Ellipsis, Empty, Image, List} from "antd-mobile";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import timeAgoFormatter from "../../utils/timeAgo";

function Chats(props) {
  const chats = useSelector((state) => state.chatReducer.chats);
  const navigate = useNavigate();

  const toChatDetail = (partner) => {
    //console.log('partner', partner)
    navigate(`/msgs/${partner._id}`, {
      state: {
        user: partner,
      },
    });
  }

  if (chats.length === 0) return (
    <div>
      <Empty description='No Chats' />
    </div>
  );

  return (
    <div>
      <List>
        {chats.map(chat => {
          return (
            <List.Item
              arrow={false}
              key={chat.partner._id}
              onClick={() => toChatDetail(chat.partner)}
              style={{'--active-background-color': '#C6F7FB'}}
              prefix={
                <Image
                  src={require(`../../assets/images/avatars/avatar${chat.partner.avatar + 1}.png`)}
                  style={{ borderRadius: 30 }}
                  fit='cover'
                  width={50}
                  height={50}
                />
              }
              description={<Ellipsis direction='end' content={chat.lastMessage.content} />}
              extra={
                <div style={{width: '20px'}}>
                  {/* Show time of last message */}
                  <div>
                    {timeAgoFormatter.format(chat.lastMessage.date)}
                  </div>
                  {/* Show number of unread messages */}
                  <div style={{
                    float: 'right',
                    background: 'lightblue',
                    width: '15px',
                    textAlign: 'center',
                    visibility: chat.count_unread !== 0 ? 'visible' : 'hidden',
                  }}>
                    {chat.count_unread}
                  </div>
                </div>
              }
            >
              <div>
                {chat.partner.name}
                &nbsp;
              </div>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
}

export default Chats;