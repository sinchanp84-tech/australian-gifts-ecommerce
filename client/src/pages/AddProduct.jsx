import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
  name: "",
  price: "",
  stock: 0,
  image: "",
  category: "",
  description: "",
});

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
  `${API_URL}/api/upload`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

      setProduct((prev) => ({
        ...prev,
        image: res.data.imageUrl,
      }));

      alert("Image Uploaded Successfully ✅");
    } catch (error) {
      console.log(error);
      alert("Image Upload Failed ❌");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
  `${API_URL}/api/products`,
  product
);

      alert("Product Added Successfully ✅");

      navigate("/admin");
    } catch (error) {
      console.log(error);
      alert("Error Adding Product ❌");
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "25px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit}>
         <input
    type="text"
    name="name"
    placeholder="Product Name"
    value={product.name}
    onChange={handleChange}
    required
    style={{
      width: "100%",
      padding: "12px",
      marginBottom: "12px",
    }}
  />
       <select
  name="category"
  value={product.category}
  onChange={handleChange}
  required
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
  }}
>
  <option value="">Select Category</option>
  <option value="Souvenirs">Souvenirs</option>
  <option value="Accessories">Accessories</option>
  <option value="Home Decor">Home Decor</option>
  <option value="Aboriginal Art">Aboriginal Art</option>
</select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
          }}
        />
        <input
  type="number"
  name="stock"
  placeholder="Stock Quantity"
  value={product.stock}
  onChange={handleChange}
  required
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
  }}
/>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
          }}
        />

        {product.image && (
          <div
            style={{
              marginBottom: "15px",
            }}
          >
            <h4>Image Preview</h4>

            <img
              src={product.image}
              alt="Preview"
              style={{
                width: "250px",
                borderRadius: "10px",
                border: "1px solid #ddd",
              }}
            />
          </div>
        )}


        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          rows="5"
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#2d6a4f",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;