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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getScore = async () => {
      setIsLoading(true);
      try {
        const params = {
          ma_sv: profile?.ma_sv,
        };
        let response = await vkuApi.getScore({ params });

        if (response) {
          setData(response);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("error::", error);
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
      <ListScore
        isLoading={isLoading}
        originData={data}
        courseId={profile?.khoa_hoc}
      />
    </div>
  );
};

export default Score;
