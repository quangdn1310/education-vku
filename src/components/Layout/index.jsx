import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, theme } from "antd";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Footer } from "antd/es/layout/layout";
import MenuRight from "./Header/MenuRight";

const { Header, Content } = Layout;
const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            paddingRight: 16,
            background: colorBgContainer,
          }}
        >
          <div className="flex-bw">
            <span></span>
            <MenuRight />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          VKU ©2023 EDUCATION SYSTEM MANAGEMENT
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
