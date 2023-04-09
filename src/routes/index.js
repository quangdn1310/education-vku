import ScoreManagement from "../pages/ScoreManagement";
import Dashboard from "../pages/Dashboard";
import Login from "../components/auth/Login";
import EntryPoint from "../pages/EntryPoint";

export const routes = [
  {
    path: "/",
    exact: true,
    component: Dashboard,
  },
  {
    path: "/login",
    component: Login,
    layout: null,
  },
  {
    path: "/score_management",
    component: ScoreManagement,
  },
  {
    path: "/score_management/entry_point",
    component: EntryPoint,
  },
];
