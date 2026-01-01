import React from 'react';
import { motion } from 'framer-motion';
import './Input.css';

const Input = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  icon,
  type = 'text',
  error,
  ...props 
}) => {
  return (
    <div className="input-wrapper">
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}
      <div className="input-container">
        {icon && <div className="input-icon">{icon}</div>}
        <motion.input
          className={`input-field ${icon ? 'has-icon' : ''} ${error ? 'has-error' : ''}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          whileFocus={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
          {...props}
        />
      </div>
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;