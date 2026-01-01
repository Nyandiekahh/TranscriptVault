import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <motion.div
      className={`card ${className} ${hover ? 'card-hover' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;