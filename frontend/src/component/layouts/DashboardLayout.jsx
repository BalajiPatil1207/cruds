import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial" }}>
      
      <div
        style={{
          width: "250px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Admin Panel</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link style={linkStyle} to="/users">Users</Link>
          <Link style={linkStyle} to="/studs">Student</Link>
          <Link style={linkStyle} to="/product">Product</Link>
          <Link style={linkStyle} to="/income">Income</Link>
          <Link style={linkStyle} to="/expense">Expense</Link>
          <Link style={linkStyle} to="/employee">Employee</Link>
          <Link style={linkStyle} to="/task">Tasks</Link>
          <Link style={linkStyle} to="/book">Books</Link>
          <Link style={linkStyle} to="/contact">Contact</Link>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "30px",
          background: "#f1f5f9",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
  padding: "8px",
  borderRadius: "5px",
  background: "#334155",
};

export default DashboardLayout;