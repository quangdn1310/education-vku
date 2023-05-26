import React from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table } from "antd";
import Title from "antd/es/typography/Title";

const ListRegistered = ({ data, onDelete }) => {
  const columns = [
    {
      title: "STT",
      align: "center",
      width: 70,
      render: (_, record, i) => i + 1,
    },
    {
      title: "Mã học phần",
      dataIndex: "ma_lop_tc",
      width: 120,
      align: "center",
    },
    {
      title: "Tên môn học/ học phần",
      dataIndex: "ten_mh",
      align: "center",
    },

    {
      title: "Số tín chỉ",
      dataIndex: "so_tin_chi",
      align: "center",
      width: 120,
    },

    {
      title: "Bắt buộc",
      align: "center",
      width: 120,
      render: (_, record) =>
        record?.bat_buoc === 1 ? <CheckOutlined /> : <CloseOutlined />,
    },

    {
      title: "Thực hiện",
      dataIndex: "operation",
      width: 200,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Hủy đăng ký"
            description="Bạn có muốn hủy đăng ký khóa học này?"
            onConfirm={() => onDelete(record?.id)}
            okText="Có"
            cancelText="Không"
            placement="topRight"
          >
            <Button type="primary" className="btn btn-danger">
              Hủy đăng kí
            </Button>
          </Popconfirm>
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
    <>
      <Title level={4} style={useStyles.titleStyles}>
        Môn học đã đăng ký
      </Title>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="ma_lop_tc"
        pagination={false}
        scroll={{
          x: 1000,
        }}
      />
    </>
  );
};

export default ListRegistered;
