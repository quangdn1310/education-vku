import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Typography } from "antd";
import React from "react";

const { Title } = Typography;

const Login = () => {
  const useStyles = {
    titleStyles: {
      textAlign: "center",
      color: "#fff",
      marginBottom: 16,
    },
    cardStyles: {
      maxWidth: 540,
      margin: "0 auto",
      backgroundColor: "rgba(255,255,255,0.2)",
      borderColor: "transparent",
    },
  };
  return (
    <div className="page-content pt-3" style={{ backgroundColor: "#001529" }}>
      <Card style={useStyles.cardStyles}>
        <Space direction="vertical" className="w-full ">
          <div
            style={{
              height: 32,
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/vi/thumb/5/5a/Logo_tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_C%C3%B4ng_ngh%E1%BB%87_th%C3%B4ng_tin_v%C3%A0_Truy%E1%BB%81n_th%C3%B4ng_Vi%E1%BB%87t_-_H%C3%A0n%2C_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%A0_N%E1%BA%B5ng.svg/1200px-Logo_tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_C%C3%B4ng_ngh%E1%BB%87_th%C3%B4ng_tin_v%C3%A0_Truy%E1%BB%81n_th%C3%B4ng_Vi%E1%BB%87t_-_H%C3%A0n%2C_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_%C4%90%C3%A0_N%E1%BA%B5ng.svg.png"
              alt="vku"
              className="img-logo"
            />
          </div>
          <Title level={5} style={useStyles.titleStyles}>
            Nhân bản - Phụng sự - Khai phóng
          </Title>
          <Form autoComplete="off">
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tài khoản!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="btn w-full">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Login;
