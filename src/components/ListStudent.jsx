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
              message: `Nhập ${title}!`,
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
const ListStudent = (props) => {
  const { originData, onUpdate, loading } = props;

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
        const { id, diem_cc, diem_gk, diem_ck } = item;
        return {
          id,
          diem_cc,
          diem_gk,
          diem_ck,
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
      title: "Điểm GK",
      dataIndex: "diem_gk",
      width: 120,
      align: "center",
      editable: true,
    },
    {
      title: "Điểm CK",
      dataIndex: "diem_ck",
      width: 120,
      align: "center",
      editable: true,
    },
    {
      title: "Điểm chữ",
      width: 120,
      align: "center",
      render: (_, record) =>
        scoreToAlp(
          record?.diem_cc * 0.2 + record?.diem_gk * 0.2 + record?.diem_ck * 0.6
        ),
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
        loading={loading}
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
          x: 1100,
        }}
      />
    </Form>
  );
};
export default ListStudent;
