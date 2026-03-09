import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer>
    <div className="container">
      <div className="row gy-4 text-center text-md-start">
        <div className="col-12 col-md-6 col-lg-3">
          <h5 className="fw-bold"><span className="text-info">CampusVoice</span> Portal</h5>
          <p className="text-muted">Empowering students to speak up for better food quality and safety.</p>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <h6 className="fw-bold">Quick Links</h6>
          <ul className="list-unstyled">
            <li><Link to="/about" className="text-dark text-decoration-none">About Us</Link></li>
            <li><Link to="/file-complaint" className="text-dark text-decoration-none">File Complaint</Link></li>
            <li><Link to="/my-complaints" className="text-dark text-decoration-none">My Complaints</Link></li>
          </ul>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <h6 className="fw-bold">Support</h6>
          <ul className="list-unstyled">
            <li><Link to="/contact" className="text-dark text-decoration-none">Contact Us</Link></li>
            <li><Link to="/faq" className="text-dark text-decoration-none">FAQ</Link></li>
          </ul>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <h6 className="fw-bold">Connect</h6>
          <ul className="list-unstyled">
            <li><a href="#" className="text-dark text-decoration-none"><i className="bi bi-instagram me-2"></i>Instagram</a></li>
            <li><a href="#" className="text-dark text-decoration-none"><i className="bi bi-twitter me-2"></i>Twitter</a></li>
            <li><a href="#" className="text-dark text-decoration-none"><i className="bi bi-facebook me-2"></i>Facebook</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="text-center border-top pt-3 mt-4">
      <p className="mb-0 text-muted">© 2025 CampusVoice Portal. All rights reserved. | Food Safety Department</p>
    </div>
  </footer>
);

export default Footer;
