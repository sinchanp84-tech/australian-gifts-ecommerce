import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Wishlist() {
  const {
    wishlistItems,
    removeFromWishlist,
  } = useContext(WishlistContext);

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "50px auto",
          padding: "20px",
          minHeight: "70vh",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          ❤️ My Wishlist
        </h1>

        {wishlistItems.length === 0 ? (
          <h2
            style={{
              textAlign: "center",
              color: "#666",
            }}
          >
            No products in wishlist
          </h2>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "30px",
              justifyContent: "center",
            }}
          >
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                style={{
                  width: "280px",
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />

                <h3>{item.name}</h3>

                <p
                  style={{
                    color: "#2d6a4f",
                    fontWeight: "bold",
                    fontSize: "20px",
                  }}
                >
                  ${item.price}
                </p>

                <button
                  onClick={() =>
                    removeFromWishlist(item.id)
                  }
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Wishlist;