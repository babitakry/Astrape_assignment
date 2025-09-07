import { useState, useEffect } from 'react';
import { getCart, removeFromCart } from '../api/cart';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);

    const fetchCart = async () => {
        try {
            const data = await getCart();
            setCartItems(data);
        } catch {
            alert('Please login to view your cart.');
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleRemove = async (itemId) => {
        try {
            await removeFromCart(itemId);
            fetchCart();
        } catch {
            alert('Error removing item.');
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
            ) : (
                <div className="space-y-6">
                    {cartItems.map(cartItem => (
                        <div
                            key={cartItem.item._id}
                            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col md:flex-row justify-between items-center hover:shadow-md transition-shadow"
                        >
                            <div className="mb-4 md:mb-0 text-center md:text-left">
                                <h3 className="font-semibold text-xl text-gray-800">{cartItem.item.name}</h3>
                                <p className="text-gray-600 text-sm mt-1">Price: <span className="text-green-600">${cartItem.item.price}</span></p>
                                <p className="text-gray-600 text-sm mt-1">Quantity: {cartItem.quantity}</p>
                            </div>
                            <button
                                onClick={() => handleRemove(cartItem.item._id)}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors shadow-sm"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
