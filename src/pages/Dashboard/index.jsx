import Cookies from "universal-cookie";

const Dashboard = () => {
  const cookies = new Cookies();
  const maGv = cookies.get("ma_gv");

  return (
    <div className="page-content">
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
