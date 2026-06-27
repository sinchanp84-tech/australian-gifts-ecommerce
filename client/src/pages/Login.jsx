import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/login`,{
        method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "token",
        data.token
      );

      alert("Login Successful ✅");

      navigate("/");
      window.location.reload();

    } catch (error) {
      console.log(error);
      alert("Login Failed ❌");
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
        onSubmit={handleLogin}
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "400px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#2d6a4f",
          }}
        >
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
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
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;