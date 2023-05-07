import React from "react";
import UserInfo from "../../components/UserInfo";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useEffect } from "react";
import vkuApi from "../../components/Api/vkuApi";
import Title from "antd/es/typography/Title";

const TeacherInfo = () => {
  const [cookies] = useCookies();
  const { ma_gv } = cookies;
  const [user, setUser] = useState();

  useEffect(() => {
    const getTeacher = async () => {
      const params = {
        ma_gv,
      };
      const response = await vkuApi.getTeacher({ params });
      if (response) {
        setUser(response);
      }
    };

    getTeacher();
  }, [ma_gv]);
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
      <UserInfo user={user} />
    </div>
  );
};

export default TeacherInfo;
