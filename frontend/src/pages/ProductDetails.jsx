import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (!product) return <div className="text-center mt-10">Product not found</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-700 p-6 rounded shadow transition-colors duration-300">
                <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/2 object-cover rounded" />
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold mb-4 dark:text-white">{product.name}</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{product.description}</p>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6">${product.price}</div>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
