import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const MENU_ITEMS = [
  {
    key: "1",
    icon: React.createElement(UploadOutlined),
    label: <Link to="/">Thông tin sinh viên</Link>,
  },
  {
    key: "2",
    icon: React.createElement(UploadOutlined),
    label: "Thời khóa biểu",
  },
  {
    key: "sub1",
    icon: React.createElement(UploadOutlined),
    label: "Quản lý lớp tín chỉ",
    children: [
      {
        key: "3",
        icon: React.createElement(UploadOutlined),
        label: <Link to="/score_management">Quản lý điểm sinh viên</Link>,
      },
    ],
  },
  {
    key: "4",
    icon: React.createElement(UploadOutlined),
    label: "Hướng dẫn đồ án",
  },
  {
    key: "5",
    icon: React.createElement(UploadOutlined),
    label: "Lớp học phần",
  },
];
