import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import vkuApi from "../../components/Api/vkuApi";
import { useCookies } from "react-cookie";
import Title from "antd/es/typography/Title";
import { FormOutlined } from "@ant-design/icons";

function ScoreManagement() {
  const [cookies] = useCookies();
  const { profile } = cookies;

  const [data, setData] = useState();

  useEffect(() => {
    const getTkb = async () => {
      const params = {
        ma_gv: profile?.ma_gv,
      };
      let response = await vkuApi.getTkb({ params });

      if (response) {
        setData(response);
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
      title: "Tên lớp tín chỉ",
      // dataIndex: "ma_mh",
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
      width: 160,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space>
          <Link to={`nhap-diem/${record.ma_lop_tc}/${record.nhom}`}>
            <Button type="text" className="btn" icon={<FormOutlined />}>
              Nhập điểm
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
        Quản lý điểm sinh viên
      </Title>
      <Table
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

export default ScoreManagement;
