function CategoryCard({ title, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "0 8px 20px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 4px 12px rgba(0,0,0,0.1)";
      }}
      style={{
        width: "220px",
        padding: "35px 20px",
        backgroundColor: "#fff",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          fontSize: "50px",
          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          fontSize: "20px",
          color: "#2d6a4f",
          margin: 0,
        }}
      >
        {title}
      </h3>
    </div>
  );
}

export default CategoryCard;