import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#2d6a4f",
        color: "white",
        marginTop: "60px",
        padding: "50px 20px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        {/* Company */}
        <div>
          <h2>Australian Gifts</h2>
          <p>
            Authentic Australian souvenirs,
            home decor and accessories.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3>Quick Links</h3>

          <p>
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Home
            </Link>
          </p>

          <p>
            <Link
              to="/shop"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Shop
            </Link>
          </p>

          <p>
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h3>Customer Service</h3>

          <p>Contact Us</p>
          <p>FAQ</p>
          <p>Shipping Information</p>
        </div>

        {/* Legal */}
        <div>
          <h3>Legal</h3>

          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Refund Policy</p>
        </div>
      </div>

      <hr
        style={{
          margin: "30px 0",
          borderColor: "rgba(255,255,255,0.2)",
        }}
      />

      <div
        style={{
          textAlign: "center",
        }}
      >
        © 2026 Australian Gifts & Souvenirs | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;