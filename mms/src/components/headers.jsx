import React, { useState } from 'react';
import { Dropdown, Menu, message, Modal, Button, Form, Input, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useHistory, withRouter } from 'react-router-dom';


import './headers.scss'

class Headers extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false };
  }
  logout = () => {
    console.log('退出')
    console.log("this.props", this.props)
    localStorage.removeItem("currentUser") || sessionStorage.removeItem("currentUser")
    this.props.history.push('/login')

  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {

    return (
      <div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={this.showModal}>修改密码</Menu.Item>
              <Menu.Item key="2" onClick={this.logout}>退出</Menu.Item>
            </Menu>
          }>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            个人中心 <DownOutlined />
          </a>
        </Dropdown>

        <>
          <Modal
            title="修改密码"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Changepsw onOk={this.handleOk} onCancel={this.handleCancel} />

          </Modal>
        </>
      </div>
    );
  }
};

const Changepsw = (props) => {
  // let [visible, changeVisible] = useState(true)
  console.log('props', props)
  const { onOk, onCancel } = props
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
        <Button className="cancel" onClick={() => onCancel()}> 取消 </Button>
        <Button type="primary" htmlType="submit">
          确认
          </Button>
      </Form.Item>
    </Form>
  );
};
Headers = withRouter(Headers)
export default Headers;




