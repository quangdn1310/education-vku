import { Space, Typography } from "antd";

const { Text } = Typography;

const UserInfo = () => {
  const useStyles = {
    avatarStyles: {
      width: 50,
      height: 50,
      borderRadius: "50%",
    },
  };

  return (
    <div className="user-info">
      <Space style={{ paddingLeft: 24 }} align="center">
        <img
          src="https://i.pravatar.cc/150"
          alt="avatar"
          style={useStyles.avatarStyles}
        />
        <Space direction="vertical" style={{ padding: 4 }}>
          <Text className="text-md">Hi, Nguyễn Trung Hiếu</Text>
          <Text className="text-md">Chào buổi sáng!</Text>
        </Space>
      </Space>
    </div>
  );
};

export default UserInfo;
