/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  StarOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import CoursesList from "../components/Admin/CoursesList";
import { UsersList } from "../components/Admin/UsersList";

const { Header, Sider, Content } = Layout;
export const AdminView = ({ ...props }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: "1",
      icon: <StarOutlined />,
      label: "Courses",
    },
    {
      key: "2",
      icon: <UsergroupAddOutlined />,
      label: "Users",
    },
  ];



  return (
    <div className="mt-2">
      <Layout className="bg-white">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="bg-white"
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
            onClick={({ key }) => {
              if (key === "1") {
                setShowCourses(true);
              } else setShowCourses(false);

              if (key === "2") {
                setShowUsers(true);
              } else setShowUsers(false);
            }}
          />
        </Sider>
        <Layout className=" bg-white">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              padding: 12,
              minHeight: 280,
            }}
          >
            <CoursesList />
            {showUsers && <UsersList />}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminView;
