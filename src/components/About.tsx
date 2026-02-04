import { motion } from 'framer-motion';
import { Shield, Cpu, Target } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0
  }
};

const About = () => (
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
          <h2 className="section-title text-left">The Vision.</h2>
          <p>
            With over a decade of high-stakes R&D experience, I specialize in transforming complex technical requirements into market-leading reality. 
            I bridge the gap between silicon-level software and global project orchestration.
          </p>
          <div className="expertise-tags">
            <div className="tag"><Shield size={16}/> Cybersecurity</div>
            <div className="tag"><Cpu size={16}/> Embedded Systems</div>
            <div className="tag"><Target size={16}/> Strategic PM</div>
          </div>
        </div>
        <div className="about-stats">
          {[
            { label: 'Excellence in R&D', value: '10+' },
            { label: 'High-Impact Projects', value: '25+' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -8 }}
              className="stat-card glass-glow"
            >
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

export default About;
