import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { API_URL } from "../config";
import { Navigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const token =
  localStorage.getItem("token");

if (!token) {
  return <Navigate to="/admin-login" />;
}
  const salesData = [
  { day: "Mon", orders: 3 },
  { day: "Tue", orders: 6 },
  { day: "Wed", orders: 4 },
  { day: "Thu", orders: 7 },
  { day: "Fri", orders: 5 },
];



  const productsPerPage = 5;

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users`);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await fetch(`${API_URL}/api/products/${id}`, {
  method: "DELETE",
});

      alert("Product Deleted Successfully ✅");
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Delete Failed ❌");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const lastIndex =
    currentPage * productsPerPage;

  const firstIndex =
    lastIndex - productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      firstIndex,
      lastIndex
    );

  const totalRevenue = Array.isArray(orders)
  ? orders.reduce(
      (total, order) =>
        total + Number(order.totalAmount || 0),
      0
    )
  : 0;

  const deliveredOrders = Array.isArray(orders)
  ? orders.filter(
      (order) => order.status === "Delivered"
    ).length
  : 0;
  return (
    <>
      <AdminSidebar />

      <div
        style={{
          marginLeft: "240px",
          padding: "20px",
        }}
      >
        <h1>Admin Dashboard</h1>

        {/* Statistics Cards */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "#2d6a4f",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              minWidth: "180px",
            }}
          >
            <h3>Total Products</h3>
            <h2>{products.length}</h2>
          </div>

          <div
            style={{
              background: "#1976d2",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              minWidth: "180px",
            }}
          >
            <h3>Total Users</h3>
            <h2>{users.length}</h2>
          </div>

          <div
            style={{
              background: "#d62828",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              minWidth: "180px",
            }}
          >
            <h3>Total Orders</h3>
            <h2>{orders.length}</h2>
          </div>

          <div
            style={{
              background: "#ff9800",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              minWidth: "180px",
            }}
          >
            <h3>Total Revenue</h3>
            <h2>${totalRevenue.toFixed(2)}</h2>
          </div>

          <div
            style={{
              background: "#28a745",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              minWidth: "180px",
            }}
          >
            <h3>Delivered Orders</h3>
            <h2>{deliveredOrders}</h2>
          </div>
        </div>
        <div
  style={{
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginTop: "30px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  }}
>
  <h2>📊 Orders Analytics</h2>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={salesData}>
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="orders" fill="#2d6a4f" />
    </BarChart>
  </ResponsiveContainer>
</div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "20px",
          }}
        >
          <Link to="/admin/add-product">
            <button>
              + Add Product
            </button>
          </Link>

          <Link to="/admin/orders">
            <button>
              📦 View Orders
            </button>
          </Link>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
          }}
        />

        {/* Table */}
        <div
  style={{
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginTop: "20px",
  }}
>
    <table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
    fontSize: "16px",
  }}
>
          <thead>
            <tr
              style={{
                backgroundColor: "#2d6a4f",
                color: "white",
              }}
            >
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentProducts.map(
              (product) => (
                <tr
  key={product._id}
  style={{
    borderBottom: "1px solid #ddd",
  }}
>
                  <td>{product._id}</td>

                  <td>
                   <img
  src={product.image}
  alt={product.name}
  style={{
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "10px",
  }}
/>
                  </td>

                  <td>{product.name}</td>

                  <td>
                    ${product.price}
                  </td>

                  <td>
                    {product.category}
                  </td>

                  <td>
                    <Link
                      to={`/admin/edit-product/${product._id}`}
                    >
                     <button
  style={{
    background: "#1976d2",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>
  Edit
</button> 
                        
                    </Link>

                <button
  onClick={() => handleDelete(product._id)}
  style={{
    background: "#d62828",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: "10px",
  }}
>
  Delete
</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        </div>

        {/* Pagination */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
          >
            Previous
          </button>

          {[...Array(totalPages)].map(
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentPage(
                    index + 1
                  )
                }
              >
                {index + 1}
              </button>
            )
          )}

          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;