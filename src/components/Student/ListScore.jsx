import { Table, Typography } from "antd";
import { useEffect, useState } from "react";

const { Text } = Typography;

const scoreToAlp = (number) => {
  let score;
  switch (true) {
    case number < 4:
      score = (
        <Text type="danger" strong>
          F
        </Text>
      );
      break;
    case number < 5.5:
      score = (
        <Text type="warning" strong>
          D
        </Text>
      );
      break;
    case number < 7:
      score = (
        <Text type="warning" strong>
          C
        </Text>
      );
      break;
    case number < 8.5:
      score = (
        <Text style={{ color: "blue" }} strong>
          B
        </Text>
      );
      break;
    default:
      score = (
        <Text strong type="success">
          A
        </Text>
      );
  }

  return score;
};

const ListScore = (props) => {
  const { originData } = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    if (originData?.length > 0) {
      const newData = originData.map((item, i) => ({
        ...item,
        key: i.toString(),
      }));

      setData(newData);
    }
  }, [originData]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 70,
      align: "center",
      render: (_, record, i) => i + 1,
    },
    {
      title: "Mã lớp tín chỉ",
      dataIndex: "ma_lop_tc",
      width: 140,
      align: "center",
    },

    {
      title: "Tên môn học",
      dataIndex: "ma_mh",
      render: (_, record) => `${record?.ma_mh} (${record?.nhom})`,
    },
    {
      title: "Số tín chỉ",
      dataIndex: "so_tin_chi",
      align: "center",
      width: 120,
    },
    {
      title: "Điểm CC",
      dataIndex: "diem_cc",
      width: 120,
      align: "center",
    },
    {
      title: "Điểm GK",
      dataIndex: "diem_gk",
      width: 120,
      align: "center",
    },
    {
      title: "Điểm CK",
      dataIndex: "diem_ck",
      width: 120,
      align: "center",
    },

    {
      title: "Điểm số",
      width: 120,
      align: "center",
      render: (_, record) =>
        (
          record?.diem_cc * 0.2 +
          record?.diem_gk * 0.2 +
          record?.diem_ck * 0.6
        ).toFixed(1),
    },
    {
      title: "Điểm chữ",
      width: 120,
      align: "center",
      fixed: "right",
      render: (_, record) =>
        scoreToAlp(
          record?.diem_cc * 0.2 + record?.diem_gk * 0.2 + record?.diem_ck * 0.6
        ),
    },
    // {
    //   title: "Quản lý",
    //   dataIndex: "operation",
    //   fixed: "right",
    //   width: 160,
    //   align: "center",
    //   render: (_, record) => <Button type="primary" icon={<SaveOutlined />} />,
    // },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{
        defaultPageSize: 50,
        showSizeChanger: true,
        pageSizeOptions: [50, 100, 150],
      }}
      scroll={{
        x: 1200,
      }}
    />
  );
};
export default ListScore;
