import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { API_URL } from "../config";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { ReviewContext } from "../context/ReviewContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
const [products, setProducts] = useState([]);

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } =
    useContext(WishlistContext);
  const { reviews, addReview } =
    useContext(ReviewContext);

  const [quantity, setQuantity] =
    useState(1);

  const [reviewName, setReviewName] =
    useState("");

  const [reviewComment, setReviewComment] =
    useState("");

    const [reviewRating, setReviewRating] =
  useState(5);

  useEffect(() => {
 fetch(`${API_URL}/api/products`)
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);

      const foundProduct = data.find(
        (item) => item._id === id
      );

      setProduct(foundProduct);
    })
    .catch((err) => console.log(err));
}, [id]);

  if (!product) {
  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "100px",
          textAlign: "center",
        }}
      >
        <h1>Loading Product...</h1>
      </div>
      <Footer />
    </>
  );
}
  const relatedProducts = products
  .filter(
    (item) =>
      item &&
      product &&
      item.category === product.category &&
      item._id !== product._id
  )
  .slice(0, 3);

const allReviews = [
  ...(product.reviews || []),
  ...(reviews[product.id] || []),
];

const handleAddToCart = () => {
  if (product.stock === 0) {
    alert("Product is out of stock!");
    return;
  }

  if (quantity > product.stock) {
    alert(`Only ${product.stock} item(s) available.`);
    return;
  }

  for (let i = 0; i < quantity; i++) {
  addToCart({
    ...product,
    id: product._id,
  });
  }

  alert(`${quantity} ${product.name} added to cart!`);
};
  const handleWishlist = () => {
    addToWishlist(product);

    alert(
  `${product.name} added to wishlist ❤️`
);
  };

  const handleReviewSubmit = () => {
    if (
      !reviewName.trim() ||
      !reviewComment.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

   addReview(
  product._id,
  reviewName,
  reviewComment,
  reviewRating
);

    setReviewName("");
setReviewComment("");
setReviewRating(5);

    alert(
      "Review added successfully ⭐"
    );
  };

  return (
    <>
      <Navbar />

      <section
        style={{
          maxWidth: "1300px",
          margin: "60px auto",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "60px",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "500px",
              maxWidth: "100%",
              height: "500px",
              objectFit: "cover",
              borderRadius: "15px",
              boxShadow:
                "0 5px 20px rgba(0,0,0,0.15)",
            }}
          />

          <div
            style={{
              maxWidth: "550px",
            }}
          >
            <h1
              style={{
                fontSize: "40px",
                marginBottom: "15px",
              }}
            >
              {product.name}
            </h1>

            <div
              style={{
                color: "#ffc107",
                fontSize: "22px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              ⭐ {product.rating || 4.5} / 5
            </div>

            <h2
              style={{
                color: "#2d6a4f",
                marginBottom: "20px",
              }}
            >
              ${product.price}
            </h2>
            <div
  style={{
    marginBottom: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  }}
>
  {product.stock === 0 ? (
    <span style={{ color: "red" }}>
      ❌ Out of Stock
    </span>
  ) : product.stock <= 5 ? (
    <span style={{ color: "orange" }}>
      ⚠️ Only {product.stock} left
    </span>
  ) : (
    <span style={{ color: "green" }}>
      ✅ In Stock ({product.stock})
    </span>
  )}
</div>

            <p
              style={{
                lineHeight: "1.8",
                color: "#555",
                marginBottom: "20px",
              }}
            >
              {product.description}
            </p>

            <p
              style={{
                color: "#2d6a4f",
                fontWeight: "bold",
                marginBottom: "25px",
              }}
            >
              Category: {product.category}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginBottom: "25px",
              }}
            >
              <button
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity - 1)
                }
              >
                -
              </button>

              <h3>{quantity}</h3>

              <button
                onClick={() =>
                  setQuantity(quantity + 1)
                }
              >
                +
              </button>
            </div>

            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <button
  onClick={handleAddToCart}
  disabled={product.stock === 0}
  style={{
    padding: "15px 35px",
    backgroundColor:
      product.stock === 0
        ? "#999"
        : "#2d6a4f",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor:
      product.stock === 0
        ? "not-allowed"
        : "pointer",
  }}
>
                {product.stock === 0
  ? "Out of Stock"
  : "Add To Cart"}
              </button>

              <button
                onClick={handleWishlist}
                style={{
                  padding: "15px 35px",
                  backgroundColor: "#ff4d6d",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                ❤️ Wishlist
              </button>
            </div>

            <div
              style={{
                marginTop: "35px",
                padding: "20px",
                backgroundColor: "#f8f8f8",
                borderRadius: "10px",
              }}
            >
              <h3>Product Specifications</h3>

              {product.specifications ? (
                product.specifications.map(
                  (spec, index) => (
                    <p key={index}>
                      ✔️ {spec}
                    </p>
                  )
                )
              ) : (
                <>
                  <p>
                    ✔️ Material: Premium Quality
                  </p>
                  <p>
                    ✔️ Origin: Australia
                  </p>
                  <p>
                    ✔️ Category:
                    {" "}
                    {product.category}
                  </p>
                  <p>
                    ✔️ Gift Ready Packaging
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Write Review */}
        <div
          style={{
            maxWidth: "800px",
            margin: "60px auto",
            padding: "25px",
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              color: "#2d6a4f",
              marginBottom: "20px",
            }}
          >
            Write a Review
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            value={reviewName}
            onChange={(e) =>
              setReviewName(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          <select
  value={reviewRating}
  onChange={(e) =>
    setReviewRating(Number(e.target.value))
  }
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  }}
>
  <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
  <option value={4}>⭐⭐⭐⭐ (4)</option>
  <option value={3}>⭐⭐⭐ (3)</option>
  <option value={2}>⭐⭐ (2)</option>
  <option value={1}>⭐ (1)</option>
  </select>

          <textarea
            rows="4"
            placeholder="Write your review..."
            value={reviewComment}
            onChange={(e) =>
              setReviewComment(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={
              handleReviewSubmit
            }
            style={{
              backgroundColor: "#2d6a4f",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Submit Review
          </button>
        </div>

        {/* Customer Reviews */}
        <div
          style={{
            marginTop: "60px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "30px",
              color: "#2d6a4f",
            }}
          >
            ⭐ Customer Reviews
          </h2>

          {allReviews.length > 0 ? (
            allReviews.map(
              (review, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor:
                      "#fff",
                    padding: "20px",
                    borderRadius:
                      "12px",
                    marginBottom:
                      "15px",
                    boxShadow:
                      "0 2px 10px rgba(0,0,0,0.08)",
                    maxWidth:
                      "800px",
                    margin:
                      "0 auto 15px auto",
                  }}
                >
                  <h4
  style={{
    color: "#2d6a4f",
  }}
>
  {"⭐".repeat(review.rating || 5)}
  {" "}
  {review.name}
</h4>

                  <p>
                    {review.comment}
                  </p>
                </div>
              )
            )
          ) : (
            <div
              style={{
                textAlign:
                  "center",
                backgroundColor:
                  "#fff",
                padding: "20px",
                borderRadius:
                  "12px",
              }}
            >
              No reviews yet.
            </div>
          )}
        </div>

        {/* Related Products */}
        <div
          style={{
            marginTop: "80px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            Related Products
          </h2>

          <div
            style={{
              display: "flex",
              justifyContent:
                "center",
              gap: "30px",
              flexWrap: "wrap",
            }}
          >
            {relatedProducts.map((item) => (
  <ProductCard
    key={item._id}
    id={item._id}
    name={item.name}
    price={item.price}
    image={item.image}
  />
))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProductDetails;