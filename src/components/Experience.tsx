import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Experience = () => {
  const { t } = useTranslation();

  const jobs = [
    {
      company: t('experience.jobs.red.company'),
      role: t('experience.jobs.red.role'),
      period: `2025 - ${t('experience.present')}`,
      location: "Netherlands",
      desc: t('experience.jobs.red.desc')
    },
    {
      company: t('experience.jobs.imec.company'),
      role: t('experience.jobs.imec.role'),
      period: `2025 - ${t('experience.present')}`,
      location: "Belgium",
      desc: t('experience.jobs.imec.desc')
    },
    {
      company: t('experience.jobs.signify.company'),
      role: t('experience.jobs.signify.role'),
      period: t('experience.previous'),
      location: "Netherlands",
      desc: t('experience.jobs.signify.desc')
    },
    {
      company: t('experience.jobs.thermo.company'),
      role: t('experience.jobs.thermo.role'),
      period: t('experience.previous'),
      location: "Netherlands",
      desc: t('experience.jobs.thermo.desc')
    }
  ];

  return (
    <section id="experience" className="container">
      <motion.h2 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        className="section-title"
      >
        {t('experience.title')}
      </motion.h2>
      <div className="timeline-grid">
        {jobs.map((job, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="experience-card glass"
          >
            <div className="card-top">
              <span className="period">{job.period}</span>
              <span className="location"><MapPin size={14} /> {job.location}</span>
            </div>
            <h3>{job.role}</h3>
            <h4>{job.company}</h4>
            <p>{job.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
