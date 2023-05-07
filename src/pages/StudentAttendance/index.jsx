import { Button, Select, Space, Table, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import vkuApi from "../../components/Api/vkuApi";

const { Title, Text } = Typography;
const StudentAttendance = () => {
  const { id, group } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      const params = {
        ma_lop_tc: id,
        nhom: group,
      };
      const res = await vkuApi.getStudentsByClassId({ params });
      if (res) {
        const newData = res.map((item) => ({
          ma_lop_tc: id,
          ...item,
        }));

        setStudents(newData);
      }
    };
    getStudents();
  }, [id, group]);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 70,
      align: "center",
      render: (_, record, i) => i + 1,
    },
    {
      title: "Mã sinh viên",
      dataIndex: "ma_sv",
      width: 140,
      align: "center",
    },

    {
      title: "Tên sinh viên",
      dataIndex: "ho_ten",
    },

    {
      title: "Điểm danh",
      width: 180,
      align: "center",
      render: (_, record) => (
        <Select
          defaultValue={"1"}
          style={{
            width: 150,
          }}
          options={[
            {
              value: "1",
              label: "Có mặt",
            },
            {
              value: "2",
              label: "Vắng phép",
            },
            {
              value: "0",
              label: "Vắng không phép",
            },
          ]}
        />
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "reason",
      width: 180,
      render: () => <TextArea rows={2} />,
    },
    {
      title: "Vắng",
      width: 80,
      align: "center",
      render: () => 0,
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
        Điểm danh hôm nay (ngày 6/5/2023)
      </Title>
      <Table columns={columns} dataSource={students} pagination={false} />
      <Space
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Space>
          <Text strong>Có mặt: 12</Text>
          <Text strong>Vắng phép: 0</Text>
          <Text strong>Vắng không phép: 0</Text>
        </Space>
        <Button type="primary" className="btn">
          Điểm danh
        </Button>
      </Space>
    </div>
  );
};

export default StudentAttendance;
