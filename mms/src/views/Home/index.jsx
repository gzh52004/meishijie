import React, { Suspense, lazy, useCallback, useEffect, useState, useLayoutEffect } from 'react';
import { withRouter, useHistory, useLocation, useRouteMatch, useParams, Route, Switch, Redirect } from 'react-router-dom';
import { Menu, Divider, Layout, message, Modal, Button, Breadcrumb } from 'antd';
import {
    UserOutlined,
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    LinkOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import request from '@/utils/request';
import './index.scss'
// import { MyContext } from '../../store/reducers/user'
import { connect } from 'react-redux';
import { withAuth, withUser } from '../../utils/hoc'


const User = lazy(() => import("../User"));
const Goods = lazy(() => import("../Goods"));
const Order = lazy(() => import("../Order"));
const Collect = lazy(() => import("../Collect"));
const Headers = lazy(() => import("@/components/headers"));


const { Header, Footer, Sider, Content } = Layout;

let Home = (props) => {
    const { push, location } = useHistory();
    //设置初始值，每次刷新页面获取pathname作为初始值
    let [current, changeCurrent] = useState(location.pathname)
    //点击跳转到相应页面
    //key={item.path},这边的key为path
    let data
    const changeMenu = async ({ key }) => {
        push(key);
        current = key;
        changeCurrent(current)//改变高亮值
        data = await request.get('/user/list', {
            params: {
                page: 1,
                pagesize: 10
            }
        })
    }
    console.log('current', current)

    const menu = [
        {
            text: '用户管理',
            path: '/home/user',
            name: 'user',
            component: User,
            icon: UserOutlined
        },
        {
            text: '菜品管理',
            path: '/home/goods',
            name: 'goods',
            component: Goods,
            icon: CalendarOutlined
        },
        {
            text: '订单管理',
            path: '/home/order',
            name: 'order',
            component: Order,
            icon: AppstoreOutlined
        },
        {
            text: '收藏管理',
            path: '/home/collect',
            name: 'collect',
            component: Collect,
            icon: MailOutlined
        }
    ]

    return (
        <div className="App" theme='light'>
            <Layout>
                <Header style={{ position: 'fixed', width: '100%' }}>
                    <div>美食杰后台管理系统</div>
                    <div className="Personal">
                        <Headers />
                    </div>
                </Header>
                <Layout>
                    <Sider style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 64,
                        background: '#fff',
                        borderRight: '1px solid #eee',
                    }}
                    >
                        <>
                            <Menu
                                style={{ width: 200 }}
                                theme='light'
                                onClick={changeMenu}//设置高亮值
                                selectedKeys={current}

                            >
                                {/* <Menu.Item key="1" icon={<UserOutlined />}>
              用户管理
            </Menu.Item>
            <Menu.Item key="2" icon={<CalendarOutlined />}>
              菜品管理
            </Menu.Item>
            <Menu.Item key="3" icon={<AppstoreOutlined />}>
              订单管理
            </Menu.Item>
            <Menu.Item key="4" icon={<MailOutlined />}>
              收藏管理
            </Menu.Item> */}

                                {/* 循环渲染导航栏 */}
                                {
                                    menu.map(item => <Menu.Item
                                        key={item.path}
                                        icon={<item.icon />}
                                    >{item.text}</Menu.Item>)
                                }
                            </Menu>
                        </>
                    </Sider>
                    <Content >
                        <Suspense fallback={<div>loading...</div>}>
                            <Switch>
                                <Route path='/home/user' component={User} userdata={data} />
                                <Route path='/home/goods' component={Goods} />
                                <Route path='/home/order' component={Order} />
                                <Route path='/home/collect' component={Collect} />
                                <Redirect from='/home' to='/home/user' exact />
                            </Switch>
                        </Suspense>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}
Home = withAuth(Home)
export default Home;
