import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import vkuApi from "../../../components/Api/vkuApi";
import Title from "antd/es/typography/Title";

function Schedule() {
  const [cookies] = useCookies();
  const { profile } = cookies;

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTkb = async () => {
      setIsLoading(true);
      try {
        const params = {
          ma_sv: profile?.ma_sv,
        };
        let response = await vkuApi.getTkbSinhVien({ params });

        if (response) {
          setData(response);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("error::", error);
      }
    };

    getTkb();
  }, [profile]);

  const columns = [
    {
      title: "STT",
      dataIndex: "order",
      align: "center",
      width: 70,
      render: (_, record, i) => i + 1,
    },
    {
      title: "Môn học",
      dataIndex: "ma_mh",
      render: (_, record) => `${record?.ten_mh} (${record?.nhom})`,
    },
    {
      title: "Số tín chỉ",
      dataIndex: "so_tin_chi",
      align: "center",
      width: 120,
    },
    {
      title: "Tuần",
      dataIndex: "tuan",
      align: "center",
      width: 120,
    },
    {
      title: "Phòng",
      dataIndex: "phong_hoc",
      align: "center",
      width: 120,
    },
    {
      title: "Thứ",
      dataIndex: "thu",
      align: "center",
      width: 120,
    },
    {
      title: "Tiết",
      dataIndex: "tiet_hoc",
      align: "center",
      width: 120,
    },

    {
      title: "Quản lý",
      dataIndex: "management",
      width: 200,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space>
          <Link to={``}>
            <Button type="primary" className="btn">
              Xem lịch trình
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

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
        Thời khóa biểu
      </Title>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: 50,
          showSizeChanger: true,
          pageSizeOptions: [50, 100, 150],
        }}
        scroll={{
          x: 1000,
        }}
      />
    </div>
  );
}

export default Schedule;
