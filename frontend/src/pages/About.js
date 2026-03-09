import React from 'react';

const About = () => {
  const team = [
    { name: 'Faheem M', role: 'Founder & Project Lead', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
    { name: 'Faheem M', role: 'Frontend Developer', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
    { name: 'Aadhikesavan M', role: 'Backend Developer', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
  ];

  return (
    <>
      <div className="page-hero">
        <h1 className="fw-bold">About CampusVoice Portal</h1>
        <p className="mt-3 mx-auto" style={{maxWidth:'650px'}}>We are committed to giving students a platform to raise their voices for better food quality and safety.</p>
      </div>

      <section className="container my-5">
        <h2 className="text-center fw-bold mb-5">Our Mission</h2>
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <p>CampusVoice Portal was created to ensure students have a safe space to report food-related issues without fear. Our platform empowers you to file complaints, track their progress, and see real change.</p>
            <p>We stand for <strong>transparency, accountability, and empowerment</strong> — making dining safer and healthier for everyone.</p>
          </div>
          <div className="col-md-6 text-center">
            <img src="https://cdn-icons-png.flaticon.com/512/706/706164.png" className="img-fluid" style={{maxWidth:'220px'}} alt="mission" />
          </div>
        </div>
      </section>

      <section className="py-5" style={{background:'#f1f4f9'}}>
        <div className="container text-center">
          <h2 className="fw-bold mb-5">How It Works</h2>
          <div className="row g-4">
            {[
              { icon: 'bi-pencil-square', title: 'File a Complaint', desc: 'Submit your concern through our secure form, with or without your details.' },
              { icon: 'bi-graph-up', title: 'Track Progress', desc: 'Check your complaint status in real time as it moves through the system.' },
              { icon: 'bi-shield-check', title: 'See Results', desc: 'Watch as authorities take real action to improve food quality and hygiene.' },
            ].map((s, i) => (
              <div className="col-md-4" key={i}>
                <div className="feature-card">
                  <i className={`bi ${s.icon}`}></i>
                  <h5 className="fw-bold">{s.title}</h5>
                  <p className="text-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container my-5">
        <h2 className="text-center fw-bold mb-5">Meet Our Team</h2>
        <div className="row g-4 text-center">
          {team.map((t, i) => (
            <div className="col-md-4" key={i}>
              <div className="feature-card">
                <img src={t.img} alt={t.name} style={{width:'90px', borderRadius:'50%'}} className="mb-3" />
                <h5 className="fw-bold">{t.name}</h5>
                <p className="text-muted">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default About;
