import {
  createContext,
  useState,
   useEffect,
} from "react";

export const ReviewContext =
  createContext();

function ReviewProvider({ children }) {
  const [reviews, setReviews] =
  useState(() => {
    const savedReviews =
      localStorage.getItem("reviews");

    return savedReviews
      ? JSON.parse(savedReviews)
      : [];
  });
  useEffect(() => {
  localStorage.setItem(
    "reviews",
    JSON.stringify(reviews)
  );
}, [reviews]);

  const addReview = (
    productId,
    name,
    comment,
    rating
  ) => {
    setReviews([
      ...reviews,
      {
        productId,
        name,
        comment,
        rating,
      },
    ]);
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
}

export default ReviewProvider;