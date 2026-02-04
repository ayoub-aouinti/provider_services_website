import { motion } from 'framer-motion';
import { Linkedin, Mail, MapPin } from 'lucide-react';

const Contact = () => (
  <section id="contact" className="container">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="glass contact-card-v2"
    >
      <div className="contact-content">
        <h2 className="section-title text-left">Let's Connect.</h2>
        <p>Expertise in R&D, Strategy, and Technical Orchestration. <br/>Available for consulting and partnership.</p>
        <div className="contact-btns">
          <a href="https://www.linkedin.com/in/slimbahri/" className="btn-primary">
            <Linkedin size={20} /> LinkedIn Profile
          </a>
          <a href="mailto:contact@redprojects.nl" className="btn-outline">
            <Mail size={20} /> Send Email
          </a>
        </div>
      </div>
      <div className="contact-footer">
        <div className="item"><MapPin size={18} /> Netherlands / Remote</div>
      </div>
    </motion.div>
  </section>
);

export default Contact;
