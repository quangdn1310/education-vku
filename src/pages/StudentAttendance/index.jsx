import { Button, Select, Space, Table, Typography, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import vkuApi from "../../components/Api/vkuApi";
import ListStudentAttendance from "../../components/ListStudentAttendance";

const { Title, Text } = Typography;
const StudentAttendance = () => {
  const { id, group } = useParams();
  const [students, setStudents] = useState([]);
  const [newStudentList, setNewStudentList] = useState([]);

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
          nhom: +group,
          ma_sv: item.ma_sv,
          ho_ten: item.ho_ten,
        }));

        setStudents(newData);
      }
    };
    getStudents();
  }, [id, group]);

  const useStyles = {
    titleStyles: {
      fontSize: 14,
      fontWeight: 500,
      textTransform: "uppercase",
    },
  };

  const handleUpdate = (data) => {
    if (data?.length > 0) {
      const newData = data.map((item) => ({
        ma_sv: item.ma_sv,
        ma_lop_tc: item.ma_lop_tc,
        nhom: item.nhom,
        attendance_status_id: item.attendance_status_id,
        ngay_hoc: new Date().toJSON().slice(0, 10),
        note: item.note,
      }));

      setNewStudentList(newData);
    }
  };

  const onUpdateAttendance = async (params, i) => {
    if (newStudentList.length - 1 === i) {
      await vkuApi.createStudentAttendance({ params });
      notification.success({
        message: "Điểm danh thành công!",
      });
      // setIsLoading(false);
      setNewStudentList([]);
    } else {
      await vkuApi.createStudentAttendance({ params });
    }
  };

  const handleAttendance = () => {
    if (newStudentList?.length > 0) {
      // setIsLoading(true);
      try {
        newStudentList?.forEach((item, i) => {
          onUpdateAttendance(item, i);
        });
      } catch (error) {
        // setIsLoading(false)
        console.log("error::", error);
      }
    } else {
      notification.info({
        message: "Không có thay đổi nào!",
      });
    }
  };

  return (
    <div className="page-content">
      <Space style={{ width: "100%" }} direction="vertical">
        <Title level={4} style={useStyles.titleStyles}>
          Điểm danh hôm nay (ngày{" "}
          {`${new Date().getDate()}/${
            new Date().getMonth() + 1
          }/${new Date().getFullYear()}`}
          )
        </Title>
        <ListStudentAttendance
          originData={students}
          onUpdate={handleUpdate}
          maLopTc={id}
          group={group}
        />
        <Space
          style={{
            width: "100%",
          }}
          direction="vertical"
          align="end"
        >
          <Button type="primary" className="btn" onClick={handleAttendance}>
            Điểm danh
          </Button>
        </Space>
      </Space>
    </div>
  );
};

export default StudentAttendance;
