import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        backgroundColor: "#2d6a4f",
        color: "white",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <h2>Admin Panel</h2>

      <div style={{ marginTop: "30px" }}>
        <p>
          <Link
            to="/admin"
            style={{ color: "white", textDecoration: "none" }}
          >
            📊 Dashboard
          </Link>
        </p>

        <p>
          <Link
            to="/admin/orders"
            style={{ color: "white", textDecoration: "none" }}
          >
            📦 Orders
          </Link>
        </p>

        <p>
          <Link
            to="/admin/users"
            style={{ color: "white", textDecoration: "none" }}
          >
            👥 Users
          </Link>
        </p>

        <p>
          <Link
            to="/admin/add-product"
            style={{ color: "white", textDecoration: "none" }}
          >
            ➕ Add Product
          </Link>
        </p>
        <button
  onClick={() => {
    localStorage.removeItem("admin");
    window.location.href = "/admin-login";
  }}
  style={{
    marginTop: "20px",
    width: "100%",
    padding: "10px",
    backgroundColor: "#d62828",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  🚪 Logout
</button>
      </div>
    </div>
  );
}

export default AdminSidebar;