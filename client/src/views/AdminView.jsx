import React from "react";
import { Layout } from "antd";
const { Content, Sider} = Layout;

export const AdminView = ({...props}) => {
  return (
    <>
      <Content className="container-fluid">
        <Layout hasSider>
          <Sider className=" bg-info">Sider</Sider>
          <Content>Content</Content>
        </Layout>
      </Content>
    </>
  );
};

export default AdminView;
