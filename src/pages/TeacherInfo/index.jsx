import React from "react";
import UserInfo from "../../components/UserInfo";
import { useCookies } from "react-cookie";
import Title from "antd/es/typography/Title";

const TeacherInfo = () => {
  const [cookies] = useCookies();
  const { profile } = cookies;

  const useStyles = {
    titleStyles: {
      fontSize: 14,
      fontWeight: 500,
      textTransform: "uppercase",
    },
  };

  return (
    <div className="page-content">
      <Title level={4} style={useStyles.titleStyles}>
        Thông tin giảng viên
      </Title>
      <UserInfo user={profile} />
    </div>
  );
};

export default TeacherInfo;
