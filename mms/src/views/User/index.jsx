import React, { useCallback, useEffect, useState, useLayoutEffect } from 'react';
import './index.scss'
import request from '@/utils/request';
import { Breadcrumb, Table, Tag, Space, Button, Input, Form,  Tooltip, Cascader, Select, Row, Col, Checkbox, AutoComplete, Modal, DatePicker} from 'antd';
import { UserOutlined, HomeOutlined, QuestionCircleOutlined } from '@ant-design/icons';



const User = (props) => {
  let [data, changeData] = useState("")
  let [s, changes] = useState("")
  //渲染数据
  useEffect(async () => {
    try {
      const data2 = await request.get('/user/list', {
        params: {
          page: 1,
          pagesize: 20
        }
      })
      if (data2.data.flag) {
        changeData(data2.data.data)
      }
    } catch (err) {
      console.log("err", err)
    }
  }, [])

  //删除功能
  const delUser = async (id) => {
    try {
      const deldata = await request.delete('/user/del/' + id)
      console.log(deldata, "deldata")
      console.log("id", id)
      console.log("data", data)
      if (deldata.data.flag) {
        let newData = data.filter(item => {
          return item._id !== id
        })
        changeData(newData)
        // data = newData
        console.log("newData", newData)

      }
    } catch (err) {
      console.log("err", err)
    }
  }
  //查询功能
  const fetchall = async (value) => {
    try {
      let p = await request.get('/user/list', {
        params: {
          page: 1,
          pagesize: 20,
          search: { "name": value }
        }
      })
      if (p.data.flag) {
        changeData(p.data.data)
        // data = p.data.data
      }
    } catch (err) {
      console.log(err);
    }
  }
  const clearValue = () => {
    console.log(s, 'sssss')
    console.log(s.clearableInput.props.allowClear, 'oooo')
    s.clearableInput.props.allowClear = false
  }
  const { Search } = Input;
  const { Column, ColumnGroup } = Table;
  const onSearch = value => {
    console.log(value)
    fetchall(value)
  };
  return (
    <div>
      <Search
        style={{}}
        placeholder="请输入关键字"
        allowClear
        enterButton="查询"
        size="large"
        // onChange
        onSearch={onSearch}
        ref={(e) => {
          changes(e)
        }}
      />
      <Button type="primary" className="btn1" onClick={() => { clearValue() }}>
        重置
        </Button>
        {/* 新增 */}
       < Open/>
      <Breadcrumb>
        <Breadcrumb.Item >
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item >
          <UserOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item>用户管理</Breadcrumb.Item>
      </Breadcrumb>

      <Table dataSource={data}>
        <Column title="姓名" dataIndex="name" key="name" />
        <Column title="性别" dataIndex="sex" key="sex" />
        <Column title="生日" dataIndex="birthday" key="birthday" />
        <Column title="手机号码" dataIndex="phone" key="phone" />
        <Column title="地址" dataIndex="address" key="address" />
        <Column title="头像" dataIndex="pic" key="pic"
          render={(text, record) => (

            < Space size="large">
              {console.log("text", text, text.substring(0, 21))}
              {console.log("record", record)}
              <img src={text.substring(0, 21)} alt="" />
            </Space >

          )}
        />

        <Column
          title="操作"
          key="action"
          render={(text, record) => (
            < Space size="middle">
              <Button>编辑</Button>
              <Button danger onClick={() => { delUser(text._id) }} >删除</Button>
            </Space >

          )}
        />
      </Table>
    </div>
  )
}


const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const config = {
  rules: [{ type: 'object', required: true, message: '请选择生日' }],
}
const onFinish = fieldsValue => {
  const values = {
    ...fieldsValue,
    'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
  };
  console.log('时间', values);
};


const formItemLayout = {
  labelCol: {
    span: 4 
  },
  wrapperCol: {
    span: 16
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span:18,
      offset: 6,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Newput = (props) => {
//解构 onOk, onCancel 方法
  const { onOk, onCancel } = props

  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      // initialValues={{}} 默认值填写
      scrollToFirstError
    >
      <Form.Item
        name="username"
        label={
          <span>
            用户名
          </span>
        }
        rules={[{ required: true, message: '请输入用户名', whitespace: true }]}
      >
        <Input style={{width:250}} />
      </Form.Item>

      <Form.Item
        name="sex"
        label="性别"
        hasFeedback
        rules={[{ required: true, message: '请选择您的性别' }]}
      >
        <Select placeholder="请选择您的性别" style={{width:150}}>
          <Option value="男">男</Option>
          <Option value="女">女</Option>
        </Select>
      </Form.Item>

      <Form.Item name="date-picker" label="生日" {...config} >
        <DatePicker />
        </Form.Item>

      <Form.Item
        name="phone"
        label="手机号码"
        rules={[{ required: true, message: '请输入您的手机号码' },
        {min:11, max:11, message:'请输入11位的手机号码'}
      ]}
      >
        <Input style={{width:250}}/>
      </Form.Item>
    
      <Form.Item
        name="address"
        label="地址"
        rules={[{ required: true, message: '请输入地址' }]}
      >
          <Input />
      </Form.Item>
       
      <Form.Item {...tailFormItemLayout}>
      <Button className='cancelbtn' onClick={() => onCancel()}> 
         取消
        </Button>
        <Button type="primary" htmlType="submit">
          确认
        </Button>
      </Form.Item>
    </Form>
  );
};

class Open extends React.Component {
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
          新增
        </Button>
        <Modal
          title="新增用户"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Newput onOk={this.handleOk}  onCancel={this.handleCancel} />
        </Modal>
      </>
    );
  }
}


export default User