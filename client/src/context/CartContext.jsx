import {
  createContext,
  useState,
  useEffect,
} from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] =
    useState(() => {
      const savedCart =
        localStorage.getItem("cart");

      return savedCart
        ? JSON.parse(savedCart)
        : [];
    });

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(
  (item) => item.id === (product.id || product._id)
);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === (product.id || product._id)
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
id: product._id,
quantity: 1,
        },
      ]);
    }
  };

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  const removeItem = (id) => {
    setCartItems(
      cartItems.filter(
        (item) => item.id !== id
      )
    );
  };
  const clearCart = () => {
  setCartItems([]);
};

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;