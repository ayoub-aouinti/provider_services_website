import { motion } from 'framer-motion';
import { Linkedin, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
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
              {t(`nav.${item.toLowerCase()}`)}
            </motion.a>
          ))}
          <motion.a 
            href="https://www.linkedin.com/in/slimbahri/" 
            className="nav-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin size={18} />
            <span>{t('nav.connect')}</span>
          </motion.a>
          {isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Link to="/admin" className="nav-admin">
                <Settings size={18} />
                <span>Admin</span>
              </Link>
            </motion.div>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
