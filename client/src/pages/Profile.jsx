import { useContext } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { OrderContext } from "../context/OrderContext";
import { ReviewContext } from "../context/ReviewContext";

function Profile() {
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } =
    useContext(WishlistContext);
  const { orders } =
    useContext(OrderContext);
  const { reviews } =
    useContext(ReviewContext);

  const totalReviews = Array.isArray(reviews)
    ? reviews.length
    : 0;

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1000px",
          margin: "50px auto",
          padding: "20px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2d6a4f",
            marginBottom: "40px",
          }}
        >
          👤 My Profile
        </h1>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "80px",
            }}
          >
            👤
          </div>

          <h2>Sinchana</h2>

          <p
            style={{
              color: "#666",
            }}
          >
            Australian Gifts Customer
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px,1fr))",
            gap: "20px",
            marginTop: "40px",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2>🛒</h2>
            <h3>{cartItems.length}</h3>
            <p>Cart Items</p>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2>❤️</h2>
            <h3>{wishlistItems.length}</h3>
            <p>Wishlist Items</p>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2>📦</h2>
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>

          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow:
                "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2>⭐</h2>
            <h3>{totalReviews}</h3>
            <p>Reviews Given</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;

