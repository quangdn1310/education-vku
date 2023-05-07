import React, { useEffect, useState } from "react";

import { Layout, Menu, Space } from "antd";
import UserInfo from "./UserInfo";
import { MENU_ITEMS, STUDENT_MENU_ITEMS } from "../../../utils/constants";
import vkuApi from "../../Api/vkuApi";
import { useCookies } from "react-cookie";
const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {
  const [cookies] = useCookies();
  const { ma_gv, ma_sv } = cookies;

  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      if (ma_gv) {
        const params = {
          ma_gv,
        };

        const res = await vkuApi.getTeacher({ params });
        if (res) {
          setUser(res);
        }
      } else if (ma_sv) {
        const params = {
          ma_sv,
        };

        const res = await vkuApi.getStudent({ params });
        if (res) {
          setUser(res);
        }
      }
    };

    getUser();
  }, [ma_gv, ma_sv]);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
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

        <UserInfo isShow={!collapsed} userInfo={user} />

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={ma_gv ? MENU_ITEMS : STUDENT_MENU_ITEMS}
        />
      </Space>
    </Sider>
  );
};

export default Sidebar;
