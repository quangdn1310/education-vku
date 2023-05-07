import { CloseCircleOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

export const notificationLoginFailed = {
  message: (
    <Title level={5} style={{ color: "#fff" }}>
      Đăng nhập thất bại!
    </Title>
  ),
  description: "Tài khoản hoặc mật khẩu không chính xác.",
  placement: "bottomLeft",
  duration: 5,
  style: {
    backgroundColor: "#d32f2f",
    color: "#fff",
    padding: 10,
  },
  icon: <CloseCircleOutlined />,
  closeIcon: <></>,
};
