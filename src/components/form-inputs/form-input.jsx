import {Form, Input} from "antd-mobile";
import React from "react";

function FormInput(props) {
  return (
    <Form.Item name={props.name}>
      <Input placeholder={props.name}
             value={props.val}
             onChange={val => {
               props.setVal(val)
             }}
             defaultValue={props.defaultValue}
             clearable />
    </Form.Item>
  )
}

export default FormInput;
