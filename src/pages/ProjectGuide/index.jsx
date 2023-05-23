import { Button, Card, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import vkuApi from "../../components/Api/vkuApi";
import {
  FileSearchOutlined,
  FormOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const ProjectGuide = () => {
  const [cookies] = useCookies();
  const { profile } = cookies;

  const [data, setData] = useState();

  useEffect(() => {
    const getTkbDoAn = async () => {
      const params = {
        ma_gv: profile?.ma_gv,
      };
      let response = await vkuApi.getTkbDoAn({ params });

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
      title: "Lịch hướng dẫn",
      width: 300,
      align: "center",
      render: (_, record) =>
        `Thứ ${record?.thu}| Tiết ${record?.tiet_hoc} | ${record?.phong_hoc}`,
    },
    {
      title: "Quản lý",
      dataIndex: "operation",
      render: (_, record) => (
        <Space>
          <Button type="text" icon={<FileSearchOutlined />} className="btn">
            Danh sách sinh viên
          </Button>
          <Button type="text" icon={<MailOutlined />} className="btn">
            Gửi mail
          </Button>
          <Link to={`nhap-diem/${record.ma_lop_tc}/${record.nhom}`}>
            <Button type="text" icon={<FormOutlined />} className="btn">
              Nhập điểm
            </Button>
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <div className="page-content">
      <Card title={`Danh sách hướng dẫn lớp đồ án`}>
        <Table
          columns={columns}
          dataSource={data}
          rowKey="ma_lop_tc"
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
};

export default ProjectGuide;
