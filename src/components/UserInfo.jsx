import { Button, Form, Input, Space } from "antd";
import React, { useEffect, useState } from "react";

const UserInfo = ({ user }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const handleOk = () => {
    // form
    // .validateFields()
    // .then(values => {

    // })
    setIsEdit(false);
  };

  return (
    <Space className="w-full" style={{ justifyContent: "center" }}>
      <Form
        form={form}
        layout="vertical"
        disabled={!isEdit}
        autoComplete="false"
        spellCheck="false"
        validateMessages={{ required: "Trường này không dược để trống!" }}
      >
        <Space direction="vertical" className="w-full" size={"middle"}>
          <Space className="w-full" size={"large"} wrap>
            <Form.Item label="Mã giảng viên" name="ma_gv">
              <Input />
            </Form.Item>
            <Form.Item label="Họ tên" name="ho_ten">
              <Input />
            </Form.Item>
            <Form.Item label="Học vị" name="hoc_vi">
              <Input />
            </Form.Item>
          </Space>
          <Space className="w-full" size={"large"} wrap>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="sdt">
              <Input />
            </Form.Item>
            <Form.Item label="Khoa" name="ten_khoa">
              <Input />
            </Form.Item>
          </Space>
        </Space>

        <Space>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!isEdit}
              onClick={handleOk}
            >
              Lưu
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              disabled={isEdit}
              onClick={() => setIsEdit(true)}
            >
              Sửa
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Space>
  );
};

export default UserInfo;
