import { Routes, Route, useNavigate } from "react-router-dom";

import "antd/dist/reset.css";
import "./App.css";
import { routes, studentRoutes } from "./routes";
import MainLayout from "./components/Layout";
import { Fragment, useEffect } from "react";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies();
  const { profile } = cookies;
  const navigate = useNavigate();

  const routesType = profile?.ma_gv ? routes : studentRoutes;

  useEffect(() => {
    if (!cookies.profile) {
      navigate("/dang-nhap");
    }
  }, [cookies]);

  return (
    <div className="App">
      <Routes>
        {routesType.map((route, i) => {
          let Layout = MainLayout;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          const Page = route.component;
          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
