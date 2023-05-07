import { Button, Divider, Dropdown, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import vkuApi from "../../Api/vkuApi";
import {
  DownOutlined,
  LogoutOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { DirectHit } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const { Text } = Typography;

const MenuRight = () => {
  const [cookies, removeCookie] = useCookies();
  const { ma_gv, ma_sv } = cookies;
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      let res = null;
      if (ma_gv) {
        res = await vkuApi.getTeacher({ params: { ma_gv } });
      } else if (ma_sv) {
        res = await vkuApi.getStudent({ params: { ma_sv } });
      }
      setUser(res);
    };

    getUser();
  }, [ma_gv, ma_sv]);

  const onClick = ({ key }) => {
    switch (key) {
      case "1":
        break;
      case "2":
        if (ma_gv) {
          removeCookie("ma_gv", { path: "/" });
        } else {
          removeCookie("ma_sv", { path: "/" });
        }
        navigate("/dang-nhap");
        break;

      default:
        break;
    }
  };

  const items = [
    {
      label: "Giấy chứng nhận",
      icon: <SafetyCertificateOutlined />,
      key: "1",
    },
    {
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      key: "2",
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        onClick,
      }}
      trigger={["click"]}
      placement="bottomRight"
      arrow
      dropdownRender={(menu) => (
        <div className="dropdown-content">
          <Space
            style={{
              width: "100%",
              padding: 8,
              justifyContent: "center",
            }}
          >
            <img src={DirectHit} alt="" width={60} />
            <Space direction="vertical">
              <Text strong>Khoa: {user?.ten_khoa}</Text>
              <Text strong>Học vị: {user?.hoc_vi}</Text>
            </Space>
          </Space>
          <Divider
            style={{
              margin: 0,
            }}
          />
          {menu}
        </div>
      )}
    >
      <Space>
        <Button type="text" className="btn">
          {user?.ho_ten}
          <DownOutlined />
        </Button>
      </Space>
    </Dropdown>
  );
};

export default MenuRight;
