import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { CartContext } from "../context/CartContext";


function Checkout() {
  const navigate = useNavigate();

  const {
  cartItems,
  totalPrice,
  clearCart,
} = useContext(CartContext);
    const user = JSON.parse(localStorage.getItem("user"));


  const handlePayment = async () => {
    console.log("Cart Items:", cartItems);
      console.log("PAY NOW CLICKED");
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      console.log("PAY NOW CLICKED");

      console.log("SENDING REQUEST");

const response = await fetch(
  `${API_URL}/api/create-order`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: totalPrice,
    }),
  }
);
      console.log("STATUS:", response.status);
      const order = await response.json();

      const options = {
        key: "rzp_test_T5SJCDeUfxnFR8",

        amount: order.amount,
        currency: order.currency,
        name: "Australian Gifts & Souvenirs",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (
          response
        ) {
          const orderData = {
  customerName: user.name,
  email: user.email,
  items: cartItems,
  totalAmount: totalPrice,
  status: "Pending",
  paymentId: response.razorpay_payment_id,
};

          try {
  await fetch(
    `${API_URL}/api/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(orderData),
    }
  );

  // 👇 ADD THIS HERE
 for (const item of cartItems) {
  await fetch(
    `${API_URL}/api/products/${item.id}/stock`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        quantity: item.quantity,
      }),
    }
  );
}
  clearCart();
  alert("🎉 Payment Successful!");

  navigate("/orders");
} catch (error) {
  console.log(error);
}
        },

        theme: {
          color: "#2d6a4f",
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);
      alert("Payment Failed ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "900px",
          margin: "50px auto",
          padding: "20px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Checkout
        </h1>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginBottom: "15px",
                paddingBottom: "10px",
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
              color: "#2d6a4f",
              marginTop: "25px",
            }}
          >
            Total: ${totalPrice}
          </h2>

          <button
            onClick={handlePayment}
            style={{
              marginTop: "25px",
              padding: "15px 30px",
              backgroundColor:
                "#2d6a4f",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Pay Now
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;