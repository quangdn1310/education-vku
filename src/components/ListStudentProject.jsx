import { EditOutlined, CloseOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import { scoreToAlp } from "./common";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? <InputNumber min={0} max={10} /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Vui lòng nhập ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const ListStudentProject = (props) => {
  const { originData, onUpdate } = props;

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;

  useEffect(() => {
    if (originData.length > 0) {
      const newData = originData.map((item, i) => ({
        ...item,
        key: i.toString(),
      }));

      setData(newData);
    }
  }, [originData]);

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });

    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];

      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }

      const dataUpdate = newData.map((item) => {
        const { ma_sv, ma_lop_tc, nhom, diem_cc, diem_bv } = item;
        return {
          ma_sv,
          ma_lop_tc,
          diem_cc,
          diem_bv,
          nhom,
        };
      });

      onUpdate(dataUpdate);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
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
      title: "Điểm CC",
      dataIndex: "diem_cc",
      width: 120,
      align: "center",
      editable: true,
    },

    {
      title: "Điểm BV",
      dataIndex: "diem_bv",
      width: 120,
      align: "center",
      editable: true,
    },
    {
      title: "Điểm chữ",
      width: 120,
      align: "center",
      render: (_, record) =>
        scoreToAlp(record?.diem_cc * 0.2 + record?.diem_bv * 0.8),
    },
    {
      title: "Điểm số",
      width: 120,
      align: "center",
      render: (_, record) =>
        (record?.diem_cc * 0.2 + record?.diem_bv * 0.8).toFixed(1),
    },
    {
      title: "Quản lý",
      dataIndex: "operation",
      fixed: "right",
      width: 160,
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            />

            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button type="primary" icon={<CloseOutlined />} ghost danger />
            </Popconfirm>
          </span>
        ) : (
          <Button
            type="primary"
            icon={<EditOutlined />}
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          />
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        // inputType: col.dataIndex === "age" ? "number" : "text",
        inputType: "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        scroll={{
          x: 1200,
        }}
      />
    </Form>
  );
};
export default ListStudentProject;
