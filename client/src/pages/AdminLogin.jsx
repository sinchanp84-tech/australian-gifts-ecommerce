import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function AdminLogin() {
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch( `${API_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem(
        "token",
        data.token
      );

      alert("Login Successful ✅");

      navigate("/admin");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
    alert("Login Failed ❌");
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
          width: "400px",
        }}
      >
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#2d6a4f",
            color: "white",
            border: "none",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;