import { Button, Card, Space, Table } from "antd";
import React from "react";

const ProjectGuide = () => {
  const columns = [
    {
      title: "STT",
      width: 70,
      align: "center",
      render: (_, record, i) => i + 1,
    },
    {
      title: "Đồ án cơ sở/ Đề án/ Khóa luận",
      dataIndex: "project",
      width: 250,
      align: "center",
    },
    {
      title: "Lịch hướng dẫn",
      dataIndex: "schedule",
      width: 300,
      align: "center",
    },
    {
      title: "Quản lý",
      dataIndex: "operation",
      render: (_, record) => (
        <Space>
          <Button type="text">Danh sách sinh viên</Button>
          <Button type="text">Gửi email</Button>
          <Button type="text">Nhập điểm hướng dẫn</Button>
        </Space>
      ),
    },
  ];
  return (
    <div className="page-content">
      <Card title={`Danh sách hướng dẫn lớp đồ án của`}>
        <Table columns={columns} scroll={{ x: 1200 }} />
      </Card>
    </div>
  );
};

export default ProjectGuide;
