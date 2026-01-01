import React from 'react';
import { motion } from 'framer-motion';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <motion.aside 
      className="sidebar"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <nav className="sidebar-nav">
        <div className="nav-label">Features</div>
        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <span className="nav-icon">{tab.icon}</span>
            <span className="nav-text">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div 
                className="nav-indicator"
                layoutId="activeTab"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="footer-stats">
          <div className="stat-item">
            <div className="stat-value">∞</div>
            <div className="stat-label">Requests</div>
          </div>
          <div className="stat-item">
            <div className="stat-value pulse-glow">●</div>
            <div className="stat-label">Online</div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;