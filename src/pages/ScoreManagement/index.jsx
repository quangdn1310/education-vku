import { Button, Card, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ScoreManagement() {
  // const [data, setData] = useState();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "order",
      align: "center",
      width: 70,
    },
    {
      title: "Tên lớp tín chỉ",
      dataIndex: "ma_mh",
      align: "center",
    },

    {
      title: "Tuần",
      dataIndex: "tuan",
      align: "center",
      width: 120,
    },
    {
      title: "Phòng",
      dataIndex: "phong_hoc",
      align: "center",
      width: 120,
    },
    {
      title: "Thứ",
      dataIndex: "thu",
      align: "center",
      width: 120,
    },
    {
      title: "Tiết",
      dataIndex: "tiet_hoc",
      align: "center",
      width: 120,
    },

    {
      title: "Quản lý",
      dataIndex: "management",
      width: 120,
      fixed: "right",
      align: "center",
      render: (_, i) => (
        <Space>
          <Button type="text" className="btn">
            Gửi email
          </Button>
        </Space>
      ),
    },
  ];

  // useEffect(() => {
  //   axios
  //     .post(`http://localhost/ApiVKU/tkb.php`, {
  //       ma_gv: "19IT155",
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Headers": "POST",
  //     })
  //     .then((data) => console.log(data))
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []);

  const data = Array.from({ length: 20 }).map((_, index) => ({
    key: index,
    order: index + 1,
    ma_mh: "Chuyên đề 4 " + index,
    tuan: "45",
    phong_hoc: "A. 405",
    thu: "Tư",
    tiet_hoc: "6-8",
  }));

  return (
    <div className="page-content">
      <Card title="Quản lý điểm sinh viên">
        <Space direction="vertical" style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link
              to={`/score_management/entry_point`}
              state={{ selectedRowKeys }}
            >
              <Button type="primary" className="btn">
                Nhập điểm
              </Button>
            </Link>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            pagination={{
              defaultPageSize: 50,
              showSizeChanger: true,
              pageSizeOptions: [50, 100, 150],
            }}
            scroll={{
              x: 1000,
            }}
          />
        </Space>
      </Card>
    </div>
  );
}

export default ScoreManagement;
