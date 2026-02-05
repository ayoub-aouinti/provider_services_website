import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Edit3, 
  Palette, 
  Save, 
  Home,
  FileText,
  Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ContentEditor from './ContentEditor';
import StyleCustomizer from './StyleCustomizer';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar glass">
        <div className="admin-header">
          <h2>Admin Panel</h2>
          <p>Website Backoffice</p>
        </div>

        <nav className="admin-nav">
          <button
            className={`nav-item ${activeTab === 'content' ? 'active' : ''}`}
            onClick={() => setActiveTab('content')}
          >
            <FileText size={20} />
            <span>Content Editor</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'style' ? 'active' : ''}`}
            onClick={() => setActiveTab('style')}
          >
            <Palette size={20} />
            <span>Style Customizer</span>
          </button>
        </nav>

        <div className="admin-footer">
          <button className="nav-item" onClick={() => navigate('/')}>
            <Home size={20} />
            <span>View Website</span>
          </button>
          <button className="nav-item logout" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="admin-content">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="admin-panel"
        >
          {activeTab === 'content' && <ContentEditor />}
          {activeTab === 'style' && <StyleCustomizer />}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
