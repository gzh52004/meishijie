import React from 'react';
import request from '@/utils/request';
import { NavBar, Icon } from 'antd-mobile';
const Video = () => { 

    return (
        <div>
            <NavBar
              mode="light"
              icon={<Icon type="left" />}
              onLeftClick={()=>{props.history.push('/home')}}
              rightContent={[
                <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={()=>{props.history.push('/search')}} />
              ]}
            >菜谱视频大全</NavBar>
        </div>
    )
}
export default Video