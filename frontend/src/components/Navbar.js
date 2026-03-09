import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark py-3">
      <div className="container-fluid ms-3">
        <Link className="navbar-brand fw-bold" to="/">
          <span className="text-info">CampusVoice</span> Portal
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMain">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link text-white" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/about">About Us</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/file-complaint">File Complaint</Link></li>
            {user && <li className="nav-item"><Link className="nav-link text-white" to="/my-complaints">My Complaints</Link></li>}
            <li className="nav-item"><Link className="nav-link text-white" to="/faq">FAQ</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/contact">Contact Us</Link></li>
            {user?.role === 'admin' && <li className="nav-item"><Link className="nav-link text-warning" to="/admin">Admin</Link></li>}
          </ul>
          <div className="d-flex me-3 gap-2">
            {user ? (
              <>
                <span className="btn btn-outline-info disabled">Hi, {user.name.split(' ')[0]}</span>
                <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-info">Log In</Link>
                <Link to="/register" className="btn btn-info text-white">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
