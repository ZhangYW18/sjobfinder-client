import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Image, Input, List, NavBar} from "antd-mobile";
import {useSelector} from "react-redux";
import {MessageOutline} from "antd-mobile-icons";

import './chat-detail.css'
import {getChatId} from "../../utils/chat";

function ChatDetail(props) {

  const { partnerId } = useParams();
  const user = useSelector((state) => state.userReducer.user)
  const chatId = getChatId(user._id, partnerId)
  const partner = useSelector((state) => state.chatReducer.chats).find(chat => chat._id === chatId).partner;
  console.log(partner)

  const [msgs, setMsgs] = useState([
    {
      "_id": "62a9c56ca149a3c5daac6354",
      "from": "62a9bb93d335e4776ae78ac2",
      "content": "i know i can",
      "create_time": "2022-06-15T11:41:32.290Z"
    },
    {
      "_id": "62a9c574a149a3c5daac6356",
      "from": "62a9bb93d335e4776ae78ac2",
      "content": "be what i wanna be",
      "create_time": "2022-06-15T11:41:40.855Z"
    },
    {
      "_id": "62a9c574a149a3c5daac6356",
      "from": "62a9be2dd335e4776ae78ac9",
      "content": "yes",
      "create_time": "2022-06-15T11:41:40.855Z"
    },
    {
      "_id": "62a9c56ca149a3c5daac6354",
      "from": "62a9bb93d335e4776ae78ac2",
      "content": "i know i can",
      "create_time": "2022-06-15T11:41:32.290Z"
    },
    {
      "_id": "62a9c574a149a3c5daac6356",
      "from": "62a9bb93d335e4776ae78ac2",
      "content": "be what i wanna be",
      "create_time": "2022-06-15T11:41:40.855Z"
    },
    {
      "_id": "62a9c574a149a3c5daac6356",
      "from": "62a9be2dd335e4776ae78ac9",
      "content": "yes",
      "create_time": "2022-06-15T11:41:40.855Z"
    },
    {
      "_id": "62a9c56ca149a3c5daac6354",
      "from": "62a9bb93d335e4776ae78ac2",
      "content": "i know i can",
      "create_time": "2022-06-15T11:41:32.290Z"
    },
    {
      "_id": "62a9c574a149a3c5daac6356",
      "from": "62a9bb93d335e4776ae78ac2",
      "content": "be what i wanna be",
      "create_time": "2022-06-15T11:41:40.855Z"
    },
    {
      "_id": "62a9c574a149a3c5daac6356",
      "from": "62a9be2dd335e4776ae78ac9",
      "content": "yes",
      "create_time": "2022-06-15T11:41:40.855Z"
    },
    {
      "_id": "62a9c56ca149a3c5daac6354",
      "from": "62a9bb93d335e4776ae78ac2",
      "content": "i know i can",
      "create_time": "2022-06-15T11:41:32.290Z"
    },
    {
      "_id": "62a9c574a149a3c5daac6356",
      "from": "62a9bb93d335e4776ae78ac2",
      "content": "be what i wanna be",
      "create_time": "2022-06-15T11:41:40.855Z"
    },
    {
      "_id": "62a9c574a149a3c5daac6356",
      "from": "62a9be2dd335e4776ae78ac9",
      "content": "yes",
      "create_time": "2022-06-15T11:41:40.855Z"
    },
  ])

  useEffect(() => {
    // Fetch chat msgs using chat_id
    console.log('fetch')
  },[])

  const navigate = useNavigate();
  const back = () => {navigate(-1)}

  const sendMessage = () => {

  }

  return (
    <div className={'chat-detail'}>
      <NavBar onBack={back}>{partner.name}</NavBar>
      <div className={'messages-body'}>
        <List mode={'card'}>
          {msgs.map(msg => {
            return (
              <List.Item
                key={msg._id}
                prefix={
                  // Message is from partner
                  msg.from === partner._id ?
                  <Image
                    src={require(`../../assets/images/avatars/avatar${partner.avatar + 1}.png`)}
                    style={{ borderRadius: 15 }}
                    fit='cover'
                    width={30}
                    height={30}
                  /> : null
                }
                extra={
                  // Message is from self
                  msg.from === user._id ?
                    <Image
                      src={require(`../../assets/images/avatars/avatar${user.avatar + 1}.png`)}
                      style={{ borderRadius: 15 }}
                      fit='cover'
                      width={30}
                      height={30}
                    /> : null
                }
              >
                <div style={{ borderRadius: 15, width: 'fit-content', 'line-height': 35, height: 35, background: '#C6F7FB',
                  float: msg.from === partner._id ? 'left' : 'right'}}>
                  &nbsp;&nbsp;{msg.content}&nbsp;&nbsp;
                </div>
              </List.Item>
            );
          })}
        </List>
      </div>

      <div className={'message-box-footer'}>
        <Input clearable style={{float: 'left', width: '85%'}}
          placeholder="Type..."
        />
        <div style={{float: 'right'}}>
          <Button size='small' color='primary' onClick={sendMessage}>
            <MessageOutline />&nbsp;&nbsp;
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatDetail;