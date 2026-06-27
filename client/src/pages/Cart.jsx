import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Cart() {
const navigate = useNavigate();

const {
cartItems,
increaseQuantity,
decreaseQuantity,
removeItem,
totalPrice,
} = useContext(CartContext);

return (
<> <Navbar />

```
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
        marginBottom: "30px",
      }}
    >
      Shopping Cart
    </h1>

    {cartItems.length === 0 ? (
      <h2 style={{ textAlign: "center" }}>
        Your cart is empty 🛒
      </h2>
    ) : (
      <>
        {cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
              marginBottom: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <div>
              <h3>{item.name}</h3>
              <p
                style={{
                  color: "#2d6a4f",
                  fontWeight: "bold",
                }}
              >
                ${item.price}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button
                onClick={() => decreaseQuantity(item.id)}
                style={{
                  padding: "5px 12px",
                  cursor: "pointer",
                }}
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => increaseQuantity(item.id)}
                style={{
                  padding: "5px 12px",
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}

        <div
          style={{
            marginTop: "30px",
            padding: "25px",
            borderRadius: "10px",
            backgroundColor: "#f8f9fa",
            textAlign: "right",
          }}
        >
          <h3>Total Items: {cartItems.length}</h3>

          <h2
            style={{
              color: "#2d6a4f",
            }}
          >
            Total Price: ${totalPrice}
          </h2>

          <button
            onClick={() => navigate("/checkout")}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              backgroundColor: "#2d6a4f",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </>
    )}
  </div>

  <Footer />
</>

);
}

export default Cart;
