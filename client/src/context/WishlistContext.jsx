import { createContext, useState,  useEffect,} from "react";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
 const [wishlistItems, setWishlistItems] =
  useState(() => {
    const savedWishlist =
      localStorage.getItem(
        "wishlistItems"
      );

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  });
  useEffect(() => {
  localStorage.setItem(
    "wishlistItems",
    JSON.stringify(wishlistItems)
  );
}, [wishlistItems]);

  const addToWishlist = (product) => {
    const exists = wishlistItems.find(
      (item) => item.id === product.id
    );

    if (!exists) {
     setWishlistItems((prev) => [
  ...prev,
  product,
]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(
      wishlistItems.filter(
        (item) => item.id !== id
      )
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;