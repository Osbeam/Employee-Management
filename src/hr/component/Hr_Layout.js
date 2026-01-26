import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ScheduleOutlined,
  AppstoreOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  ProjectOutlined,
  SolutionOutlined,
  LogoutOutlined,
  HarmonyOSOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import logo from "../Images/ShawniksLogo.png";
import { Layout, Menu, Button, Avatar, message, theme } from "antd";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import axios from "axios";
import userimg from "../Images/user-profile.jpg";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userName, setUserName] = useState("");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const { userId } = useParams(); // Extract userId from route parameters

  // Get the authentication token from localStorage
  const authToken = localStorage.getItem("jwtoken");

  useEffect(() => {
    if (!authToken) {
      console.error("No token found");
      setUserName("Guest");
      return;
    }

    if (!userId) {
      console.error("No user ID provided in the route parameters");
      setUserName("Guest");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          "http://77.37.45.224:8000/api/user/getAllEmployee",
          {
            headers: {
              Authorization: `Bearer ${authToken}`, // Pass the token in the Authorization header
            },
          }
        );
        console.log("Employee Data Response:", response.data);

        const employees = response.data?.data?.employees || [];
        const user = employees.find((emp) => emp._id === userId);

        if (user) {
          setUserName(`${user.FirstName} ${user.LastName}`);
        } else {
          console.warn("User not found in employee list");
          setUserName("Guest");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUserName("Guest");
      }
    };

    fetchUserDetails();
  }, [userId, authToken]); // Run when userId or authToken changes

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("jwtoken");
    message.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "white" }}
      >
        <div
          className="demo-logo-vertical"
          style={{ backgroundColor: "white" }}
        >
          <h2 className="text-white fs-4 text-center py-3 mb-0 ">
            <span className="sm-logo">
              <img
                src={logo}
                alt="App Logo"
                style={{ width: 60, marginLeft: 15, marginTop: 20 }}
              />
            </span>
            <span className="lg-logo">
              <img
                src={logo}
                alt="App Logo"
                style={{ width: 100, marginLeft: 58, marginTop: 11 }}
              />
            </span>
          </h2>
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[]}
          onClick={({ key }) => {
            if (key === "logout") {
              handleLogout();
            } else {
              navigate(key);
            }
          }}
        >
          <Menu.Item key="" icon={<AppstoreOutlined />} label="Dashboard">
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="new-employee"
            icon={<UsergroupAddOutlined />}
            label="Emp Registration"
          >
            New Employee
          </Menu.Item>
          <Menu.Item
            key="employee-list"
            icon={<TeamOutlined />}
            label="Emp list"
          >
            Employee list
          </Menu.Item>
          <Menu.Item
            key="attendence"
            icon={<ProjectOutlined />}
            label="attendence"
          >
            Attendence
          </Menu.Item>
          <Menu.Item
            key="leave-management"
            icon={<ScheduleOutlined />}
            label="Leave management"
          >
            Leave Management
          </Menu.Item>
          <Menu.Item
            key="hr-docs"
            icon={<SolutionOutlined />}
            label="Hr document"
          >
            Hr Documents
          </Menu.Item>
          <Menu.Item
            key="permissionbyhr"
            icon={<ScheduleOutlined />}
            label="Permission"
          >
            Permission
          </Menu.Item>
          <Menu.SubMenu
            key="leader"
            icon={<HarmonyOSOutlined />}
            title="Leader"
          >
            <Menu.Item
              key="newreg"
              icon={<UsergroupAddOutlined />}
              label="New Registration"
            >
              New Registration
            </Menu.Item>
            <Menu.Item
              key="leaderattendence"
              icon={<ProjectOutlined />}
              label="Attendence"
            >
              Attendence
            </Menu.Item>
            <Menu.Item
              key="empreport"
              icon={<AuditOutlined />}
              label="Employee Report"
            >
              Employee Report
            </Menu.Item>
          </Menu.SubMenu>

          <Menu.Item key="logout" icon={<LogoutOutlined />} label="Logout">
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              border: "none",
              boxShadow: "none",
              outline: "none",
            }}
          />
          {/* User Profile Section */}
          <div
            style={{
              position: "absolute",
              right: 20,
              top: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar src={userimg} size={40} />
            <span style={{ marginLeft: 10, color: "#000" }}>{userName}</span>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: "10px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

//Code Before Adding Profile

// import React, { useState } from 'react';
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   ScheduleOutlined,
//   RobotOutlined,
//   AppstoreOutlined,
//   PhoneOutlined,
//   UsergroupAddOutlined,
//   TeamOutlined,
//   BookOutlined,
//   SolutionOutlined,
//   ProjectOutlined,
//   SoundOutlined,
//   LogoutOutlined,
//   HarmonyOSOutlined,
//   AuditOutlined
// } from '@ant-design/icons';
// import logo from '../Images/ShawniksLogo.png';
// import { Layout, Menu, Button, theme } from 'antd';
// import { useNavigate, Outlet } from "react-router-dom";
// import { message } from "antd";
// import userimg from '../Images/user-profile.jpg'

// const { Header, Sider, Content } = Layout;

// const MainLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("jwtoken");
//     message.success("Logged out successfully!");
//     navigate("/");
//   };

//   return (
//     <Layout>
//       <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: 'white' }}>
//         <div className="demo-logo-vertical" style={{ backgroundColor: 'white' }}>
//           <h2 className='text-white fs-4 text-center py-3 mb-0 '>
//             <span className='sm-logo'><img src={logo} alt="App Logo" style={{ width: 60, marginLeft: 15, marginTop: 20 }} /></span>
//             <span className='lg-logo'><img src={logo} alt="App Logo" style={{ width: 100, marginLeft: 58, marginTop: 11 }} /></span>
//           </h2>
//         </div>

//         <Menu
//           theme="light"
//           mode="inline"
//           defaultSelectedKeys={[]}
//           onClick={({ key }) => {
//             if (key === 'logout') {
//               handleLogout();
//             } else {
//               navigate(key);
//             }
//           }}
//         >

//           <Menu.Item key="" icon={<AppstoreOutlined />} label="Dashboard">
//             Dashboard
//           </Menu.Item>
//           <Menu.Item key="new-employee" icon={<UsergroupAddOutlined />} label="Emp Registration">
//             New Employee
//           </Menu.Item>
//           <Menu.Item key="employee-list" icon={<TeamOutlined />} label="Emp list">
//             Employee list
//           </Menu.Item>
//           <Menu.Item key="attendence" icon={<ProjectOutlined />} label="attendence">
//             Attendence
//           </Menu.Item>
//           <Menu.Item key="leave-management" icon={<ScheduleOutlined />} label="Leave management">
//             Leave Management
//           </Menu.Item>
//           <Menu.Item key="hr-docs" icon={<SolutionOutlined />} label="Hr document">
//             Hr Documents
//           </Menu.Item>
//           <Menu.SubMenu key="leader" icon={<HarmonyOSOutlined />} title="Leader">
//             <Menu.Item key="newreg" icon={<UsergroupAddOutlined />} label='New Registration'>
//               New Registration
//             </Menu.Item>
//             <Menu.Item key="leaderattendence" icon={<ProjectOutlined />} label="Attendence">
//               Attendence
//             </Menu.Item>
//             <Menu.Item key="empreport" icon={<AuditOutlined />} label="Employee Report">
//               Employee Report
//             </Menu.Item>
//           </Menu.SubMenu>
//           <Menu.Item key="logout" icon={<LogoutOutlined />} label="Logout">
//             Logout
//           </Menu.Item>
//         </Menu>
//       </Sider>
//       <Layout>
//         <Header style={{ padding: 0, background: colorBgContainer }}>
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: '16px',
//               width: 64,
//               height: 64,
//               border: 'none',
//               boxShadow: 'none',
//               outline: 'none',
//             }}
//           />
//         </Header>
//         <Content
//           style={{
//             margin: '24px 16px',
//             padding: 24,
//             minHeight: 280,
//             background: colorBgContainer,
//             borderRadius: '10px',
//           }}
//         >
//           <Outlet />
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default MainLayout;
