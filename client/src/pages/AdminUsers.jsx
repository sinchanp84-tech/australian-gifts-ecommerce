import { useEffect, useState } from "react";
import { API_URL } from "../config";
import AdminSidebar from "../components/AdminSidebar";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
   fetch(`${API_URL}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <AdminSidebar />

      <div
        style={{
          marginLeft: "240px",
          padding: "20px",
          maxWidth: "1200px",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>
          👥 Admin Users
        </h1>

        {/* Total Users Card */}
        <div
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
            marginBottom: "20px",
          }}
        >
          <h3>Total Users</h3>
          <h2>{users.length}</h2>
        </div>

        {/* Search User */}
        <input
          type="text"
          placeholder="🔍 Search User..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        {/* Users Table */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#2d6a4f",
                color: "white",
              }}
            >
              <th
                style={{
                  padding: "12px",
                }}
              >
                Name
              </th>

              <th
                style={{
                  padding: "12px",
                }}
              >
                Email
              </th>
            </tr>
          </thead>

          <tbody>
            {users
              .filter((user) =>
                user.name
                  .toLowerCase()
                  .includes(
                    search.toLowerCase()
                  )
              )
              .map((user) => (
                <tr
                  key={user._id}
                  style={{
                    borderBottom:
                      "1px solid #ddd",
                  }}
                >
                  <td
                    style={{
                      padding: "12px",
                    }}
                  >
                    {user.name}
                  </td>

                  <td
                    style={{
                      padding: "12px",
                    }}
                  >
                    {user.email}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminUsers;