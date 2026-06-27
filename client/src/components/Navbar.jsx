import { Link } from "react-router-dom";
import { useContext } from "react";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { OrderContext } from "../context/OrderContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const { orders } = useContext(OrderContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    alert("Logged Out Successfully ✅");

    window.location.reload();
  };

  return (
    <nav
      style={{
        backgroundColor: "#2d6a4f",
        padding: "15px 40px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Link
  to="/"
  style={{
    color: "white",
    textDecoration: "none",
    fontSize: "24px",
    fontWeight: "bold",
  }}
>
   🇦🇺 Australian Gifts & Souvenirs
</Link>

        {/* Menu */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Home
          </Link>

          <Link
            to="/shop"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Shop
          </Link>

          <Link
            to="/orders"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            📦 Orders ({orders.length})
          </Link>

          <Link
            to="/wishlist"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            ❤️ Wishlist ({wishlistItems.length})
          </Link>

          <Link
            to="/cart"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            🛒 Cart ({cartItems.length})
          </Link>

          {user && (
            <Link
              to="/profile"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              👤 Profile
            </Link>
          )}

          <Link
           to="/admin-login"
            style={{
              backgroundColor: "#d62828",
              color: "white",
              textDecoration: "none",
              padding: "8px 15px",
              borderRadius: "6px",
              fontWeight: "bold",
            }}
          >
            Admin
          </Link>

          {user ? (
            <>
              <span
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                Welcome, {user.name}
              </span>

              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#000",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>

              <Link
                to="/register"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;