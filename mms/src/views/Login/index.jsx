import React, { useContext, useState } from 'react';
import './index.scss'
import SHA256 from 'crypto-js/sha256';
import { Form, Input, Button, Checkbox, message } from 'antd';
import request from '@/utils/request';
import { connect } from 'react-redux';
import userAction from '../../store/actions/user'
import { useHistory, useLocation } from 'react-router-dom'
import { MyContext } from '../../store/reducers/user'
import userReducer from '../../store/reducers/user';

// console.log("MyContext", MyContext)
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const rules = {
    username: [
        { required: true, message: '用户名不能为空' },
    ],
    password: [
        { required: true, message: '密码不能为空' },
    ]
}

let Login = (props) => {
    // let { state, dispatch } = useContext(MyContext)
    // console.log(dispatch, "login.dispatch")
    // console.log(state, "login.state")

    console.log("login.props", props)
    const onFinish = async values => {
        console.log('加密前=', values)

        // 把密码通过Crypto进行加密（加密算法：sha256）
        let { username, password, remember } = values;
        password = SHA256(values.password).toString()

        //触发第一个action进入中间件，并把用户名和密码传进去
        // return dispatch({ type: 'login_async', data: { username, password } })
        // return 
        const { data } = await request.get('/user/login', {
            params: {
                // 现在发送的才是加密后的密码给后端！！
                username,
                password,
            }
        })
        console.log(data, "data")

        // const value = useContext(MyContext);
        // console.log(value, "value")
        // setTimeout(() => {
        //     console.log(props.state, "改变")
        // }, 1000)
        // console.log("login.props", props)
        let { token } = data
        if (data.flag) {
            props.dispatch({ type: 'login', data: { username, password } })
            if (remember) {
                console.log(123)
                localStorage.setItem('currentUser', JSON.stringify({ username, token }))
            } else {
                console.log(456)
                sessionStorage.setItem('currentUser', JSON.stringify({ username, token }))
            }
            // console.log(succeed, "succeed")
            message.success('登录成功')

            // 提取目标地址 
            const pathname = props.location.search.match(/targetUrl\=([\/\w\-]+)/);
            let targetUrl;
            if (pathname) {
                targetUrl = pathname[1];
            }
            console.log('targetUrl', targetUrl)
            props.history.push({
                pathname: targetUrl || '/home/user'
            })
        } else {
            message.error('用户名或密码错误')
        }

    }


    return (
        <div className="reg-container">

            <Form className="login-form"
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            >
                <h1 className="login-title">美食杰会员管理系统-登录</h1>
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={rules.username}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={rules.password}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>保留7天免登陆</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button className="btn3" type="primary" htmlType="submit" style={{ marginRight: "20px" }} onClick={() => {
                        props.history.push('/reg')
                    }}>
                        注册
            </Button>
                    <Button className="btn4" type="primary" htmlType="submit">
                        登录
            </Button>
                </Form.Item>
            </Form>
        </div>
    );

};

const mapStateToProps = state => {
    return {
        state
    }
}

// 主要是可以把redux的代码集中的放在一起, mapDispatchToProps里面有props
const mapDispatchToProps = dispatch => {
    return {
        dispatch,//记得要把dispatch加回去，不然就会被覆盖
        //封装登录的方法，并传user参数进去
        login(user) {
            console.log(user, "user")
            //dispatch({ type: 'login', user })
            //又去封装了生成登录action的函数了
            // dispatch(userAction.login(user))
            dispatch({ type: 'login', data: { username, password } })
        },
        logout() {
            dispatch(userAction.logout())
        }
    }
    // 如果同时要用到几个action的话、可以借助一个方法,能用到userAction里面的所有方法
    // return bindActionCreators(userAction, dispatch)
}
Login = connect(mapStateToProps, mapDispatchToProps)(Login)  //还会自动把dispatch传进props里面去
export default Login