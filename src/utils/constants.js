import React from "react";
import { Link } from "react-router-dom";
import {
  CreditManagement,
  DoAn,
  HocPhan,
  HocPhi,
  Schedule,
  ScoreManagement,
  User,
} from "../assets";

export const MENU_ITEMS = [
  {
    key: "1",
    icon: <img src={User} alt="" width={20} />,
    label: <Link to="/">Thông tin giảng viên</Link>,
  },
  {
    key: "2",
    icon: <img src={Schedule} alt="" width={20} />,
    label: <Link to="/thoi-khoa-bieu">Thời khóa biểu</Link>,
  },
  {
    key: "sub1",
    icon: <img src={CreditManagement} alt="" width={20} />,
    label: "Quản lý lớp tín chỉ",
    children: [
      {
        key: "3",
        icon: <img src={ScoreManagement} alt="" width={20} />,
        label: <Link to="/quan-ly-diem">Quản lý điểm sinh viên</Link>,
      },
    ],
  },
  {
    key: "4",
    icon: <img src={DoAn} alt="" width={20} />,
    label: <Link to="/huong-dan-do-an">Hướng dẫn đồ án</Link>,
  },
  {
    key: "5",
    icon: <img src={HocPhan} alt="" width={20} />,
    label: "Lớp học phần",
  },
];

export const STUDENT_MENU_ITEMS = [
  {
    key: "1",
    icon: <img src={User} alt="" width={20} />,
    label: <Link to="/">Thông tin sinh viên</Link>,
  },
  {
    key: "2",
    icon: <img src={Schedule} alt="" width={20} />,
    label: <Link to="/thoi-khoa-bieu">Thời khóa biểu</Link>,
  },
  {
    key: "3",
    icon: <img src={DoAn} alt="" width={20} />,
    label: <Link to="/do-an">Lớp đồ án</Link>,
  },
  {
    key: "4",
    icon: <img src={HocPhan} alt="" width={20} />,
    label: <Link to="/ket-qua-hoc-tap">Kết quả học tập</Link>,
  },
  {
    key: "5",
    icon: <img src={HocPhi} alt="" width={20} />,
    label: <Link to="/hoc-phi">Học phí</Link>,
  },
];
