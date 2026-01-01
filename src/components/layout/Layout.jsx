import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children, activeTab, setActiveTab, tabs }) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;