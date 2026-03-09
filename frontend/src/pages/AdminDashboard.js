import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const statusBadge = s => {
  if (s === 'Resolved') return <span className="badge bg-success">{s}</span>;
  if (s === 'Under Review') return <span className="badge bg-warning text-dark">{s}</span>;
  return <span className="badge bg-danger">{s}</span>;
};

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({});
  const [activeTab, setActiveTab] = useState('complaints');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/'); return; }
    fetchAll();
  }, [user]);

  const fetchAll = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const [c, co, s] = await Promise.all([
        axios.get('/api/admin/complaints', { headers }),
        axios.get('/api/admin/contacts', { headers }),
        axios.get('/api/admin/stats', { headers }),
      ]);
      setComplaints(c.data);
      setContacts(co.data);
      setStats(s.data);
    } catch {}
    setLoading(false);
  };

  const updateStatus = async (id, current) => {
    const { value } = await Swal.fire({
      title: 'Update Status',
      input: 'select',
      inputOptions: { 'Pending': 'Pending', 'Under Review': 'Under Review', 'Resolved': 'Resolved' },
      inputValue: current,
      showCancelButton: true,
      inputLabel: 'Select new status',
    });
    if (!value) return;
    const { value: notes } = await Swal.fire({ title: 'Admin Notes (optional)', input: 'textarea', showCancelButton: true });
    try {
      await axios.put(`/api/admin/complaints/${id}`, { status: value, adminNotes: notes || '' }, { headers: { Authorization: `Bearer ${token}` } });
      Swal.fire({ icon: 'success', title: 'Status Updated', timer: 1500, showConfirmButton: false });
      fetchAll();
    } catch {}
  };

  const filtered = filter === 'All' ? complaints : complaints.filter(c => c.status === filter);

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-info"></div></div>;

  return (
    <div className="container-fluid p-0">
      <div className="d-flex">
        {/* Sidebar */}
        <div className="admin-sidebar p-4 text-white" style={{minHeight:'100vh', minWidth:'220px'}}>
          <h5 className="fw-bold mb-4"><span className="text-info">Campus</span>Voice</h5>
          {['complaints','contacts','stats'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className={`btn w-100 text-start mb-2 ${activeTab === t ? 'btn-info' : 'btn-outline-light'}`}>
              <i className={`bi bi-${t === 'complaints' ? 'file-text' : t === 'contacts' ? 'envelope' : 'bar-chart'} me-2`}></i>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Main */}
        <div className="flex-grow-1 p-4">
          <h4 className="fw-bold mb-4">Admin Dashboard</h4>

          {activeTab === 'stats' && (
            <div className="row g-4">
              {[
                { label: 'Total Complaints', val: stats.total, icon: 'bi-file-text', color: '#2b5876' },
                { label: 'Resolved', val: stats.resolved, icon: 'bi-check-circle', color: '#198754' },
                { label: 'Under Review', val: stats.underReview, icon: 'bi-clock', color: '#ffc107' },
                { label: 'Pending', val: stats.pending, icon: 'bi-hourglass', color: '#dc3545' },
                { label: 'Students', val: stats.users, icon: 'bi-people', color: '#4e4376' },
                { label: 'Messages', val: stats.contacts, icon: 'bi-envelope', color: '#0dcaf0' },
              ].map((s, i) => (
                <div className="col-6 col-md-4 col-lg-2" key={i}>
                  <div className="card text-center p-3 shadow-sm" style={{borderRadius:'12px', borderTop:`4px solid ${s.color}`}}>
                    <i className={`bi ${s.icon} fs-3 mb-2`} style={{color: s.color}}></i>
                    <h3 className="fw-bold mb-0">{s.val}</h3>
                    <small className="text-muted">{s.label}</small>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'complaints' && (
            <>
              <div className="d-flex gap-2 mb-3 flex-wrap">
                {['All', 'Pending', 'Under Review', 'Resolved'].map(s => (
                  <button key={s} onClick={() => setFilter(s)} className={`btn btn-sm ${filter === s ? 'btn-info text-white' : 'btn-outline-secondary'}`}>{s}</button>
                ))}
              </div>
              <div className="card shadow-sm" style={{borderRadius:'12px'}}>
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr><th>ID</th><th>Date</th><th>Student</th><th>College</th><th>Category</th><th>Location</th><th>Status</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {filtered.map(c => (
                        <tr key={c._id}>
                          <td><strong className="text-info">{c.complaintId}</strong></td>
                          <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                          <td>{c.isAnonymous ? <span className="text-muted fst-italic">Anonymous</span> : c.studentName}</td>
                          <td>{c.college}</td>
                          <td>{c.category}</td>
                          <td>{c.location}</td>
                          <td>{statusBadge(c.status)}</td>
                          <td><button className="btn btn-sm btn-outline-primary" onClick={() => updateStatus(c._id, c.status)}>Update</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'contacts' && (
            <div className="card shadow-sm" style={{borderRadius:'12px'}}>
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light"><tr><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Date</th></tr></thead>
                  <tbody>
                    {contacts.map(c => (
                      <tr key={c._id}>
                        <td>{c.name}</td><td>{c.email}</td><td>{c.subject}</td>
                        <td style={{maxWidth:'250px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{c.message}</td>
                        <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
