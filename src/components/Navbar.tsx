import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'experience', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar glass ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-content">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="logo"
        >
          <a href="#home"><span>S</span>lim Bahri</a>
        </motion.div>
        <div className="nav-links">
          {['About', 'Experience', 'Certifications', 'Contact'].map((item) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`}
              className={activeSection === item.toLowerCase() ? 'active' : ''}
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
          <motion.a 
            href="https://www.linkedin.com/in/slimbahri/" 
            className="nav-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin size={18} />
            <span>Connect</span>
          </motion.a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
