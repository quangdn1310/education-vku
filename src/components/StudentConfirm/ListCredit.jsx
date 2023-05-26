import { Button, Popconfirm, Table } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import MutationConfirm from "./MutationConfirm";
import { EyeOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const ListCredit = ({ data, studentRegistryList, onConfirm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classId, setClassId] = useState();
  const [group, setGroup] = useState();

  const [newData, setNewData] = useState([]);

  useEffect(() => {
    if (data?.length > 0) {
      const tmp = data?.map((item, i) => ({
        ...item,
        key: i.toString(),
      }));
      setNewData(tmp);
    }
  }, [data]);

  const handleShowModal = (id, group) => {
    if (id && group) {
      setClassId(id);
      setGroup(group);
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const checkConfirmed = (record) => {
    const length = studentRegistryList?.filter(
      (item) =>
        item?.ma_lop_tc === record?.ma_lop_tc && item?.nhom === record?.nhom
    ).length;

    if (length > 0) {
      return true;
    }

    return false;
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "order",
      align: "center",
      width: 70,
      render: (_, record, i) => i + 1,
    },
    {
      title: "Mã học phần",
      dataIndex: "ma_lop_tc",
      align: "center",
      width: 140,
    },
    {
      title: "Tên lớp học phần",
      // dataIndex: "ten_mh",
      render: (_, record) => `${record?.ten_mh} (${record?.nhom})`,
    },
    {
      title: "Số tín chỉ",
      dataIndex: "so_tin_chi",
      align: "center",
      width: 120,
    },

    {
      title: "Đợi đăng kí",
      align: "center",
      width: 120,
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => handleShowModal(record?.ma_lop_tc, record?.nhom)}
        >
          &nbsp;
          {
            studentRegistryList?.filter(
              (item) =>
                item?.ma_lop_tc === record?.ma_lop_tc &&
                item?.nhom === record?.nhom
            ).length
          }
        </Button>
      ),
    },

    {
      title: "Thực hiện",
      width: 200,
      fixed: "right",
      align: "center",
      render: (_, record) =>
        !checkConfirmed(record) ? (
          <Button type="text" className="btn" disabled>
            Đã xác nhận
          </Button>
        ) : (
          <Popconfirm
            title="Xác nhận"
            description="Bạn có muốn xác nhận lớp học này?"
            onConfirm={() => onConfirm(record?.ma_lop_tc, record?.nhom)}
            okText="Có"
            cancelText="Không"
            placement="topRight"
          >
            <Button type="primary" className="btn">
              Xác nhận
            </Button>
          </Popconfirm>
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
        Danh sách các lớp học phần
      </Title>
      <Table columns={columns} dataSource={newData} scroll={{ x: 1000 }} />
      <MutationConfirm
        isOpen={isModalOpen}
        onCancel={handleCancel}
        classId={classId}
        group={group}
        onOk={() => setIsModalOpen(false)}
        data={studentRegistryList}
        // userId={profile?.ma_sv}
      />
    </>
  );
};

export default ListCredit;
