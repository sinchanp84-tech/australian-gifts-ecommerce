import {
  createContext,
  useState,
  useEffect,
} from "react";

export const OrderContext = createContext();

function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const savedOrders =
      localStorage.getItem("orders");

    return savedOrders
      ? JSON.parse(savedOrders)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  const addOrder = (order) => {
    setOrders((prev) => [
      ...prev,
      {
        id: Date.now(),
        date:
          new Date().toLocaleDateString(),
        status: "Completed",
        ...order,
      },
    ]);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;