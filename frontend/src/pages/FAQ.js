import React from 'react';

const faqs = [
  { q: 'How do I file a food complaint?', a: 'Navigate to "File Complaint" in the navbar, fill out the form with details about the issue, and click Submit. You\'ll receive a unique complaint ID to track your submission.' },
  { q: 'Can I submit a complaint anonymously?', a: 'Yes! Toggle the "Submit Anonymously" switch on the complaint form. Your personal details won\'t be stored or visible to anyone.' },
  { q: 'How long does it take to resolve a complaint?', a: 'Most complaints are reviewed within 24-48 hours. Resolution time varies from 3-7 days depending on the severity and nature of the issue.' },
  { q: 'How can I track my complaint status?', a: 'Visit "My Complaints" page and enter your complaint ID in the tracking field. If logged in, all your complaints are displayed automatically.' },
  { q: 'What types of food complaints can I report?', a: 'You can report poor hygiene, expired food, insects/pests, bad food quality, insufficient quantity, or any other food safety concerns in campus dining facilities.' },
  { q: 'Will there be any consequences for filing a complaint?', a: 'No. We ensure student confidentiality. Anonymous complaints don\'t reveal any personal information, and named complaints are handled with discretion.' },
  { q: 'Can I upload photos with my complaint?', a: 'Yes, you can attach photo evidence (up to 5MB) when filing a complaint. Images significantly help authorities investigate and resolve issues faster.' },
  { q: 'Who reviews and acts on complaints?', a: 'Complaints are reviewed by the college food safety department and hostel administration. Our admin panel allows them to update statuses and add resolution notes.' },
];

const FAQ = () => (
  <>
    <div className="page-hero">
      <h1 className="fw-bold">Frequently Asked Questions</h1>
      <p className="mt-2">Find answers to common questions about CampusVoice Portal</p>
    </div>

    <div className="container my-5" style={{maxWidth:'800px'}}>
      <div className="accordion" id="faqAccordion">
        {faqs.map((f, i) => (
          <div className="accordion-item mb-3 border rounded shadow-sm" key={i}>
            <h2 className="accordion-header">
              <button className={`accordion-button fw-semibold ${i !== 0 ? 'collapsed' : ''}`} type="button"
                data-bs-toggle="collapse" data-bs-target={`#faq${i}`}>
                <i className="bi bi-question-circle-fill text-info me-2"></i>{f.q}
              </button>
            </h2>
            <div id={`faq${i}`} className={`accordion-collapse collapse ${i === 0 ? 'show' : ''}`} data-bs-parent="#faqAccordion">
              <div className="accordion-body text-muted">{f.a}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
);

export default FAQ;
