import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
  name: "",
  price: "",
  image: "",
  category: "",
  description: "",
  stock: 0,
});

    useEffect(() => {
  fetch(`${API_URL}/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => setProduct(data))
    .catch((err) => console.log(err));
}, [id]);
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch(
  `${API_URL}/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      alert("Product Updated Successfully ✅");

      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          color: "#2d6a4f",
        }}
      >
        Edit Product
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <input
  type="number"
  name="stock"
  placeholder="Stock Quantity"
  value={product.stock}
  onChange={handleChange}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  }}
/>

        <input
          type="text"
          name="image"
          placeholder="Image Path"
          value={product.image}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {product.image && (
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
              }}
            >
              Image Preview:
            </p>

            <img
              src={product.image}
              alt="Preview"
              style={{
                width: "220px",
                height: "220px",
                objectFit: "cover",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            />
          </div>
        )}

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          rows="5"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#2d6a4f",
            color: "white",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;