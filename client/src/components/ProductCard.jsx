import { Link } from "react-router-dom";
import { useState } from "react";

function ProductCard({
  id,
  name,
  price,
  image,
  stock,
}) {
  const [hovered, setHovered] = useState(false);


  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "320px",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center",
        cursor: "pointer",
        transform: hovered ? "translateY(-10px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 10px 25px rgba(0,0,0,0.2)"
          : "0 4px 12px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      }}
    >

      <img
        src={image}
        alt={name}
        onError={(e) => {
          console.log("Image failed:", image);
          e.target.src = "/images/kangaroo_plush.jpg";
        }}
        style={{
          width: "100%",
          height: "260px",
          objectFit: "cover",
          borderRadius: "10px",
          display: "block",
        }}
      />

      <h3
        style={{
          marginTop: "15px",
          fontSize: "24px",
          fontWeight: "600",
          color: "#222",
        }}
      >
        {name}
      </h3>

      <p
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          color: "#2d6a4f",
          margin: "10px 0",
        }}
      >
        ${price}
      </p>
      <div
  style={{
    marginBottom: "15px",
    fontWeight: "bold",
  }}
>
  {stock === 0 ? (
    <span style={{ color: "red" }}>
      ❌ Out of Stock
    </span>
  ) : stock <= 5 ? (
    <span style={{ color: "orange" }}>
      ⚠️ Only {stock} left
    </span>
  ) : (
    <span style={{ color: "green" }}>
      ✅ In Stock ({stock})
    </span>
  )}
</div>

      <Link to={`/product/${id}`}>
        <button
          style={{
            padding: "12px 25px",
            backgroundColor: "#2d6a4f",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: "600",
          }}
        >
          View Details
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;