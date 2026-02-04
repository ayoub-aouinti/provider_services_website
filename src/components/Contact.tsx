import { motion } from 'framer-motion';
import { Linkedin, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="glass contact-card-v2"
      >
        <div className="contact-content">
          <h2 className="section-title text-left">{t('contact.title')}</h2>
          <p>{t('contact.p1')}</p>
          <div className="contact-btns">
            <a href="https://www.linkedin.com/in/slimbahri/" className="btn-primary">
              <Linkedin size={20} /> {t('contact.linkedin')}
            </a>
            <a href="mailto:contact@redprojects.nl" className="btn-outline">
              <Mail size={20} /> {t('contact.email')}
            </a>
          </div>
        </div>
        <div className="contact-footer">
          <div className="item"><MapPin size={18} /> {t('contact.location')}</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
