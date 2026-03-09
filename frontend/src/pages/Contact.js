import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/contact', form);
      Swal.fire({ icon: 'success', title: 'Message Sent!', text: 'We will get back to you within 24 hours.', confirmButtonColor: '#2b5876' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to send message. Please try again.' });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="page-hero">
        <h1 className="fw-bold">Contact Us</h1>
        <p className="mt-2">Reach out to the CampusVoice team or Food Safety Department</p>
      </div>

      <div className="container my-5">
        <div className="row g-5">
          <div className="col-md-5">
            <h4 className="fw-bold mb-4">Get in Touch</h4>
            {[
              { icon: 'bi-geo-alt-fill', title: 'Address', val: 'Food Safety Department, Campus Administration Block, Chennai, Tamil Nadu - 600001' },
              { icon: 'bi-telephone-fill', title: 'Phone', val: '+91 9360126021' },
              { icon: 'bi-envelope-fill', title: 'Email', val: 'haleemfaheem006@gmail.com' },
              { icon: 'bi-clock-fill', title: 'Office Hours', val: 'Monday - Friday: 9:00 AM - 5:00 PM' },
            ].map((c, i) => (
              <div className="d-flex gap-3 mb-4" key={i}>
                <div className="rounded-circle bg-info d-flex align-items-center justify-content-center text-white" style={{width:'45px', height:'45px', minWidth:'45px'}}>
                  <i className={`bi ${c.icon}`}></i>
                </div>
                <div>
                  <strong>{c.title}</strong>
                  <p className="text-muted mb-0 small">{c.val}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-7">
            <div className="card shadow-sm p-4 p-md-5" style={{borderRadius:'16px'}}>
              <h4 className="fw-bold mb-4">Send a Message</h4>
              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <input className="form-control" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                  </div>
                  <div className="col-md-6">
                    <input type="email" className="form-control" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                  </div>
                </div>
                <div className="mb-3">
                  <input className="form-control" placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required />
                </div>
                <div className="mb-4">
                  <textarea className="form-control" rows={5} placeholder="Your message..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
                </div>
                <button type="submit" className="btn btn-primary-custom" disabled={loading}>
                  {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Sending...</> : <><i className="bi bi-send me-2"></i>Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
