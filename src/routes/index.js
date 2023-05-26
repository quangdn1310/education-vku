import ScoreManagement from "../pages/ScoreManagement";
import Login from "../pages/auth/Login";
import EntryPoint from "../pages/EntryPoint";
import TeacherInfo from "../pages/TeacherInfo";
import ProjectGuide from "../pages/ProjectGuide";
import Schedule from "../pages/Schedule";
import ScheduleStudent from "../pages/Student/Schedule";
import StudentInfo from "../pages/Student/StudentInfo";
import Score from "../pages/Student/Score";
import StudentAttendance from "../pages/StudentAttendance";
import ProjectClass from "../pages/Student/ProjectClass";
import EntrypointProject from "../pages/EntryPointProject";
import CreditRegistry from "../pages/Student/CreditRegistry";
import StudentConfirm from "../pages/StudentConfirm";

export const routes = [
  {
    path: "/huong-dan-do-an/nhap-diem/:id/:group",
    component: EntrypointProject,
  },
  {
    path: "/quan-ly-diem/nhap-diem/:id/:group",
    component: EntryPoint,
  },

  {
    path: "/dang-nhap",
    component: Login,
    layout: null,
  },
  {
    path: "/thoi-khoa-bieu/student-attendance/:id/:group",
    component: StudentAttendance,
  },
  {
    path: "/thoi-khoa-bieu",
    component: Schedule,
  },
  {
    path: "/quan-ly-diem",
    component: ScoreManagement,
  },
  {
    path: "/huong-dan-do-an",
    component: ProjectGuide,
  },
  {
    path: "/xac-nhan-sinh-vien",
    component: StudentConfirm,
  },
  {
    path: "/",
    exact: true,
    component: TeacherInfo,
  },
];

export const studentRoutes = [
  {
    path: "/dang-nhap",
    component: Login,
    layout: null,
  },
  {
    path: "/thoi-khoa-bieu",
    component: ScheduleStudent,
  },
  {
    path: "/do-an",
    component: ProjectClass,
  },
  {
    path: "/ket-qua-hoc-tap",
    component: Score,
  },
  {
    path: "/dang-ky-tin-chi",
    component: CreditRegistry,
  },
  {
    path: "/",
    exact: true,
    component: StudentInfo,
  },
];
