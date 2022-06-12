import React from 'react';
import {SpinLoading} from "antd-mobile";

// TODO
function Loading(props) {
  return (
    <div>
      <SpinLoading color='primary' style={{ '--size': '48px' }} />
    </div>
  );
}

export default Loading;