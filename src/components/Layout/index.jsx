import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Space, theme } from "antd";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { MENU_ITEMS } from "../../utils/constants";
import { Footer } from "antd/es/layout/layout";
const { Header, Content } = Layout;
const MainLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sidebar collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={MENU_ITEMS}
        />
      </Sidebar>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            paddingRight: 16,
            background: colorBgContainer,
          }}
        >
          <div className="flex-bw">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}

            <Space>
              <Button type="text" className="btn">
                Hi, Dang Quang!
              </Button>
            </Space>
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
