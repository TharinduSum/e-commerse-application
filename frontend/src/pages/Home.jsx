import React from 'react';
import ProductList from '../components/ProductList';

const Home = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Featured Products</h1>
            <ProductList />
        </div>
    );
};

export default Home;
