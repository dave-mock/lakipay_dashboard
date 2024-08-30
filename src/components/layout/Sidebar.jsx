import { Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import React, { useEffect, useState } from 'react'
import {  NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import styled from 'styled-components';
import { color } from '../../views/colors/ColorsRedux';
import { useSelector } from 'react-redux';





const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const keys = JSON.parse(localStorage.getItem('keyPath'));
  const [openKeys, setOpenKeys] = useState(keys?keys[keys.length - 1] :[]);
  const path = location.pathname;
  const [current, setCurrent] = useState(['dashboard']);
  const [items,setItems] = useState([])
  const mainColor = useSelector(color)


  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);

    navigate(e.key)
    setOpenKeys(e.keyPath)

    const y = JSON.parse(localStorage.getItem('keyPath'))||[];

    localStorage.setItem('keyPath', JSON.stringify([...y, e.keyPath]))

  };

  const onOpenChange = (keys) => {


    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);


    } else {

      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);

    }
  };
  useEffect(()=>{
    getItems()
  },[])
  useEffect(() => {
    const x = [...path.split('/')]
    console.log('ppppppppppppp',x)
    setCurrent(x.length>2?x[x.length-1]:'')
    const y = JSON.parse(localStorage.getItem('keyPath')) ||[]

    setOpenKeys(y?y[y.length-1]:[])



  }, [path])


 



  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  
  const getItems = async()=>{
    const items2 = [
  
      getItem('Dashboard','',<DashboardOutlined/>),
      
      (await authService.checkPermmision('stores', 'read'))&& getItem('List One','store',<DashboardOutlined/>,[
        (await authService.checkPermmision('item_brands', 'read'))&&   getItem('Option one', 'item_brands', null),
        (await authService.checkPermmision('units', 'read')) && getItem('Option two', 'units'),
        (await authService.checkPermmision('item_historys', 'read'))&&getItem('Option there', 'item_historys'),
      ]),
    
    
      (await authService.checkPermmision('appointments', 'read'))&& getItem('List Two','appointments',<DashboardOutlined/>),
      (await authService.checkPermmision('job_orders', 'read'))&& getItem('List There','job_orders',<DashboardOutlined/>),
      (await authService.checkPermmision('work_orders', 'read'))&& getItem('List Four','work_orders',<DashboardOutlined/>),


      
      (await authService.checkPermmision('sapre_part', 'read'))&& getItem('List Five','sapre_part',<DashboardOutlined/>,[
        (await authService.checkPermmision('manage_spare_parts', 'read'))&&   getItem('Manage spare parts', 'manage_spare_parts', null),
        (await authService.checkPermmision('manage_lubricans', 'read')) && getItem('manage Lubricans', 'manage_lubricans'),
      ]),

      (await authService.checkPermmision('purchases', 'read'))&& getItem('Purchase','purchases',<DashboardOutlined/>),

      (await authService.checkPermmision('reports', 'read'))&& getItem('Reports','reports',<DashboardOutlined/>,[
        (await authService.checkPermmision('av_reports', 'read'))&&   getItem(' reports one', 'av_reports', null),
        (await authService.checkPermmision('part_reports', 'read')) && getItem('reports two', 'part_reports'),
      ]),
      (await authService.checkPermmision('posts', 'read'))&& getItem('Posts','posts',<DashboardOutlined/>),
      
    
    ];
  
   setItems(items2)
  }
  
  

  
  return (
    <SidebarStyle
      width={300}
      style={{
        height: "100vh",
        borderRight:'1px solid gray',
        position: "fixed",
        display: collapsed && "none",
        backgroundColor:mainColor,
        zIndex: 110,
        

      }}
      trigger={null}
      collapsible
      collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <div
      className='flex justify-center items-center'
        style={{ width: 299, height: 180, background: mainColor }}
      >
        <NavLink to={"/home"}>
          <img src={ReactSvg}  className='w-40  text-white border-red-800' alt="MK Logo" />
         
        </NavLink>
      </div>
      <div className='sidebar__menus'>
        <Menu
          theme={'dark'}
          onClick={onClick}
          style={{
            backgroundColor: 'transparent',
          }}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={current}
          mode="inline"
          items={items}
        />
      </div>
    </SidebarStyle>
  )
}


const SidebarStyle = styled(Sider)`
  
  .sidebar__menus{
    overflow:auto;
    overflow-x:hidden;
    height: calc( 100vh - 100px);
  }
  .ant-menu-sub {
    background-color: transparent !important;
  }

  .ant-menu-item-selected{
    background-color: #19588b !important;
  }
  span{
    font-size: 16px !important;
    color: white !important;
  }
`

export default Sidebar;