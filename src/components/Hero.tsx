import { motion } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const Hero = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="home" className="hero">
      <div className="container">
        <motion.div 
          key={i18n.language}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="hero-content"
        >
          <motion.div variants={fadeInUp} transition={{ duration: 0.8 }}>
            <span className="badge">{t('hero.badge')}</span>
          </motion.div>
          <motion.h1 variants={fadeInUp} transition={{ duration: 0.8 }}>
            {t('hero.title_main')} <br/>
            <span className="gradient-text">{t('hero.title_accent')}</span>
          </motion.h1>
          <motion.p variants={fadeInUp} transition={{ duration: 0.8 }} className="hero-desc">
            {t('hero.desc_p1')} <span className="sub-gradient-text">{t('hero.desc_p2')}</span>, {t('hero.desc_p3')} <span className="sub-gradient-text">{t('hero.desc_p4')}</span> {t('hero.desc_p5')}
          </motion.p>
          <motion.div variants={fadeInUp} transition={{ duration: 0.8 }} className="hero-cta">
            <a href="#experience" className="btn-primary">{t('hero.view_portfolio')}</a>
            <a href="#contact" className="btn-outline">
              {t('hero.lets_talk')} <ExternalLink size={16} />
            </a>
          </motion.div>
        </motion.div>
      </div>
      <motion.div 
        key={`scroll-${i18n.language}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="scroll-indicator"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default Hero;
