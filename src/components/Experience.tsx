import { motion } from 'framer-motion';
import { Briefcase, ShieldCheck, Globe, Users, Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Experience = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('experience.jobs.rd_pm.role'),
      subtitle: t('experience.jobs.rd_pm.company'),
      desc: t('experience.jobs.rd_pm.desc'),
      icon: <Briefcase size={24} />,
      period: "End-to-End"
    },
    {
      title: t('experience.jobs.qa.role'),
      subtitle: t('experience.jobs.qa.company'),
      desc: t('experience.jobs.qa.desc'),
      icon: <ShieldCheck size={24} />,
      period: "Continuous"
    },
    {
      title: t('experience.jobs.nearshoring_dev.role'),
      subtitle: t('experience.jobs.nearshoring_dev.company'),
      desc: t('experience.jobs.nearshoring_dev.desc'),
      icon: <Globe size={24} />,
      period: "Scalable"
    },
    {
      title: t('experience.jobs.nearshoring_support.role'),
      subtitle: t('experience.jobs.nearshoring_support.company'),
      desc: t('experience.jobs.nearshoring_support.desc'),
      icon: <Users size={24} />,
      period: "Tunisia Hub"
    },
    {
      title: t('experience.jobs.innovation.role'),
      subtitle: t('experience.jobs.innovation.company'),
      desc: t('experience.jobs.innovation.desc'),
      icon: <Lightbulb size={24} />,
      period: "Strategic"
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
        {services.map((service, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="experience-card glass"
          >
            <div className="card-top">
              <span className="period">{service.period}</span>
              <span className="service-icon">{service.icon}</span>
            </div>
            <h3>{service.title}</h3>
            <h4>{service.subtitle}</h4>
            <p>{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
