import { Button, Space, Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "STT",
    dataIndex: "order",
    align: "center",
  },
  {
    title: "Tên lớp tín chỉ",
    dataIndex: "creditsName",
    align: "center",
  },
  {
    title: "Giảng viên",
    dataIndex: "instructor",
    align: "center",
  },
  {
    title: "Tuần",
    dataIndex: "week",
    align: "center",
  },
  {
    title: "Phòng",
    dataIndex: "room",
    align: "center",
  },
  {
    title: "Thứ",
    dataIndex: "day",
    align: "center",
  },
  {
    title: "Tiết",
    dataIndex: "lesson",
    align: "center",
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

const data = Array.from({ length: 20 }).map((_, index) => ({
  key: index,
  order: index + 1,
  creditsName: "Chuyên đề 4 " + index,
  instructor: "Nguyễn Văn A",
  week: "45",
  room: "A. 405",
  day: "Tư",
  lesson: "6-8",
}));

function ScoreManagement() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="page-content">
      <Table
        rowSelection={rowSelection}
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

export default ScoreManagement;
