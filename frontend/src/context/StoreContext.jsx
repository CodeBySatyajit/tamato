import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const url = "http://localhost:4000";

  const [token, setToken] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!token) return;

    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
  };
  const removeFromCart = async (itemId) => {
    if (!token) return;

    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));

    await axios.post(
      url + "/api/cart/remove",
      { itemId },
      { headers: { token } },
    );
  };

  const clearFromCart = async (itemId) => {
    if (!token) return;

    const count = cartItems[itemId] || 0;
    if (count <= 0) return;

    // optimistic update
    setCartItems((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });

    // inform backend by calling remove endpoint `count` times
    try {
      for (let i = 0; i < count; i++) {
        // best-effort; don't await sequentially to speed up
        await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
      }
    } catch (e) {
      console.error("clearFromCart error", e);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (tokenValue) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token: tokenValue } },
    );

    if (response.data.success) {
      setCartItems(response.data.cartData || {});
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    setCartItems,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    showLogin,
    setShowLogin,
    clearFromCart,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
