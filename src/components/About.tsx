import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { Shield, Cpu, Target } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Counter = ({ value, duration = 2 }: { value: string, duration?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const targetValue = parseInt(value);

  useEffect(() => {
    if (isInView) {
      animate(count, targetValue, { duration, ease: "easeOut" });
    }
  }, [isInView, targetValue, count, duration]);

  return (
    <motion.h3 ref={ref}>
      <motion.span>{rounded}</motion.span>
      {value.includes('+') ? '+' : ''}
    </motion.h3>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0
  }
};

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="about container">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        transition={{ duration: 0.8 }}
        className="glass about-card"
      >
        <div className="about-grid">
          <div className="about-text">
            <h2 className="section-title text-left">{t('about.title')}</h2>
            <p>{t('about.p1')}</p>
            <div className="expertise-tags">
              <div className="tag"><Shield size={16}/> {t('about.cybersecurity')}</div>
              <div className="tag"><Cpu size={16}/> {t('about.embedded_systems')}</div>
              <div className="tag"><Target size={16}/> {t('about.strategic_pm')}</div>
            </div>
          </div>
          <div className="about-stats">
            {[
              { label: t('about.excellence_rd'), value: '10+' },
              { label: t('about.high_impact'), value: '25+' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="stat-card glass-glow"
              >
                <Counter value={stat.value} />
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
