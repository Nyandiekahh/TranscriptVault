import React from 'react';
import { motion } from 'framer-motion';
import { Database, Sparkles } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <motion.header 
      className="header"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header-content">
        <div className="header-logo">
          <motion.div 
            className="logo-icon"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Database size={32} />
          </motion.div>
          <div className="logo-text">
            <h1 className="logo-title">
              Transcript<span className="text-gradient">Vault</span>
            </h1>
            <p className="logo-subtitle">Extract. Transform. Archive.</p>
          </div>
        </div>
        
        <motion.div 
          className="header-badge"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <Sparkles size={14} />
          <span>Powered by Supadata</span>
        </motion.div>
      </div>
      
      <div className="header-glow"></div>
    </motion.header>
  );
};

export default Header;