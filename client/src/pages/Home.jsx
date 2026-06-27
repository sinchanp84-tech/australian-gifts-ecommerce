import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import { API_URL } from "../config";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

import banner from "../assets/images/banner.jpg";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
   fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "85vh",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
        ></div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            color: "white",
            maxWidth: "800px",
            padding: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Australian Gifts & Souvenirs
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 3vw, 1.3rem)",
              marginBottom: "30px",
              lineHeight: "1.6",
            }}
          >
            Discover authentic Australian souvenirs,
            Aboriginal art, home décor and accessories
            inspired by Australia's rich culture.
          </p>

          <button
            onClick={() => navigate("/shop")}
            style={{
              padding: "14px 35px",
              backgroundColor: "#2d6a4f",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Categories */}
      <section
        style={{
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "40px",
          }}
        >
          Shop by Category
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          <CategoryCard
            title="Souvenirs"
            icon="🪃"
            onClick={() =>
              navigate("/shop?category=Souvenirs")
            }
          />

          <CategoryCard
            title="Home Decor"
            icon="🏠"
            onClick={() =>
              navigate("/shop?category=Home Decor")
            }
          />

          <CategoryCard
            title="Aboriginal Art"
            icon="🎨"
            onClick={() =>
              navigate("/shop?category=Aboriginal Art")
            }
          />

          <CategoryCard
            title="Accessories"
            icon="👜"
            onClick={() =>
              navigate("/shop?category=Accessories")
            }
          />
        </div>
      </section>

      {/* Featured Products */}
      <section
        style={{
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "40px",
          }}
        >
          Featured Products
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          {products.slice(0, 3).map((product) => (
            <ProductCard
  key={product._id}
  id={product._id}
  name={product.name}
  price={product.price}
  image={product.image}
  stock={product.stock}
/>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section
        style={{
          padding: "60px 20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "40px",
          }}
        >
          Best Sellers
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          {products.slice(0, 4).map((product) => (
            <ProductCard
  key={product._id}
  id={product._id}
  name={product.name}
  price={product.price}
  image={product.image}
  stock={product.stock}
/>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section
        style={{
          backgroundColor: "#f8f8f8",
          padding: "80px 20px",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>
          Join Our Newsletter
        </h2>

        <p
          style={{
            marginBottom: "25px",
            color: "#666",
          }}
        >
          Get updates on new arrivals, discounts
          and Australian souvenirs.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          style={{
            padding: "15px",
            width: "100%",
            maxWidth: "450px",
            display: "block",
            margin: "0 auto 15px auto",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />

        <button
          style={{
            padding: "15px 25px",
            backgroundColor: "#2d6a4f",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Subscribe
        </button>
      </section>

      <Footer />
    </>
  );
}

export default Home;