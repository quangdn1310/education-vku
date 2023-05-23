import { Card, Image, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import vkuApi from "../../../components/Api/vkuApi";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ProjectClass = () => {
  const [cookies] = useCookies();
  const { profile } = cookies;

  const [data, setData] = useState();

  useEffect(() => {
    const getTkbDoAn = async () => {
      const params = {
        ma_sv: profile?.ma_sv,
      };
      let response = await vkuApi.getTkbDoAnSv({ params });

      if (response) {
        setData(response);
      }
    };

    getTkbDoAn();
  }, [profile]);

  const columns = [
    {
      title: "STT",
      width: 70,
      align: "center",
      render: (_, record, i) => i + 1,
    },
    {
      title: "Đồ án cơ sở/ Đề án/ Khóa luận",
      width: 250,
      align: "center",
      render: (_, record) => `${record?.ten_mh} (${record?.nhom})`,
    },
    {
      title: "Liên lạc GVHD",
      width: 350,
      align: "center",
      render: (_, record) => (
        <Space direction="vertical" align="start">
          <Space align="start">
            <Image
              width={80}
              src="https://media.istockphoto.com/id/1327592449/vi/vec-to/bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-ch%E1%BB%97-d%C3%A0nh-s%E1%BA%B5n-%E1%BA%A3nh-%C4%91%E1%BA%A1i-di%E1%BB%87n-m%E1%BA%B7c-%C4%91%E1%BB%8Bnh-%E1%BA%A3nh-%C4%91%E1%BA%A1i-di%E1%BB%87n-m%C3%A0u-x%C3%A1m-doanh-nh%C3%A2n.jpg?s=170667a&w=0&k=20&c=vaxhXOphJPfMcZJQjr8ox3_tnDBFjMiQEbXgBqbjHdg="
            />
            <Space direction="vertical" align="start" size={2}>
              <Text>{record?.ho_ten}</Text>
              <Text>
                <PhoneOutlined />
                &nbsp;
                {record?.sdt}
              </Text>
              <Text>
                <MailOutlined />
                &nbsp;
                {record?.email}
              </Text>
            </Space>
          </Space>
          <Text>
            Thời gian: Thứ {record?.thu} ({record?.tiet_hoc})
          </Text>
          <Text>Phòng: {record?.phong_hoc}</Text>
        </Space>
      ),
    },
    {
      title: "Nộp đề cương/ Kết quẩ",
      width: 300,
      align: "center",
      render: (_, record) => "Đã nộp",
    },
    {
      title: "Các mốc/ Trạng thái",
      dataIndex: "operation",
      render: (_, record) => "Cho phép",
    },
  ];
  return (
    <div className="page-content">
      <Card title={`Danh sách lớp đồ án/ đề án`}>
        <Table columns={columns} dataSource={data} scroll={{ x: 1200 }} />
      </Card>
    </div>
  );
};

export default ProjectClass;
