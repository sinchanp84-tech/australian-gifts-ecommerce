const express = require("express");
console.log(__filename);
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");
const auth = require("./middleware/auth");
const admin = require("./middleware/admin");
const app = express();

app.use(cors());
app.use(express.json());
app.get("/hello", (req, res) => {
  res.send("HELLO WORKING");
});

// =========================
// Upload Folder Public
// =========================

app.use("/uploads", express.static("uploads"));

// =========================
// Multer Storage
// =========================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// =========================
// Upload Route
// =========================

app.post(
  "/api/upload",
  auth,
  admin,
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    res.json({
      imageUrl: `http://localhost:5001/uploads/${req.file.filename}`,
    });
  }
);

// =========================
// MongoDB Connection
// =========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
  })
  .catch((err) => {
    console.log("MongoDB Error ❌", err);
  });

// =========================
// Home Route
// =========================

app.get("/", (req, res) => {
  res.send("Australian Gifts API Running...");
});

// =========================
// Product Routes
// =========================

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/api/products", auth, admin, async (req, res) => {
  try {
    const product = new Product(req.body);

    const savedProduct =
      await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.put("/api/products/:id", auth, admin, async (req, res) => {
  try {
    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.delete("/api/products/:id", auth, admin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// 👇 PASTE THE NEW ROUTE HERE
app.put("/api/products/:id/stock", auth, async (req, res) => {
  try {
    const { quantity } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        message: "Not enough stock",
      });
    }

    product.stock -= quantity;

    await product.save();

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================
// User Routes
// =========================

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } =
      req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message:
        "Registration Successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.trim(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.get("/api/users", auth, admin, async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// =========================
// Order Routes
// =========================
console.log("REGISTERING ORDER ROUTES");
console.log("Before POST");
app.post("/api/orders", auth, async (req, res) => {
  console.log("POST ROUTE REGISTERED");
  try {
    const order = new Order(req.body);

    const savedOrder =
      await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.get("/api/orders", auth, admin, async (req, res) => {
  console.log("GET ROUTE REGISTERED");
   console.log("GET /api/orders HIT");
  try {
    const orders = await Order.find();

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.get("/api/orders/:email", auth, async (req, res) => {
  try {
    // Get logged-in user
    const loggedInUser = await User.findById(req.user.id);

    // Allow only admin OR the owner of the orders
    if (
      loggedInUser.role !== "admin" &&
      loggedInUser.email !== req.params.email
    ) {
      return res.status(403).json({
        message: "Access Denied",
      });
    }

    const orders = await Order.find({
      email: req.params.email,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.put("/api/orders/:id", auth, admin, async (req, res) => {
  try {
    const updatedOrder =
      await Order.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        {
          new: true,
        }
      );

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.post("/api/create-order", async (req, res) => {
  console.log("CREATE ORDER ROUTE HIT");
  console.log(req.body);

  try {
    const options = {
  amount: Math.round(req.body.amount * 100),
  currency: "INR",
  receipt: "receipt_order",
};

    const order = await razorpay.orders.create(options);

    console.log("ORDER CREATED:", order);

    res.json(order);
  } catch (error) {
    console.log("RAZORPAY ERROR:", error);

    res.status(500).send("Error creating order");
  }
});
// =========================
// Server
// =========================
app.get("/check-order-route", (req, res) => {
  res.send("CREATE ORDER ROUTE EXISTS");
});
app.get("/test-upload", (req, res) => {
  res.send("Upload Route Exists ✅");
});
app.get("/mytest123", (req, res) => {
  res.send("THIS IS MY ECOMMERCE SERVER");
});
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});