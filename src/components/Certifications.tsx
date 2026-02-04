import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Certifications = () => {
  const { t } = useTranslation();

  const certs = [
    { name: "PMP®", full: "Project Management Professional" },
    { name: "PSM I", full: "Professional Scrum Master" },
    { name: "SAFe®", full: "Certified Advanced Scrum Master" },
    { name: "RE@Agile", full: "Certified Professional" },
    { name: "ISTQB®", full: "Foundation & Agile Level" }
  ];

  return (
    <section id="certifications" className="container">
      <h2 className="section-title">{t('certs.title')}</h2>
      <div className="certs-grid">
        {certs.map((cert, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.05 }}
            className="cert-card glass"
          >
            <div className="cert-icon glass"><Award size={24} /></div>
            <div className="cert-info">
              <h3>{cert.name}</h3>
              <p>{cert.full}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
