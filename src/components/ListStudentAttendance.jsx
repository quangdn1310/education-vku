import { Form, Select, Space, Table, Tag, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useContext, useEffect, useRef, useState } from "react";
import vkuApi from "./Api/vkuApi";
const EditableContext = React.createContext(null);

const checkAttendanceStatus = (val, count) => {
  let status;
  switch (val) {
    case 1:
      status = "";
      break;
    case 2:
      status = <Tag color="purple">{`P: ${count}`}</Tag>;
      break;
    default:
      status = <Tag color="red">{`KP: ${count}`}</Tag>;
      break;
  }

  return status;
};

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      dataIndex !== "attendance_status_id" ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
        >
          <TextArea ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
        >
          <Select
            ref={inputRef}
            onChange={save}
            style={{
              width: 160,
            }}
            bordered={false}
            className={`select-attendance-${record.attendance_status_id}`}
            options={[
              {
                value: 1,
                label: "Có mặt",
              },
              {
                value: 2,
                label: "Vắng phép",
              },
              {
                value: 0,
                label: "Vắng không phép",
              },
            ]}
          />
        </Form.Item>
      )
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const ListStudentAttendance = (props) => {
  const {
    originData,
    onUpdate,
    loading,
    studentAttendanceList,
    attendanceStatusList,
  } = props;
  const [dataSource, setDataSource] = useState([]);
  const [countAbsence, setCountAbsence] = useState(0);
  const [countPresent, setCountPresent] = useState(0);
  const [countUnexcusedAbsence, setCountUnexcusedAbsence] = useState(0);

  useEffect(() => {
    if (originData?.length > 0) {
      let newData = [];
      originData.forEach((item, i) => {
        const student = studentAttendanceList?.find(
          (attendance) => attendance.ma_sv === item.ma_sv
        );

        if (student) {
          newData.push({
            key: i,
            ...student,
            attendance_status_id: student.attendance_status_id,
            note: student.note,
          });
        } else {
          newData.push({
            key: i,
            ...item,
            attendance_status_id: 0,
            note: "",
          });
        }
      });

      setDataSource(newData);
    }
  }, [originData, studentAttendanceList]);

  const defaultColumns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 70,
      align: "center",
      render: (_, record, i) => i + 1,
    },
    {
      title: "Mã SV",
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
      dataIndex: "attendance_status_id",
      width: 200,
      editable: true,
      align: "center",
      render: (_, record) => (
        <Select
          value={record.attendance_status_id}
          style={{
            width: 160,
            textAlign: "center",
          }}
          bordered={false}
          className={`select-attendance-${record.attendance_status_id}`}
          open={false}
          options={[
            {
              value: 1,
              label: "Có mặt",
            },
            {
              value: 2,
              label: "Vắng phép",
            },
            {
              value: 0,
              label: "Vắng không phép",
            },
          ]}
        />
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      width: 180,
      align: "center",
      editable: true,
      render: (_, record) => <TextArea value={record.note} />,
    },
    {
      title: "Vắng",
      width: 80,
      align: "center",
      render: (_, record) => (
        <Space wrap>
          {attendanceStatusList?.map(
            (item) =>
              item.ma_sv === record.ma_sv &&
              checkAttendanceStatus(item.attendance_status_id, item.count)
          )}
        </Space>
      ),
    },
  ];

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    onUpdate(newData);
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  useEffect(() => {
    if (dataSource?.length > 0) {
      const countAbsence = dataSource.filter(
        (item) => item.attendance_status_id === 2
      ).length;
      const countPresent = dataSource.filter(
        (item) => item.attendance_status_id === 1
      ).length;
      const countUnexcusedAbsence = dataSource.filter(
        (item) => item.attendance_status_id === 0
      ).length;

      setCountAbsence(countAbsence);
      setCountPresent(countPresent);
      setCountUnexcusedAbsence(countUnexcusedAbsence);
    }
  }, [dataSource]);

  return (
    <div>
      <Table
        loading={loading}
        components={components}
        rowClassName={() => "editable-row"}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        footer={() => (
          <Space>
            <Typography.Text strong>
              Có mặt: <Tag color="green">{countPresent}</Tag>
            </Typography.Text>
            <Typography.Text strong>
              Vắng phép: <Tag color="purple">{countAbsence}</Tag>
            </Typography.Text>
            <Typography.Text strong>
              Vắng không phép: <Tag color="red">{countUnexcusedAbsence}</Tag>
            </Typography.Text>
          </Space>
        )}
      />
    </div>
  );
};
export default ListStudentAttendance;
