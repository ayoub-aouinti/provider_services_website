import { motion } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';

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

const Hero = () => (
  <section id="home" className="hero">
    <div className="container">
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="hero-content"
      >
        <motion.div variants={fadeInUp} transition={{ duration: 0.8 }}>
          <span className="badge">R&D Program Manager | Consultant</span>
        </motion.div>
        <motion.h1 variants={fadeInUp} transition={{ duration: 0.8 }}>
          Building Modern <br/>
          <span className="gradient-text">Engineering Excellence.</span>
        </motion.h1>
        <motion.p variants={fadeInUp} transition={{ duration: 0.8 }} className="hero-desc">
          Strategic leadership in <span className="sub-gradient-text">Automotive Tech</span>, <span className="sub-gradient-text">Embedded Systems</span>, and <span className="sub-gradient-text">Cybersecurity</span> orchestration.
        </motion.p>
        <motion.div variants={fadeInUp} transition={{ duration: 0.8 }} className="hero-cta">
          <a href="#experience" className="btn-primary">View Portfolio</a>
          <a href="#contact" className="btn-outline">
            Let's Talk <ExternalLink size={16} />
          </a>
        </motion.div>
      </motion.div>
    </div>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="scroll-indicator"
    >
      <ChevronDown size={32} />
    </motion.div>
  </section>
);

export default Hero;
