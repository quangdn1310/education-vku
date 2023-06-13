import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import vkuApi from "../../components/Api/vkuApi";
import ListStudent from "../../components/ListStudent";
import { Button, Space, notification } from "antd";
import Title from "antd/es/typography/Title";

function Entrypoint() {
  const { id, group } = useParams();
  const [students, setStudents] = useState([]);
  const [newStudents, setNewStudents] = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getStudents = async () => {
      setIsLoadingList(true);
      try {
        const params = {
          ma_lop_tc: id,
          nhom: group,
        };
        const res = await vkuApi.getStudentsByClassId({ params });
        if (res) {
          setStudents(res);
        }
        setIsLoadingList(false);
      } catch (error) {
        setIsLoadingList(false);
        console.log("error::", error);
      }
    };
    getStudents();
  }, [id, group, reload]);

  const onUpdateScore = async (params, i) => {
    if (newStudents.length - 1 === i) {
      await vkuApi.updateScore({ params });
      notification.success({
        message: "Cập nhật điểm thành công!",
      });
      setReload(!reload);
      setIsLoading(false);
      setNewStudents([]);
    } else {
      await vkuApi.updateScore({ params });
    }
  };

  const updateStudentList = (data) => {
    setNewStudents(data);
  };

  const handleUpdateScore = () => {
    setIsLoading(true);
    if (newStudents.length > 0) {
      newStudents?.forEach((data, i) => {
        onUpdateScore(data, i);
      });
    } else {
      notification.info({
        message: "Không có thay đổi nào!",
      });
      setIsLoading(false);
    }
  };

  const useStyles = {
    titleStyles: {
      fontSize: 14,
      fontWeight: 500,
      textTransform: "uppercase",
    },
  };

  return (
    <div className="page-content">
      <Space style={{ width: "100%" }} direction="vertical">
        <Title level={4} style={useStyles.titleStyles}>
          Nhập điểm
        </Title>
        <ListStudent
          originData={students}
          onUpdate={updateStudentList}
          loading={isLoadingList}
        />

        <Space direction="vertical" className="w-full" align="end">
          <Button
            type="primary"
            onClick={handleUpdateScore}
            loading={isLoading}
          >
            Cập nhật
          </Button>
        </Space>
      </Space>
    </div>
  );
}

export default Entrypoint;
