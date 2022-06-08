import {Toast} from "antd-mobile";

const checkEmpty = (str, msg) => {
  if (str === '') {
    Toast.show({
      content: msg,
      position: 'bottom',
    })
    return true;
  }
  return false;
}

export default checkEmpty;
