import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const statusBadge = (status) => {
  if (status === 'Resolved') return <span className="badge bg-success">Resolved</span>;
  if (status === 'Under Review') return <span className="badge bg-warning text-dark">Under Review</span>;
  return <span className="badge bg-danger">Pending</span>;
};

const MyComplaints = () => {
  const { user, token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trackId, setTrackId] = useState('');
  const [tracked, setTracked] = useState(null);
  const [trackError, setTrackError] = useState('');

  useEffect(() => {
    if (user && token) {
      api.get('/api/complaints/my', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => setComplaints(r.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user, token]);

  const handleTrack = async e => {
    e.preventDefault();
    setTrackError('');
    setTracked(null);
    try {
      const res = await axios.get(`/api/complaints/track/${trackId}`);
      setTracked(res.data);
    } catch {
      setTrackError('Complaint not found. Please check the ID.');
    }
  };

  return (
    <>
      <div className="page-hero">
        <h1 className="fw-bold">My Complaints</h1>
        <p className="mt-2">Track and manage all your submitted complaints</p>
      </div>

      <div className="container my-5">
        {/* Track by ID */}
        <div className="card shadow-sm p-4 mb-4" style={{borderRadius:'16px'}}>
          <h5 className="fw-bold mb-3"><i className="bi bi-search me-2 text-info"></i>Track Complaint by ID</h5>
          <form onSubmit={handleTrack} className="d-flex gap-3">
            <input className="form-control" placeholder="Enter Complaint ID (e.g. CMP-2024-001)" value={trackId} onChange={e => setTrackId(e.target.value)} required />
            <button className="btn btn-info text-white px-4">Track</button>
          </form>
          {trackError && <p className="text-danger mt-2">{trackError}</p>}
          {tracked && (
            <div className="mt-3 p-3 bg-light rounded">
              <div className="row g-2">
                <div className="col-md-3"><strong>ID:</strong> {tracked.complaintId}</div>
                <div className="col-md-3"><strong>Category:</strong> {tracked.category}</div>
                <div className="col-md-3"><strong>Location:</strong> {tracked.location}</div>
                <div className="col-md-3"><strong>Status:</strong> {statusBadge(tracked.status)}</div>
                <div className="col-12"><strong>Description:</strong> {tracked.description}</div>
                {tracked.adminNotes && <div className="col-12"><strong>Admin Notes:</strong> {tracked.adminNotes}</div>}
              </div>
            </div>
          )}
        </div>

        {/* User complaints table */}
        {!user ? (
          <div className="text-center py-5">
            <i className="bi bi-lock fs-1 text-muted"></i>
            <h5 className="mt-3">Login to view your complaints</h5>
            <Link to="/login" className="btn btn-info text-white mt-3 px-4">Login</Link>
          </div>
        ) : loading ? (
          <div className="text-center py-5"><div className="spinner-border text-info"></div></div>
        ) : (
          <div className="card shadow-sm p-4" style={{borderRadius:'16px'}}>
            <h5 className="fw-bold mb-3">Your Complaint History</h5>
            {complaints.length === 0 ? (
              <div className="text-center py-4">
                <i className="bi bi-inbox fs-1 text-muted"></i>
                <p className="mt-2 text-muted">No complaints filed yet.</p>
                <Link to="/file-complaint" className="btn btn-info text-white">File Your First Complaint</Link>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Complaint ID</th><th>Date</th><th>Category</th><th>Location</th><th>Status</th><th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map(c => (
                      <tr key={c._id}>
                        <td><strong>{c.complaintId}</strong></td>
                        <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                        <td>{c.category}</td>
                        <td>{c.location}</td>
                        <td>{statusBadge(c.status)}</td>
                        <td style={{maxWidth:'200px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{c.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Status guide */}
        <div className="card shadow-sm p-4 mt-4" style={{borderRadius:'16px'}}>
          <h5 className="fw-bold mb-3">Status Guide</h5>
          <div className="d-flex flex-wrap gap-3">
            <div><span className="badge bg-danger me-2">Pending</span>Complaint received, awaiting review</div>
            <div><span className="badge bg-warning text-dark me-2">Under Review</span>Being investigated by authorities</div>
            <div><span className="badge bg-success me-2">Resolved</span>Issue addressed and closed</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyComplaints;
