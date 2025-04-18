import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    };
    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.id !== itemId));
    };
    return (_jsxs("div", { className: "cart", children: [_jsx("h2", { children: "Carrito de Compras" }), cartItems.length > 0 ? (_jsx("ul", { children: cartItems.map(item => (_jsxs("li", { children: [item.name, " - $", item.price, _jsx("button", { onClick: () => removeFromCart(item.id), children: "Eliminar" })] }, item.id))) })) : (_jsx("p", { children: "El carrito est\u00E1 vac\u00EDo" }))] }));
};
export default Cart;
