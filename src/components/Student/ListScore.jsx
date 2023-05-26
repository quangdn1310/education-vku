import { Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { scoreToAlp } from "../common";
import vkuApi from "../Api/vkuApi";

const { Text } = Typography;

const ListScore = (props) => {
  const { originData, courseId } = props;

  const [data, setData] = useState([]);
  const [schoolYears, setSchoolYears] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [current, setCurrent] = useState("0");

  const handleExpand = (expanded, record) => {
    const tmp = data.filter((item) => item?.nam_hoc === record?.id);

    setFilteredData(tmp);
    setCurrent(record.id);
  };

  useEffect(() => {
    if (originData?.length > 0) {
      const newData = originData.map((item, i) => ({
        ...item,
        key: i.toString(),
      }));

      setData(newData);
    }
  }, [originData]);

  useEffect(() => {
    const getSchoolYears = async () => {
      if (courseId) {
        const params = {
          khoa_hoc: courseId,
        };
        try {
          const res = await vkuApi.getSchoolYears({ params });
          if (res) {
            const sortData = res.sort((a, b) => {
              if (a.nam_hoc > b.nam_hoc) return -1;
              if (a.nam_hoc < b.nam_hoc) return 1;

              if (a.hoc_ky > b.hoc_ky) return -1;
              if (a.hoc_ky < b.hoc_ky) return 1;
            });
            setSchoolYears(sortData);
          }
        } catch (error) {
          console.log("error::", error);
        }
      }
    };

    getSchoolYears();
  }, [courseId]);

  const columns = [
    {
      title: "STT",
      width: 70,
      align: "center",
    },
    {
      title: "Mã lớp tín chỉ",
      width: 140,
      align: "center",
      render: (_, record) => (
        <Text>
          Học kỳ {record?.hoc_ky} - {record?.nam_hoc}
        </Text>
      ),
    },

    {
      title: "Tên môn học",
    },
    {
      title: "Số tín chỉ",
      align: "center",
      width: 120,
    },
    {
      title: "Điểm CC",
      width: 120,
      align: "center",
    },
    {
      title: "Điểm GK",
      width: 120,
      align: "center",
    },
    {
      title: "Điểm CK",
      width: 120,
      align: "center",
    },

    {
      title: "Điểm số",
      width: 120,
      align: "center",
    },
    {
      title: "Điểm chữ",
      width: 120,
      align: "center",
    },
  ];

  const expandedRowRender = () => {
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
        render: (_, record) => `${record?.ten_mh} (${record?.nhom})`,
        rowSpan: 6,
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
        render: (_, record) => {
          if (record?.diem_cc || record?.diem_cc || record?.diem_ck) {
            if (record?.diem_gk !== null) {
              return (
                record?.diem_cc * 0.2 +
                record?.diem_gk * 0.2 +
                record?.diem_ck * 0.6
              ).toFixed(1);
            } else {
              return (record?.diem_cc * 0.2 + record?.diem_ck * 0.8).toFixed(1);
            }
          }
        },
      },
      {
        title: "Điểm chữ",
        width: 120,
        align: "center",
        fixed: "right",
        render: (_, record) => {
          if (record?.diem_cc || record?.diem_cc || record?.diem_ck) {
            if (record?.diem_cc || record?.diem_cc || record?.diem_ck) {
              if (record?.diem_gk !== null) {
                return scoreToAlp(
                  record?.diem_cc * 0.2 +
                    record?.diem_gk * 0.2 +
                    record?.diem_ck * 0.6
                );
              } else {
                return scoreToAlp(
                  record?.diem_cc * 0.2 + record?.diem_ck * 0.8
                );
              }
            }
          }
        },
      },
    ];

    return (
      <Table
        showHeader={false}
        columns={columns}
        dataSource={filteredData}
        pagination={false}
      />
    );
  };

  return (
    <Table
      rowClassName="tbl-row-cs"
      dataSource={schoolYears}
      columns={columns}
      rowKey="id"
      expandable={{
        expandedRowRender,
        onExpand: handleExpand,
        expandedRowKeys: [current],
        expandRowByClick: true,
      }}
      pagination={false}
      scroll={{
        x: 1200,
      }}
    />
  );
};
export default ListScore;
