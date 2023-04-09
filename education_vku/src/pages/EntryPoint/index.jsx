import { Button, Input, Space, Table, Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const { Text } = Typography;

const columns = [
  {
    title: "STT",
    dataIndex: "order",
    align: "center",
    width: 70,
  },
  {
    title: "Mã sinh viên",
    dataIndex: "ma_sv",
    align: "center",
    width: 150,
  },
  {
    title: "Tên sinh viên",
    dataIndex: "ten_sv",
    align: "center",
  },
  {
    title: "Chuyên cần",
    dataIndex: "diem_cc",
    align: "center",
    width: 90,
    render: (_, record) => <Input />,
  },
  {
    title: "Bài tập",
    dataIndex: "diem_bt",
    width: 90,
    align: "center",
    render: (_, record) => <Input />,
  },
  {
    title: "Giữa kỳ",
    dataIndex: "diem_gk",
    align: "center",
    width: 90,
    render: (_, record) => <Input />,
  },
  {
    title: "Cuối kỳ",
    dataIndex: "diem_ck",
    align: "center",
    width: 90,
    render: (_, record) => <Input />,
  },
  {
    title: "Điểm chữ",
    align: "center",
    width: 90,
    render: (_, record) => (
      <Text>
        {record.diem_cc * 0.1 +
          record.diem_bt * 0.2 +
          record.diem_gk * 0.3 +
          record.diem_ck * 0.4}
      </Text>
    ),
  },
  {
    title: "Điểm số",
    align: "center",
    width: 90,
    render: (_, record) => <Text></Text>,
  },

  {
    title: "Quản lý",
    dataIndex: "management",
    width: 120,
    align: "center",
    render: (_, i) => (
      <Space>
        <Button type="text" className="btn">
          Gửi email
        </Button>
        <Link to={`/score_management/entry_point`}>
          <Button type="text" className="btn">
            Nhập điểm
          </Button>
        </Link>
      </Space>
    ),
  },
];

const data = Array.from({ length: 2 }).map((_, index) => ({
  key: index,
  order: index + 1,
  ma_sv: "19it188",
  ten_sv: "Dang Ngoc Quang",
  diem_cc: 10.0,
  diem_bt: 10.0,
  diem_gk: 10.0,
  diem_ck: 10.0,
}));

function Entrypoint() {
  return (
    <div className="page-content">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: 50,
          showSizeChanger: true,
          pageSizeOptions: [50, 100, 150],
        }}
      />
    </div>
  );
}

export default Entrypoint;
