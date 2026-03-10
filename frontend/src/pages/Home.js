import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Home = () => {
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0, underReview: 0 });

  useEffect(() => {
    api.get('/api/complaints/stats').then(r => setStats(r.data)).catch(() => {});
  }, []);

  const features = [
    { icon: 'bi-pencil-square', title: 'Easy Submission', desc: 'Simple form to report food issues quickly and efficiently.' },
    { icon: 'bi-shield-exclamation', title: 'Anonymous Option', desc: 'Report concerns without revealing your identity.' },
    { icon: 'bi-bar-chart-line', title: 'Track Status', desc: 'Monitor your complaint progress from submission to resolution.' },
    { icon: 'bi-check-circle', title: 'Verified Results', desc: 'Real action taken by food safety authorities.' },
  ];

  const testimonials = [
    { quote: '"Finally, a platform where our food concerns are heard and acted upon. The cafeteria quality has improved dramatically!"', name: 'Sidarth', role: 'Engineering Student' },
    { quote: '"The anonymous reporting option gave me confidence to speak up about hygiene issues. Real change happened within days!"', name: 'Andrew', role: 'Law Student' },
    { quote: '"Love how I can track my complaint status. The transparency builds trust and shows they actually care."', name: 'Lijmol Rose', role: 'Medical Student' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <div className="container text-center text-white py-5">
          <h1 className="display-4 fw-bold mb-3">Raise Your Voice For<br />Better Food</h1>
          <p className="lead mb-4 mx-auto" style={{maxWidth:'600px'}}>Join thousands of students making dining safer and better. Your voice matters in creating positive change.</p>
          <Link to="/file-complaint" className="btn btn-outline-info btn-lg rounded-pill me-3 px-4">File Complaint</Link>
          <Link to="/about" className="btn btn-outline-light btn-lg rounded-pill px-4">Learn More</Link>
        </div>
      </section>

      {/* Features */}
      <section className="container my-5">
        <h2 className="text-center fw-bold mb-5">Why Choose CampusVoice?</h2>
        <div className="row g-4">
          {features.map((f, i) => (
            <div className="col-12 col-md-6 col-lg-3" key={i}>
              <div className="feature-card">
                <i className={`bi ${f.icon}`}></i>
                <h5 className="fw-bold">{f.title}</h5>
                <p className="text-muted mb-0">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-5" style={{background:'#f1f4f9'}}>
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Our Impact</h2>
          <div className="row g-4">
            {[
              { label: 'Total Complaints', val: stats.total, icon: 'bi-file-text' },
              { label: 'Resolved', val: stats.resolved, icon: 'bi-check-circle-fill' },
              { label: 'Under Review', val: stats.underReview, icon: 'bi-clock' },
              { label: 'Pending', val: stats.pending, icon: 'bi-hourglass' },
            ].map((s, i) => (
              <div className="col-6 col-md-3" key={i}>
                <div className="stat-card">
                  <i className={`bi ${s.icon} fs-2 mb-2`}></i>
                  <h2>{s.val}</h2>
                  <p className="mb-0 opacity-75">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container my-5">
        <h2 className="text-center fw-bold mb-5">What Students Say</h2>
        <div className="row g-4">
          {testimonials.map((t, i) => (
            <div className="col-md-4" key={i}>
              <div className="testimonial-card">
                <i className="bi bi-quote fs-2 text-info mb-3 d-block"></i>
                <p className="fst-italic">{t.quote}</p>
                <hr />
                <strong>{t.name}</strong>
                <div><span className="badge bg-info">{t.role}</span></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-5" style={{background:'linear-gradient(135deg,#2b5876,#4e4376)'}}>
        <div className="container text-center text-white">
          <h2 className="fw-bold mb-3">Ready to Make a Difference?</h2>
          <p className="mb-4 opacity-75">Your complaint can improve food safety for hundreds of students.</p>
          <Link to="/file-complaint" className="btn btn-light btn-lg rounded-pill px-5">File a Complaint Now</Link>
        </div>
      </section>
    </>
  );
};

export default Home;
