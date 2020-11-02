import React, { useState } from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Button,
} from 'antd';

// import './index.scss'

  // const formItemLayout = {
  //   labelCol: {
  //     xs: { span: 24 },
  //     sm: { span: 8 },
  //   },
  //   wrapperCol: {
  //     xs: { span: 24 },
  //     sm: { span: 16 },
  //   },
  // };
  // const tailFormItemLayout = {
  //   wrapperCol: {
  //     xs: {
  //       span: 24,
  //       offset: 0,
  //     },
  //     sm: {
  //       span: 16,
  //       offset: 8,
  //     },
  //   },
  // };
  
const Changepsw = () => {
    const [form] = Form.useForm();
  
    const onFinish = values => {
      console.log('Received values of form: ', values);
    };
    return (
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
     
        <Form.Item
          name="oldPassword"
          label="旧密码"
          rules={[
            {
              required: true,
              message: '请输入旧密码',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="新密码"
          rules={[
            {
              required: true,
              message: '请输入新密码',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请再次输入新密码',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次密码不一致，请重新输入');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            确认
          </Button>
        </Form.Item>
      </Form>
    );
  };

  export default Changepsw