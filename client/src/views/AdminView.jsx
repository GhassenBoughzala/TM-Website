import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import CoursesList from "../components/Admin/CoursesList";

const { Header, Sider, Content } = Layout;
export const AdminView = ({ ...props }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div className="mt-3">
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
            items={[
              {
                key: "1",
                icon: <StarOutlined />,
                label: "Courses",
              },
            ]}
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
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <CoursesList></CoursesList>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminView;
