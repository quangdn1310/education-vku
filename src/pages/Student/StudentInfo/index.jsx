import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import vkuApi from "../../../components/Api/vkuApi";
import Info from "../../../components/Student/Info";

const StudentInfo = () => {
  const [cookies] = useCookies();
  const { profile } = cookies;
  const [user, setUser] = useState();

  useEffect(() => {
    const getTeacher = async () => {
      const params = {
        ma_sv: profile?.ma_sv,
      };
      const response = await vkuApi.getStudent({ params });
      if (response) {
        setUser(response);
      }
    };

    getTeacher();
  }, [profile]);

  return (
    <div className="page-content">
      <Info user={user} />
    </div>
  );
};

export default StudentInfo;
