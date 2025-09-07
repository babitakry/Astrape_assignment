import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import ItemList from './components/ItemList';
import Cart from './components/Cart';
import Home from './components/Home';  // Import Home component

export default function App() {
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <Router>
            <nav className="bg-gray-800 text-white p-4 flex gap-4 items-center">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/items" className="hover:underline">Items</Link>
                <Link to="/cart" className="hover:underline">Cart</Link>
                {!isLoggedIn && <>
                    <Link to="/signup" className="hover:underline">Signup</Link>
                    <Link to="/login" className="hover:underline">Login</Link>
                </>}
                {isLoggedIn && (
                    <button onClick={handleLogout} className="ml-auto bg-red-600 px-3 py-1 rounded hover:bg-red-700">Logout</button>
                )}
            </nav>
            <div className="container mx-auto p-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/items" element={<ItemList />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </div>
        </Router>
    );
}
