import React from "react";
import "./Header.css";

const Header = () => {
  const handleViewMenu = () => {
    const el = document.getElementById("explore-menu");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button onClick={handleViewMenu}>
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
