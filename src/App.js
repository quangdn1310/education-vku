import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "antd/dist/reset.css";
import "./App.css";
import { routes, studentRoutes } from "./routes";
import MainLayout from "./components/Layout";
import { Fragment } from "react";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies();
  const { ma_gv } = cookies;

  const routesType = ma_gv ? routes : studentRoutes;

  return (
    <Router>
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
    </Router>
  );
}

export default App;
