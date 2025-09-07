import { useState, useEffect } from 'react';
import { getItems } from '../api/items';
import { addToCart } from '../api/cart';

export default function ItemList() {
    const [items, setItems] = useState([]);
    const [filters, setFilters] = useState({ priceMin: '', priceMax: '', category: '' });

    const fetchItems = async () => {
        const filterParams = {};
        if (filters.priceMin) filterParams.priceMin = filters.priceMin;
        if (filters.priceMax) filterParams.priceMax = filters.priceMax;
        if (filters.category) filterParams.category = filters.category;

        const data = await getItems(filterParams);
        setItems(data);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleAdd = async (itemId) => {
        try {
            await addToCart(itemId);
            alert('Item added to cart!');
        } catch {
            alert('Please login to add items to cart.');
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilter = () => {
        fetchItems();
    };

    return (
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Explore Our Items</h2>

            <div className="flex flex-wrap gap-4 justify-center mb-8 bg-white p-4 rounded shadow-sm">
                <div className="flex flex-col">
                    <label className="mb-1 text-sm text-gray-600">Min Price</label>
                    <input
                        className="p-2 border border-gray-300 rounded w-40 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        type="number"
                        name="priceMin"
                        placeholder="Min Price"
                        value={filters.priceMin}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-sm text-gray-600">Max Price</label>
                    <input
                        className="p-2 border border-gray-300 rounded w-40 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        type="number"
                        name="priceMax"
                        placeholder="Max Price"
                        value={filters.priceMax}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-sm text-gray-600">Category</label>
                    <input
                        className="p-2 border border-gray-300 rounded w-40 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={filters.category}
                        onChange={handleFilterChange}
                    />
                </div>
                <div className="flex items-end">
                    <button
                        onClick={applyFilter}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map(item => (
                    <div
                        key={item._id}
                        className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white p-5 flex flex-col"
                    >
                        <h3 className="font-semibold text-xl text-gray-800 mb-3">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        <p className="text-sm text-gray-500 mb-1">Category: <span className="text-gray-700">{item.category}</span></p>
                        <p className="text-lg font-bold text-green-600 mb-4">${item.price}</p>
                        <button
                            onClick={() => handleAdd(item._id)}
                            className="mt-auto bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors shadow-sm"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
