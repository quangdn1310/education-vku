import React from "react";
import ListScore from "../../../components/Student/ListScore";
import { useCookies } from "react-cookie";
import vkuApi from "../../../components/Api/vkuApi";
import { useEffect } from "react";
import { useState } from "react";
import Title from "antd/es/typography/Title";

const Score = () => {
  const [cookies] = useCookies();
  const { profile } = cookies;

  const [data, setData] = useState([]);

  useEffect(() => {
    const getScore = async () => {
      const params = {
        ma_sv: profile?.ma_sv,
      };
      let response = await vkuApi.getScore({ params });

      if (response) {
        setData(response);
      }
    };

    getScore();
  }, [profile]);

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
        Kết quả học tập
      </Title>
      <ListScore originData={data} courseId={profile?.khoa_hoc} />
    </div>
  );
};

export default Score;
