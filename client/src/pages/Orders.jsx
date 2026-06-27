import { useEffect, useState } from "react";
import { API_URL } from "../config";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { generateInvoice } from "../utilities/invoiceGenerator";

function Orders() {
 const [orders, setOrders] = useState([]);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("Logged User:", user);

  if (!user) return;
  console.log("Email:", user.email);

fetch(`${API_URL}/api/orders/${user.email}`)
  .then((res) => res.json())
  .then((data) => {
    console.log("Orders:", data);
    setOrders(data);
  })
  .catch((err) => console.log(err));
}, []);

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto",
          padding: "20px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
            color: "#2d6a4f",
          }}
        >
          📦 My Orders
        </h1>

        {orders.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "50px",
              backgroundColor: "#fff",
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h2>No Orders Yet</h2>
            <p>
              Start shopping to see your orders
              here.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              style={{
                backgroundColor: "#fff",
                padding: "25px",
                borderRadius: "15px",
                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.1)",
                marginBottom: "25px",
                borderLeft:
                  "6px solid #2d6a4f",
              }}
            >
              <h2
                style={{
                  color: "#2d6a4f",
                  marginBottom: "15px",
                }}
              >
                📦 Order #{order._id.slice(-6)}
              </h2>

              <p>
                <strong>Date:</strong>{" "}
               {new Date(order.orderDate).toLocaleDateString()}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  ✅ {order.status}
                </span>
              </p>

              <hr
                style={{
                  margin: "15px 0",
                }}
              />

              <h3>Ordered Products</h3>

              {order.items &&
                order.items.map((item) => (
                  <div
                    key={item._id || item.name}
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      padding: "10px 0",
                      borderBottom:
                        "1px solid #eee",
                    }}
                  >
                    <span>
                      {item.name} ×{" "}
                      {item.quantity}
                    </span>

                    <span>
                      $
                      {item.price *
                        item.quantity}
                    </span>
                  </div>
                ))}

              <h2
                style={{
                  marginTop: "20px",
                  color: "#2d6a4f",
                }}
              >
                Total: ${order.totalAmount}
              </h2>
              <div
  style={{
    marginTop: "20px",
    display: "flex",
    gap: "10px",
  }}
>
  <button
    onClick={() => generateInvoice(order)}
    style={{
      backgroundColor: "#2d6a4f",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    📄 Download Invoice
  </button>
</div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default Orders;