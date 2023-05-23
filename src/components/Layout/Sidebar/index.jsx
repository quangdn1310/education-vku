import React, { useEffect, useState } from "react";

import { Layout, Menu, Space } from "antd";
import UserInfo from "./UserInfo";
import { MENU_ITEMS, STUDENT_MENU_ITEMS } from "../../../utils/constants";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const [cookies] = useCookies();
  let location = useLocation();

  const [current, setCurrent] = useState(location.pathname);

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Sider
      // trigger={null}
      // collapsible
      // collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
        <div
          style={{
            height: 32,
            margin: 16,
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5a/Logo_tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_C%C3%B4ng_ngh%E1%BB%87_th%C3%B4ng_tin_v%C3%A0_Truy%E1%BB%81n_th%C3%B4ng_Vi%E1%BB%87t_-_H%C3%A0n%2C_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%A0_N%E1%BA%B5ng.svg/1200px-Logo_tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_C%C3%B4ng_ngh%E1%BB%87_th%C3%B4ng_tin_v%C3%A0_Truy%E1%BB%81n_th%C3%B4ng_Vi%E1%BB%87t_-_H%C3%A0n%2C_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%A0_N%E1%BA%B5ng.svg.png"
            alt="vku"
            className="img-logo"
          />
        </div>

        <UserInfo isShow={!collapsed} userInfo={cookies?.profile} />

        <Menu
          onClick={handleClick}
          theme="dark"
          mode="inline"
          selectedKeys={[current]}
          items={cookies?.profile?.ma_gv ? MENU_ITEMS : STUDENT_MENU_ITEMS}
        />
      </Space>
    </Sider>
  );
};

export default Sidebar;
