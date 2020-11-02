import React, { useState }  from 'react';
// import './index.scss'
import { Modal, Button, } from 'antd';
import  Order from '../Order';
 
class psw extends React.Component {

  state = { visible: false };

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
      <>
        <Button type="primary" onClick={this.showModal}>
        修改密码
        </Button>
        <Modal
          title="修改密码"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Order/>
        
        </Modal>
      </>
    );
  }
}

export default psw