import { Button, Modal, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import vkuApi from "../Api/vkuApi";

const MutationRegistry = ({
  isOpen,
  onOk,
  onCancel,
  classId,
  userId,
  data,
}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [subjectRegistered, setSubjectRegistered] = useState();
  const [selected, setSelected] = useState();
  const [studentRegistryList, setStudentRegistryList] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const getAllStudentRegistry = async () => {
      let response = await vkuApi.getAllStudentRegistry({});

      if (response) {
        setStudentRegistryList(response);
      }
    };

    getAllStudentRegistry();
  }, []);

  useEffect(() => {
    if (data?.length > 0 && classId) {
      const tmp = data?.filter((item) => item?.ma_lop_tc === classId);

      setFilteredData(tmp);
    }
  }, [classId, data]);

  const handleSelected = (id, nhom) => {
    const newData = {
      ma_lop_tc: classId,
      nhom,
      tkb_id: id,
      nam_hoc: 10,
      trang_thai: 2,
    };

    setSelected(nhom);
    setSubjectRegistered(newData);
  };

  const handleCancel = () => {
    setSubjectRegistered();
    setSelected();
    onCancel();
  };

  const handleOk = () => {
    if (subjectRegistered) {
      onOk(subjectRegistered, handleCancel);
    } else {
      onCancel();
    }
  };

  useEffect(() => {
    if (studentRegistryList?.length > 0) {
      const tmp = studentRegistryList.find(
        (item) =>
          item.ma_sv === userId &&
          item.ma_lop_tc === classId &&
          item.trang_thai !== "0"
      );

      if (tmp) {
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
    }
  }, [studentRegistryList, userId, classId]);

  const isRegisteredGroup = (item) => {
    if (studentRegistryList?.length > 0) {
      const tmp = studentRegistryList.find(
        (a) =>
          a?.nhom === item?.nhom &&
          a.ma_sv === userId &&
          a.ma_lop_tc === item?.ma_lop_tc &&
          a?.trang_thai !== "0"
      );

      if (tmp) {
        return true;
      }

      return false;
    }
  };

  const columns = [
    {
      title: "Mã học phần",
      dataIndex: "ma_lop_tc",
      width: 120,
      align: "center",
    },
    {
      title: "Tên môn học/ học phần",
      align: "left",
      render: (_, record) => `${record?.ten_mh} (${record?.nhom})`,
    },

    {
      title: "Giảng viên",
      dataIndex: "ho_ten",
      align: "center",
      width: 150,
    },

    {
      title: "Tuần",
      dataIndex: "tuan",
      align: "center",
      width: 100,
    },
    {
      title: "Thứ",
      dataIndex: "thu",
      align: "center",
      width: 100,
    },
    {
      title: "Tiết",
      dataIndex: "tiet_hoc",
      align: "center",
      width: 100,
    },
    {
      title: "Thực hiện",
      dataIndex: "operation",
      width: 180,
      fixed: "right",
      align: "center",
      render: (_, record) => (
        <Space>
          {isRegisteredGroup(record) && (
            <Button type="text" className="btn" disabled>
              Đã đăng kí
            </Button>
          )}
          {!isRegisteredGroup(record) &&
            (selected === record?.nhom ? (
              <Button
                type="primary"
                className="btn btn-success"
                onClick={() => setSelected(undefined)}
              >
                Đã chọn
              </Button>
            ) : (
              <Button
                type="primary"
                className="btn"
                onClick={() => handleSelected(record?.id, +record?.nhom)}
                disabled={isRegistered}
              >
                Đăng kí
              </Button>
            ))}
        </Space>
      ),
    },
  ];

  return (
    <Modal
      title="Đăng kí nhóm"
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      width={1100}
      footer={[
        <Button key="back" type="text" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Đồng ý
        </Button>,
      ]}
    >
      <Table
        rowKey="nhom"
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

export default MutationRegistry;
