import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ScheduleOutlined,
  RobotOutlined,
  AppstoreOutlined,
  PhoneOutlined,
  UsergroupAddOutlined ,
  TeamOutlined,
  BookOutlined,
  SolutionOutlined,
  ProjectOutlined,
  SoundOutlined ,
} from '@ant-design/icons';
import logo from '../Images/ShawniksLogo.png'
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: 'white' }}>
        <div className="demo-logo-vertical" style={{ backgroundColor: 'white' }}>
          <h2 className='text-white fs-4 text-center py-3 mb-0 '>
            <span className='sm-logo'><img src={logo} alt="App Logo" style={{ width: 60, marginLeft: 15, marginTop: 20 }} /></span>
            <span className='lg-logo'><img src={logo} alt="App Logo" style={{ width: 100, marginLeft: 58, marginTop: 11 }} /></span>
          </h2>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[]}
          onClick={({ key }) => {
            if (key === 'signout') {
              // Handle signout action
            } else {
              navigate(key);
            }
          }}
        >
          <Menu.Item key="" icon={<AppstoreOutlined />} label="Dashboard">
            Dashboard
          </Menu.Item>
         
          <Menu.Item key="channelpartner" icon={<SoundOutlined />} label="Channel Partner">
            Channel partner
          </Menu.Item>
          <Menu.Item key="dataoperator" icon={<PhoneOutlined />} label="Data Operator">
            Data Operator
          </Menu.Item>
          <Menu.Item key="employee" icon={<RobotOutlined />} label="employee">
            Employee
          </Menu.Item>
          <Menu.Item key="leads" icon={<SolutionOutlined />} label="Leads">
            Leads
          </Menu.Item>
          {/* <Menu.SubMenu key="Hr" icon={<BookOutlined />} title="Hr">
            <Menu.Item key="new-employee" icon={<UsergroupAddOutlined />} label="Emp Registration">
              New Employee
            </Menu.Item>
            <Menu.Item key="employee-list" icon={<TeamOutlined />} label="Emp list">
              Employee list
            </Menu.Item>
            <Menu.Item key="attendence" icon={<ProjectOutlined />} label="attendence">
              Attendence
            </Menu.Item>
            <Menu.Item key="leave-management" icon={<ScheduleOutlined />} label="Leave management">
              Leave Management
            </Menu.Item>
            <Menu.Item key="hr-docs" icon={<SolutionOutlined />} label="Hr document">
              Hr Documents
            </Menu.Item>
          </Menu.SubMenu> */}
        </Menu>
      </Sider>
      <Layout>
        <Header  style={{padding: 0,background: colorBgContainer}}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              border: 'none', 
              boxShadow: 'none', 
              outline: 'none',
            }}

          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius:'10px',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;