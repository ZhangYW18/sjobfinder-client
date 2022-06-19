import React from 'react';
import {TabBar} from "antd-mobile";
import {AppOutline, MessageFill, MessageOutline, UserOutline} from "antd-mobile-icons";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function NavFooter(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location
  const unread = useSelector((state) => state.chatReducer.unread_sum);
  const userIdentity = useSelector((state) => state.userReducer.user.identity);

  const setRouteActive = (path) => {
    navigate(path)
  }

  const tabs = [
    {
      key: '/',
      title: userIdentity === 'hunter' ? 'Jobs' : 'Job Hunters',
      icon: <AppOutline />,
    },
    {
      key: '/chats',
      title: 'Chats',
      icon: (active) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: unread >= 100 ? '99+' : unread > 0 ? unread : '',
    },
    {
      key: '/personal',
      title: 'My',
      icon: <UserOutline />,
    },
  ]

  const currentNav = tabs.find(tab => tab.key===props.pathname)
  if (!currentNav) return;

  return (
    <TabBar activeKey={pathname} onChange={path => setRouteActive(path)}>
      {tabs.map(item => (
        <TabBar.Item
          key={item.key}
          icon={item.icon}
          title={item.title}
          badge={item.badge}
        />
      ))}
    </TabBar>
  );
}

export default NavFooter;
