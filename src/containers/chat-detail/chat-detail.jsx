import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Button, Image, Input, List, NavBar, Toast} from "antd-mobile";
import {useDispatch, useSelector} from "react-redux";
import {MessageOutline} from "antd-mobile-icons";

import './chat-detail.css'
import {getChatMessagesAsync, setMessagesInConversationAllRead} from "../../redux/reducers/chat";
import {sendMessage} from "../../utils/socket-io";

function ChatDetail(props) {

  const { partnerId } = useParams();
  const user = useSelector((state) => state.userReducer.user)
  const location = useLocation();
  const partner = location.state.user;

  const allMsgs = useSelector((state) => state.chatReducer.msgs);
  const msgs = allMsgs[partnerId] === undefined ? [] : allMsgs[partnerId];
  const [msg, setMsg] = useState('')

  const dispatch = useDispatch();
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Fetch chat messages.
    dispatch(getChatMessagesAsync({userId: user._id, partnerId})).then(resp => {
      if (resp.payload.code !== 0) {
        Toast.show({
          icon: 'fail',
          content: resp.payload.msg,
        })
      }
    }).catch(err => {
      Toast.show({
        icon: 'fail',
        content: err,
      })
    });
  },[])

  useEffect(() => {
    // Set all received messages read
    dispatch(setMessagesInConversationAllRead({
      from: user._id,
      to: partnerId,
    }));
    // Always automatically scroll to bottom when chatting
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  })

  const navigate = useNavigate();
  const back = () => {navigate(-1)}

  const send = () => {
    sendMessage(user._id, partnerId, msg);
    setMsg('');
  }

  return (
    <div className={'chat-detail'}>
      <NavBar className={'message-box-header'} onBack={back}>{partner.name}</NavBar>
      <div className={'messages-body'}>
        <List className={'messages'} mode={'card'}>
          {msgs.map(msg => {
            return (
              <List.Item
                className={'message'}
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
                <div className={'message-text'} style={{float: msg.from === partner._id ? 'left' : 'right'}}>
                  {msg.content}
                </div>
              </List.Item>
            );
          })}
        </List>
        <div ref={messagesEndRef} />
      </div>

      <div className={'message-box-footer'}>
        <Input
          value={msg}
          onChange={ val => { setMsg(val) } }
          clearable
          placeholder="Type..."
          style={{float: 'left', width: '85%'}}
        />
        <div style={{float: 'right'}}>
          <Button size='small' color='primary' onClick={send}>
            <MessageOutline />&nbsp;&nbsp;
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatDetail;