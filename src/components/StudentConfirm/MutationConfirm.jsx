import { Button, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";

const MutationConfirm = ({ isOpen, onOk, onCancel, classId, group, data }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data?.length > 0 && classId) {
      const tmp = data?.filter(
        (item) => item?.ma_lop_tc === classId && item?.nhom === group
      );

      setFilteredData(tmp);
    }
  }, [classId, data, group]);

  const columns = [
    {
      title: "STT",
      dataIndex: "order",
      align: "center",
      width: 70,
      render: (_, record, i) => i + 1,
    },
    {
      title: "MSV",
      dataIndex: "ma_sv",
      width: 120,
      align: "center",
    },
    {
      title: "Tên sinh viên",
      dataIndex: "ho_ten",
      align: "center",
    },
    {
      title: "Ngày đăng ký",
      dataIndex: "ngay_dang_ky",
      align: "center",
      width: 250,
    },
  ];

  return (
    <Modal
      title="Danh sách sinh viên đăng ký"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      maskClosable={false}
      width={1000}
      footer={[
        <Button type="primary" className="btn" key="back" onClick={onCancel}>
          Đóng
        </Button>,
      ]}
    >
      <Table
        rowKey="ma_sv"
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        scroll={{
          x: 900,
        }}
      />
    </Modal>
  );
};

export default MutationConfirm;
