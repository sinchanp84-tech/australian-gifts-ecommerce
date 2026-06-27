import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { API_URL } from "../config";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch(`${API_URL}/api/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  };

 const updateStatus = async (id, status) => {
  try {
    const res = await fetch(`${API_URL}/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    console.log("UPDATE RESPONSE:", data);

    fetchOrders();
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <AdminSidebar />

      <div
        style={{
          marginLeft: "240px",
          padding: "20px",
          maxWidth: "1200px",
        }}
      >
        <h1>📦 Admin Orders</h1>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#2d6a4f",
                color: "white",
              }}
            >
              <th>Name</th>
              <th>Email</th>
              <th>Total Amount</th>
              <th>Items</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>
                <td>{order.email}</td>
                <td>${order.totalAmount}</td>
                <td>{order.items?.length || 0}</td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
  style={{
    backgroundColor:
      order.status === "Pending"
        ? "#ffc107"
        : order.status === "Shipped"
        ? "#0d6efd"
        : "#198754",
    color: "white",
    border: "none",
    padding: "5px",
    borderRadius: "5px",
  }}
>
                    <option value="Pending">
                      Pending
                    </option>
                    <option value="Processing">
                      Processing
                    </option>
                    <option value="Shipped">
                      Shipped
                    </option>
                    <option value="Delivered">
                      Delivered
                    </option>
                  </select>
                </td>

                <td>
  {order.orderDate
    ? new Date(order.orderDate).toLocaleDateString()
    : "-"}
</td>

                <td>
                  <button
                    onClick={() =>
  alert(
    order.items?.length
      ? order.items
          .map(
            (item) =>
`Product: ${item.name}
Quantity: ${item.quantity}
Price: $${item.price}`
          )
          .join("\n\n")
      : "No Items"
  )
}
                    style={{
                      backgroundColor: "#1976d2",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminOrders;