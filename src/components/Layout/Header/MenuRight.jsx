import { Button, Divider, Dropdown, Space, Typography } from "antd";
import React from "react";
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
  const { profile } = cookies;
  const navigate = useNavigate();

  const onClick = ({ key }) => {
    switch (key) {
      case "1":
        break;
      case "2":
        removeCookie("profile", { path: "/" });
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
            {profile?.ma_gv && (
              <Space direction="vertical">
                <Text strong>Khoa: {profile?.ten_khoa}</Text>
                <Text strong>Học vị: {profile?.hoc_vi}</Text>
              </Space>
            )}
            {profile?.ma_sv && (
              <Space direction="vertical">
                <Text strong>Mã sinh viên: {profile?.ma_sv}</Text>
                <Text strong>Lớp: {profile?.ten_lop}</Text>
              </Space>
            )}
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
          {profile?.ho_ten}
          <DownOutlined />
        </Button>
      </Space>
    </Dropdown>
  );
};

export default MenuRight;
