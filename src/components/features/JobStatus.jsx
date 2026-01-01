import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Loader } from 'lucide-react';
import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';
import './JobStatus.css';

const JobStatus = ({ jobId, status, result, error }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={48} className="status-icon success" />;
      case 'failed':
        return <XCircle size={48} className="status-icon error" />;
      case 'queued':
        return <Clock size={48} className="status-icon pending" />;
      case 'active':
        return <Loader size={48} className="status-icon active" />;
      default:
        return <Clock size={48} className="status-icon" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'var(--success)';
      case 'failed':
        return 'var(--error)';
      case 'active':
        return 'var(--accent-primary)';
      default:
        return 'var(--text-muted)';
    }
  };

  return (
    <Card className="job-status-card">
      <motion.div
        className="job-status-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="status-header">
          {getStatusIcon()}
          <h3 className="status-title" style={{ color: getStatusColor() }}>
            {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Processing'}
          </h3>
        </div>

        <div className="status-details">
          <div className="detail-item">
            <span className="detail-label">Job ID</span>
            <code className="detail-value mono">{jobId}</code>
          </div>

          {status === 'active' && (
            <div className="progress-indicator">
              <LoadingSpinner size="small" />
              <p className="progress-text">Processing your request...</p>
            </div>
          )}

          {status === 'completed' && result && (
            <div className="result-preview">
              <span className="detail-label">Result Preview</span>
              <pre className="result-content">
                {typeof result === 'string' 
                  ? result.substring(0, 200) + '...'
                  : JSON.stringify(result, null, 2).substring(0, 200) + '...'
                }
              </pre>
            </div>
          )}

          {status === 'failed' && error && (
            <div className="error-message">
              <span className="detail-label">Error</span>
              <p className="error-text">{error}</p>
            </div>
          )}
        </div>

        {status === 'queued' && (
          <div className="status-info">
            <p>Your job is queued and will be processed shortly.</p>
          </div>
        )}
      </motion.div>
    </Card>
  );
};

export default JobStatus;