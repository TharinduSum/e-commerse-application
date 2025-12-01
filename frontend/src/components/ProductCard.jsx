import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <Link to={`/product/${product.id}`}>
                    <h3 className="text-xl font-semibold mb-2 hover:text-blue-600">{product.name}</h3>
                </Link>
                <p className="text-gray-600 mb-4 h-12 overflow-hidden">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">${product.price}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
