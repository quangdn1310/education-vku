import React, { useState } from "react";
import {
  CloseCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Input,
  Space,
  Typography,
  notification,
} from "antd";
import vkuApi from "../../components/Api/vkuApi";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { notificationLoginFailed } from "../../commom";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    const { email, password } = values;
    const params = {
      email,
      password,
    };
    try {
      setIsLoading(true);
      let res = await vkuApi.login({ params });

      if (res.data === "null") {
        notification.error(notificationLoginFailed);
      } else {
        if (res.ma_gv) {
          setCookie("ma_gv", res.ma_gv, { path: "/" });
        } else {
          setCookie("ma_sv", res.ma_sv, { path: "/" });
        }
        navigate("/");
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

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
          <Form autoComplete="off" onFinish={onFinish}>
            <Form.Item
              name="email"
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
              <Button
                type="primary"
                htmlType="submit"
                className="btn w-full"
                loading={isLoading}
              >
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
