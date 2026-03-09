import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const COLLEGES = ['DSEC', 'SRM', 'Anna University', 'VIT', 'Loyola College'];
const LOCATIONS = ['Main Cafeteria', 'Butterfly Hostel', '8th Floor Hostel', 'Titanic Hostel', 'ABCD Hostel', 'Food Court'];
const CATEGORIES = ['Poor Hygiene', 'Expired Food', 'Insects/Pests', 'Bad Quality', 'Insufficient Quantity', 'Other'];

const FileComplaint = () => {
  const [form, setForm] = useState({ isAnonymous: false, studentName: '', studentId: '', college: '', location: '', category: '', description: '' });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('image', image);
      const res = await axios.post('/api/complaints', fd);
      Swal.fire({
        icon: 'success',
        title: 'Complaint Submitted!',
        html: `Your complaint ID is: <strong>${res.data.complaintId}</strong><br>Please save this for tracking.`,
        confirmButtonColor: '#2b5876'
      });
      setForm({ isAnonymous: false, studentName: '', studentId: '', college: '', location: '', category: '', description: '' });
      setImage(null);
      e.target.reset();
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.response?.data?.message || 'Something went wrong' });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="page-hero">
        <h1 className="fw-bold">File a Complaint</h1>
        <p className="mt-2">Report food quality issues — anonymously or with your details</p>
      </div>

      <div className="container my-5" style={{maxWidth:'750px'}}>
        <div className="card shadow-sm p-4 p-md-5" style={{borderRadius:'16px'}}>
          <h4 className="fw-bold mb-4">Complaint Details</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-check form-switch mb-4">
              <input className="form-check-input" type="checkbox" id="anonSwitch"
                checked={form.isAnonymous}
                onChange={e => setForm({ ...form, isAnonymous: e.target.checked })} />
              <label className="form-check-label fw-semibold" htmlFor="anonSwitch">
                <i className="bi bi-shield-check me-2 text-info"></i>Submit Anonymously
              </label>
            </div>

            {!form.isAnonymous && (
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Student Name</label>
                  <input name="studentName" value={form.studentName} onChange={handleChange} className="form-control" placeholder="Full name" required={!form.isAnonymous} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Student ID</label>
                  <input name="studentId" value={form.studentId} onChange={handleChange} className="form-control" placeholder="Student ID" />
                </div>
              </div>
            )}

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label">College Name <span className="text-danger">*</span></label>
                <select name="college" value={form.college} onChange={handleChange} className="form-select" required>
                  <option value="">Select your college</option>
                  {COLLEGES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Hostel / Cafeteria <span className="text-danger">*</span></label>
                <select name="location" value={form.location} onChange={handleChange} className="form-select" required>
                  <option value="">Select location</option>
                  {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Complaint Category <span className="text-danger">*</span></label>
              <select name="category" value={form.category} onChange={handleChange} className="form-select" required>
                <option value="">Select complaint type</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Detailed Description <span className="text-danger">*</span></label>
              <textarea name="description" value={form.description} onChange={handleChange} className="form-control" rows={4} placeholder="Describe the issue in detail..." required />
            </div>

            <div className="mb-4">
              <label className="form-label">Upload Photo Evidence <span className="text-muted">(Optional, max 5MB)</span></label>
              <input type="file" className="form-control" accept="image/*" onChange={e => setImage(e.target.files[0])} />
            </div>

            <button type="submit" className="btn btn-primary-custom" disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Submitting...</> : <><i className="bi bi-send me-2"></i>Submit Complaint</>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FileComplaint;
