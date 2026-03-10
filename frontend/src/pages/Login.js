import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/api/auth/login', form);
      login(res.data.token, res.data.user);
      navigate(res.data.user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2 className="fw-bold text-center mb-1">Welcome Back 👋</h2>
        <p className="text-muted text-center mb-4">Login to continue to CampusVoice Portal</p>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email address" value={form.email}
              onChange={e => setForm({...form, email: e.target.value})} required />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" value={form.password}
              onChange={e => setForm({...form, password: e.target.value})} required />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div><input type="checkbox" id="rem" className="me-1" /><label htmlFor="rem" className="text-muted small">Remember me</label></div>
            <a href="#" className="small text-info text-decoration-none">Forgot Password?</a>
          </div>
          <button type="submit" className="btn btn-primary-custom" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Login'}
          </button>
        </form>
        <p className="text-center mt-3 mb-0 small">Don't have an account? <Link to="/register" className="text-info fw-semibold text-decoration-none">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
