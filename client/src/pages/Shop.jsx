import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

function Shop() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const location = useLocation();

  useEffect(() => {
   axios.get(`${API_URL}/api/products`)
  .then((res) => {
    console.log("API Response:", res.data);
    console.log("Total Products:", res.data.length);
    setProducts(res.data);
  })
  .catch((err) => {
    console.error(err);
  });
  }, []);
    

  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  // Sorting
  if (sortOption === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOption === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  if (sortOption === "a-z") {
    filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (sortOption === "z-a") {
    filteredProducts.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 20px",
          minHeight: "80vh",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "3rem",
            marginBottom: "10px",
          }}
        >
          Shop Products
        </h1>

        {selectedCategory && (
          <h3
            style={{
              textAlign: "center",
              color: "#2d6a4f",
              marginBottom: "30px",
              fontSize: "1.5rem",
            }}
          >
            Category: {selectedCategory}
          </h3>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: "1",
              minWidth: "300px",
              padding: "15px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          />

          <select
            value={sortOption}
            onChange={(e) =>
              setSortOption(e.target.value)
            }
            style={{
              padding: "12px 15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "18px",
              fontWeight: "600",
              minWidth: "220px",
              height: "50px",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            <option value="">Sort By</option>
            <option value="low-high">
              Price: Low → High
            </option>
            <option value="high-low">
              Price: High → Low
            </option>
            <option value="a-z">
              Name: A → Z
            </option>
            <option value="z-a">
              Name: Z → A
            </option>
          </select>
        </div>

        <p
          style={{
            color: "#666",
            fontSize: "18px",
            marginBottom: "35px",
          }}
        >
          Showing {filteredProducts.length} Products
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "35px",
            justifyContent: "center",
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
  key={product._id}
  id={product._id}
  name={product.name}
  price={product.price}
  image={product.image}
  stock={product.stock}
/>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "80px",
              }}
            >
              <h2 style={{ color: "#777" }}>
                No products found
              </h2>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Shop;