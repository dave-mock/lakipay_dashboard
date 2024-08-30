import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid'
import { Avatar, Button, Dropdown, Layout, Space, message,Typography, theme } from 'antd'
import React from 'react'
import styled from 'styled-components'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ArrowLeftOutlined,
  DownOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '../../views/colors/ColorsRedux';
const { Header } = Layout;






const LayoutHeader = ({ collapsed, collapsed2, setCollapsed, setOpen, open }) => {
  const navigate = useNavigate()
  const mainColor = useSelector(color)

  const onClick = ({ key }) => {
    navigate(key)
  };

  const onClickProfile = ({ key }) => {
    // if(key=='logout'){
    //   authService.logout() 
    //   dispatch(logout())
    // }
   
  };


  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const items = [
    {
      key: 'users',
      label: 'User',
    },
    {
      key: 'access_controls',
      label: 'Access Controls',
    },
    {
      key: 'groups',
      label: 'Group',
    },
    {
      key: 'colors',
      label: 'colors',
    },
   
   
   
    {
      key: 'settings',
      label: 'Setting',
    },
  ];
  
  

  const profiles = [
    {
      key: 'logout',
      label: 'Logout',
    },
  ];

  
  return (
    <Header

      style={{
        padding: 0,
        background:mainColor,
        position: "sticky",
        top: 0,
        zIndex: 100
      }}
    >
      <HeaderStyle>
        <div className='header__left'>
          
          <Button
            type="text"
            icon={collapsed2 ? (collapsed ? <MenuUnfoldOutlined style={{ color: 'white' }} /> : <MenuFoldOutlined style={{ color: 'white' }} />) : ""}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              display: collapsed2 ? "" : "none"
            }}
          />

          <Button
            type="text"
            icon={<ArrowLeftOutlined style={{ color: 'white' }} />}
            onClick={() => {
              navigate(-1)
              const y = JSON.parse(localStorage.getItem('keyPath'))
              y.pop()
              localStorage.setItem('keyPath', JSON.stringify(y))

            }}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </div>


        <div className='header_right_con'>

       {true? <Dropdown
            onOpenChange={()=>console.log("onOpenChange")}
              menu={{
                items,
                onClick,
                selectable: true,
                defaultSelectedKeys: ['3'],
              }}
              trigger={['click']}
            >
          <span className='header__right'>
            <WrenchScrewdriverIcon className="h-5 w-5 text-white" />
            
              
                <Space>
                <p className='text-white'>System Amdin</p> 
                  <DownOutlined />
                </Space>
            
            {/* */}
          </span>
          </Dropdown>:""}

          <Dropdown
            onOpenChange={()=>console.log("onOpenChange")}
            menu={{
              items:profiles,
              onClick: (value) => onClickProfile(value)
          }}
              trigger={['click']}
            >
          <span className='header__right'>
            
            <Avatar className=' bg-white' size="45" icon={<UserOutlined className='text-black' />} />
            <p className='text-white'>{"true"}</p>
          </span>
          </Dropdown>:
        </div>

      </HeaderStyle>
    </Header>
  )
}



const HeaderStyle = styled.div`
display: flex;
align-items: center;
justify-content: space-between;

.header_right_con{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
  gap: 20px;
  /* color: #2b2b2b; */
}
.header__right{
  display: flex;
  align-items: center;
  gap:10px;
  cursor: pointer;
}

`

export default LayoutHeader;