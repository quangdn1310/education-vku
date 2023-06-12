import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import vkuApi from "../../components/Api/vkuApi";
import { Button, Space, notification } from "antd";
import Title from "antd/es/typography/Title";
import ListStudentProject from "../../components/ListStudentProject";

function EntrypointProject() {
  const { id, group } = useParams();
  const [students, setStudents] = useState([]);
  const [newStudents, setNewStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getStudents = async () => {
      const params = {
        ma_lop_tc: id,
        nhom: group,
      };
      const res = await vkuApi.getStudentsByProjectClassId({ params });
      if (res) {
        setStudents(res);
      }
    };
    getStudents();
  }, [id, group]);

  const onUpdateScore = async (params, i) => {
    if (newStudents.length - 1 === i) {
      await vkuApi.updateScoreProject({ params });
      notification.success({
        message: "Cập nhật điểm thành công!",
      });
      setIsLoading(false);
      setNewStudents([]);
    } else {
      await vkuApi.updateScoreProject({ params });
    }
  };

  const updateStudentList = (data) => {
    setNewStudents(data);
  };

  const handleUpdateScore = () => {
    setIsLoading(true);
    if (newStudents.length > 0) {
      newStudents?.forEach((item, i) => {
        onUpdateScore(item, i);
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
        <ListStudentProject
          originData={students}
          onUpdate={updateStudentList}
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

export default EntrypointProject;
