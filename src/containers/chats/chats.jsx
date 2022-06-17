import React, {useEffect, useState} from 'react';
import {Ellipsis, Image, List, Space, Tag} from "antd-mobile";
import {useSelector} from "react-redux";
import {timeAgo} from "../../utils/timeAgo";
import {useNavigate} from "react-router-dom";

const mockData = [
  {
    "_id": "62a9be2dd335e4776ae78ac9,62a9bb93d335e4776ae78ac2",
    "from": {
      "_id": "62a9bb93d335e4776ae78ac2",
      "avatar": 7,
      "name": "Bob"
    },
    "to": {
      "_id": "62a9be2dd335e4776ae78ac9",
      "avatar": 11,
      "company": "Yellow",
      "name": "Caroline"
    },
    "content": "be what i wanna be yes! no",
    "date": "2022-06-15T11:41:40.855Z",
    "count_unread": 0
  },
  {
    "_id": "62a9bb93d335e4776ae78ac2,62a9b8e1a9b23e4477569bc7",
    "from": {
      "_id": "62a9bb93d335e4776ae78ac2",
      "avatar": 7,
      "name": "Bob"
    },
    "to": {
      "_id": "62a9b8e1a9b23e4477569bc7",
      "avatar": 7,
      "company": "DreamCompany",
      "name": "Alice Len"
    },
    "content": "look at me",
    "date": "2022-06-15T11:41:05.066Z",
    "count_unread": 1
  }
]

function Chats(props) {
  const [chats, setChats] = useState(mockData);
  const userId = useSelector((state) => state.userReducer.user._id);
  // const unreadSum = useSelector((state) => state.chatReducer.unreadSum);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch chat msgs
    console.log(userId);
  }, [])

  const toChatDetail = (chatId) => {
    console.log(chatId)
    navigate(`/msgs/${chatId}`);
  }

  return (
    <div>
      <List>
        {chats.map(chat => {
          return (
            <div>
              <List.Item
                key={chat._id}
                onClick={() => toChatDetail(chat._id)}
                prefix={
                  <Image
                    src={require(`../../assets/images/avatars/avatar${(chat.from._id === userId) ? (chat.to.avatar + 1) : (chat.from.avatar + 1)}.png`)}
                    style={{ borderRadius: 30 }}
                    fit='cover'
                    width={50}
                    height={50}
                  />
                }
                description={<Ellipsis direction='end' content={chat.content} />}
                extra={
                  <div>
                    {/* Show time of last message */}
                    <div>
                      {timeAgo.format(Date.parse(chat.date))}
                    </div>
                    {/* Show number of unread messages */}
                    <div style={{
                      float: 'right',
                      background: 'lightblue',
                      width: '20px',
                      textAlign: 'center',
                    }}>
                      {chat.to._id === userId ? chat.count_unread : ''}
                    </div>
                  </div>
                }
              >
                <div>
                  {chat.from._id === userId ? chat.to.name : chat.from.name}
                  &nbsp;
                </div>
              </List.Item>
            </div>
          );
        })}
      </List>
    </div>
  );
}

export default Chats;