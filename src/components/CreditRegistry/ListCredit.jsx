import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import MutationRegistry from "./MutationRegistry";
import {
  CarryOutOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import vkuApi from "../Api/vkuApi";

const ListCredit = ({ data, profile, onCreate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classId, setClassId] = useState();
  const [hPRegistryList, setHPRegistryList] = useState([]);

  useEffect(() => {
    const getAllHPRegistry = async () => {
      let response = await vkuApi.getAllHPRegistry({});

      if (response) {
        setHPRegistryList(response);
      }
    };

    getAllHPRegistry();
  }, []);

  const handleShowModal = (id) => {
    if (id) {
      setClassId(id);
      setIsModalOpen(true);
    }
  };

  const onCreateRegistry = async (data, callback) => {
    if (data) {
      const newData = {
        ...data,
        ma_sv: profile?.ma_sv,
      };
      onCreate(newData, callback);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      align: "left",
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
          <Button
            type="primary"
            className="btn"
            icon={<CarryOutOutlined />}
            onClick={() => handleShowModal(record?.ma_lop_tc)}
          >
            Chọn nhóm
          </Button>
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
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title level={4} style={useStyles.titleStyles}>
        Đăng ký tín chỉ
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

      <MutationRegistry
        isOpen={isModalOpen}
        onOk={onCreateRegistry}
        onCancel={handleCancel}
        classId={classId}
        userId={profile?.ma_sv}
        data={hPRegistryList}
      />
    </Space>
  );
};

export default ListCredit;
