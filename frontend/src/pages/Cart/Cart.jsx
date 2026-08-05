import React, { useContext, useMemo, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount, url, clearFromCart } = useContext(StoreContext);
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoMessage, setPromoMessage] = useState("");

  const navigate = useNavigate();

  const items = useMemo(() => food_list.filter((f) => cartItems[f._id] > 0), [food_list, cartItems]);
  const subtotal = getTotalCartAmount();

  const deliveryFee = appliedPromo === "FREESHIP" ? 0 : (subtotal > 0 ? 2 : 0);
  const discount = (() => {
    if (!appliedPromo) return 0;
    if (appliedPromo === "SAVE10") return subtotal * 0.1;
    return 0;
  })();

  const total = Math.max(0, subtotal - discount + deliveryFee);

  const applyPromo = () => {
    const code = (promo || "").trim().toUpperCase();
    if (!code) return setPromoMessage("Enter a promo code");
    if (code === "SAVE10") {
      setAppliedPromo("SAVE10");
      setPromoMessage("Applied 10% discount");
    } else if (code === "FREESHIP") {
      setAppliedPromo("FREESHIP");
      setPromoMessage("Free shipping applied");
    } else {
      setAppliedPromo(null);
      setPromoMessage("Invalid promo code");
    }
  };

  const hasItems = items.length > 0;

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-item-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />

        {!hasItems && <div className="cart-empty">Your cart is empty.</div>}

        {items.map((item) => (
          <div key={item._id} className="cart-items-item">
            <div className="cart-item-media">
              <img src={url + "/images/" + item.image} alt="" />
            </div>
            <p className="cart-item-name">{item.name}</p>
            <p className="cart-item-price">${item.price.toFixed(2)}</p>
            <div className="cart-item-qty">
              <button onClick={() => removeFromCart(item._id)} className="qty-btn">-</button>
              <input readOnly value={cartItems[item._id]} />
              <button onClick={() => addToCart(item._id)} className="qty-btn">+</button>
            </div>
            <p className="cart-item-total">${(item.price * cartItems[item._id]).toFixed(2)}</p>
            <p className="cart-item-remove" onClick={() => clearFromCart(item._id)}>Remove</p>
          </div>
        ))}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="cart-total-details">
              <p>Discount</p>
              <p>-${discount.toFixed(2)}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details total-row">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
          <button disabled={!hasItems} onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input value={promo} onChange={(e) => setPromo(e.target.value)} type="text" placeholder="promo code" />
              <button onClick={applyPromo}>Apply</button>
            </div>
            {promoMessage && <p className="promo-message">{promoMessage}</p>}
            {appliedPromo && <p className="promo-applied">Applied: {appliedPromo}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
