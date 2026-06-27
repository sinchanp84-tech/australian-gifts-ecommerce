import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleRegister = async (e) => {
  e.preventDefault();

  if (
    !formData.name ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    alert("Please fill all fields");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert("Registration Successful ✅");
    navigate("/login");
  } catch (error) {
    console.error(error);
    alert("Registration Failed ❌");
  }

  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          width: "450px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2d6a4f",
            marginBottom: "25px",
          }}
        >
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2d6a4f",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "15px",
};

export default Register;