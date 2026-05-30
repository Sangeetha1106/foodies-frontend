import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, User, Search, Menu as MenuIcon, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
    const { logout } = useAuth();
    const { cartItems } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
        onSearch(val);
    };

    const handleLogout = () => {
        logout(); // Clears user and token
        localStorage.removeItem('admin');
        navigate('/login');
        setIsMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="navbar glass">
            <div className="container nav-container">
                <Link to="/" className="logo" onClick={closeMobileMenu}>
                    Food<span>Dash</span>
                </Link>

                {token && (
                    <div className="search-bar">
                        <Search size={20} className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Search for food..." 
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                )}

                <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
                </button>

                <div className={`nav-links ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
                    {token ? (
                        <>
                            <Link to="/menu" onClick={closeMobileMenu}>Menu</Link>
                            <Link 
                                to="/cart" 
                                className="nav-icon-link cart-badge-container"
                                title="Cart"
                                onClick={closeMobileMenu}
                            >
                                <ShoppingCart size={20} />
                                <span>Cart</span>
                                {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
                            </Link>
                            <Link to="/orders" className="nav-icon-link" onClick={closeMobileMenu}>
                                <User size={20} />
                                <span>Orders</span>
                            </Link>
                            <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
                            <button onClick={handleLogout} className="logout-btn">
                                <LogOut size={20} /> <span className="mobile-only-text">Logout</span>
                            </button>
                        </>
                    ) : localStorage.getItem('admin') ? (
                        <>
                            <Link to="/admin/dashboard" className="btn btn-secondary" onClick={closeMobileMenu}>Admin Dashboard</Link>
                            <button onClick={handleLogout} className="logout-btn">
                                <LogOut size={20} /> <span className="mobile-only-text">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/menu" onClick={closeMobileMenu}>Menu</Link>
                            <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
                            <Link to="/login" className="btn btn-primary" onClick={closeMobileMenu}>Login</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
