import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { cart } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">ShopMVP</Link>
                <div className="flex items-center space-x-6">
                    <Link to="/cart" className="flex items-center space-x-2 hover:text-blue-200">
                        <div className="relative">
                            <ShoppingCart size={24} />
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </div>
                        <span>Cart</span>
                    </Link>

                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                                <User size={20} />
                                <span>{user.fullName}</span>
                            </span>
                            <button onClick={handleLogout} className="flex items-center space-x-1 hover:text-red-200">
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="hover:text-blue-200">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
