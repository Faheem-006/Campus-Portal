import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const COLLEGES = ['DSEC', 'SRM', 'Anna University', 'VIT', 'Loyola College'];

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', studentId: '', college: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match');
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/register', form);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="auth-bg">
      <div className="auth-card" style={{maxWidth:'480px'}}>
        <h2 className="fw-bold text-center mb-1">Create Account ✨</h2>
        <p className="text-muted text-center mb-4">Join CampusVoice Portal and raise your voice</p>
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input className="form-control" placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          </div>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          </div>
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <input className="form-control" placeholder="Student ID (optional)" value={form.studentId} onChange={e => setForm({...form, studentId: e.target.value})} />
            </div>
            <div className="col-md-6">
              <select className="form-select" value={form.college} onChange={e => setForm({...form, college: e.target.value})}>
                <option value="">Select College</option>
                {COLLEGES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          </div>
          <div className="mb-4">
            <input type="password" className="form-control" placeholder="Confirm Password" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} required />
          </div>
          <button type="submit" className="btn btn-primary-custom" disabled={loading}>
            {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Create Account'}
          </button>
        </form>
        <p className="text-center mt-3 mb-0 small">Already have an account? <Link to="/login" className="text-info fw-semibold text-decoration-none">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
