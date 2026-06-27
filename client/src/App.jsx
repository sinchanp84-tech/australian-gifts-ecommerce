import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminOrders from "./pages/AdminOrders";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminUsers from "./pages/AdminUsers";
import AdminLogin from "./pages/AdminLogin";



import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";
import OrderProvider from "./context/OrderContext";
import ReviewProvider from "./context/ReviewContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";


function App() {
  return (
    <BrowserRouter>
     <ReviewProvider>
      <OrderProvider>
       <WishlistProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />}
/>
            <Route
              path="/product/:id"
              element={<ProductDetails />}
            />
            <Route
              path="/checkout"
              element={<Checkout />}
            />
            <Route
  path="/orders"
  element={<Orders />}
/>
<Route
  path="/admin"
  element={
    <AdminProtectedRoute>
  <AdminDashboard />
</AdminProtectedRoute>
  }
/>
<Route
  path="/admin/add-product"
  element={
    <AdminProtectedRoute>
      <AddProduct />
    </AdminProtectedRoute>
  }
/>
<Route
  path="/admin/edit-product/:id"
  element={
    <AdminProtectedRoute>
      <EditProduct />
    </AdminProtectedRoute>
  }
/>
<Route
  path="/admin/orders"
  element={
    <AdminProtectedRoute>
      <AdminOrders />
    </AdminProtectedRoute>
  }
/>
<Route
  path="/admin/users"
  element={
    <AdminProtectedRoute>
      <AdminUsers />
    </AdminProtectedRoute>
  }
/>
<Route
  path="/admin-login"
  element={<AdminLogin />}
/>
          </Routes>
        </CartProvider>
      </WishlistProvider>
      </OrderProvider>
      </ReviewProvider>
    </BrowserRouter>
  );
}

export default App;