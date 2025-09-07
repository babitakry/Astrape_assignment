import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center bg-gray-50 rounded-lg shadow-sm p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Our Store!</h1>
            <p className="text-gray-600 mb-8 text-lg">Browse our items and manage your cart easily.</p>
            <div className="flex gap-4">
                <Link to="/items" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors shadow-sm">
                    Browse Items
                </Link>
                <Link to="/cart" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-colors shadow-sm">
                    View Cart
                </Link>
            </div>
        </div>
    );
}
