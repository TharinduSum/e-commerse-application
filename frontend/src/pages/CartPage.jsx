import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../services/api';
import { Trash2 } from 'lucide-react';

const CartPage = () => {
    const { cart, removeFromCart, clearCart, total } = useCart();
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleCheckout = async (e) => {
        e.preventDefault();
        const orderItems = cart.map(item => ({
            product: { id: item.id },
            quantity: item.quantity,
            price: item.price
        }));

        const order = {
            customerName,
            customerEmail,
            totalAmount: total,
            items: orderItems
        };

        try {
            await placeOrder(order);
            setOrderPlaced(true);
            clearCart();
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order.");
        }
    };

    if (orderPlaced) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-2xl font-bold text-green-600">Order Placed Successfully!</h2>
                <p className="mt-4">Thank you for your purchase.</p>
            </div>
        );
    }

    if (cart.length === 0) {
        return <div className="text-center mt-10 text-xl">Your cart is empty.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
                            <div className="flex items-center space-x-4">
                                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">${item.price} x {item.quantity}</p>
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    <div className="text-right text-xl font-bold mt-4">
                        Total: ${total.toFixed(2)}
                    </div>
                </div>

                <div className="bg-white p-6 rounded shadow h-fit">
                    <h3 className="text-xl font-bold mb-4">Checkout</h3>
                    <form onSubmit={handleCheckout} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                required
                                className="w-full border p-2 rounded"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full border p-2 rounded"
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                        >
                            Place Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
