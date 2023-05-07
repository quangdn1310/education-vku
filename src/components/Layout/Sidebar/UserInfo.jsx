import { Space, Typography } from "antd";
import { checkSessionOfTheDay } from "../../common";

const { Text } = Typography;

const UserInfo = ({ userInfo, isShow }) => {
  const useStyles = {
    avatarStyles: {
      width: 50,
      height: 50,
      borderRadius: "50%",
    },
  };

  return (
    <Space style={{ width: "100%", justifyContent: "center" }} align="center">
      <img
        src="https://i.pravatar.cc/150"
        alt="avatar"
        style={useStyles.avatarStyles}
      />
      {isShow && (
        <Space direction="vertical" style={{ padding: 4 }}>
          <Text className="text-md">Hi, {userInfo?.ho_ten}</Text>
          <Text className="text-md">{checkSessionOfTheDay(new Date())}</Text>
        </Space>
      )}
    </Space>
  );
};

export default UserInfo;
