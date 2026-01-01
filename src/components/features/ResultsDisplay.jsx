import React from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Download, Eye } from 'lucide-react';
import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';
import Button from '../ui/Button';
import toast from 'react-hot-toast';
import './ResultsDisplay.css';

const ResultsDisplay = ({ results, loading }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const textToCopy = typeof results === 'string' 
      ? results 
      : JSON.stringify(results, null, 2);
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success('Copied to clipboard!');
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = typeof results === 'string' 
      ? results 
      : JSON.stringify(results, null, 2);
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcriptvault-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Downloaded!');
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="results-card">
          <div className="results-loading">
            <LoadingSpinner size="large" />
            <p className="loading-text">Processing your request...</p>
            <p className="loading-subtext">This may take a few moments</p>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (!results) return null;

  const isJobResult = results && typeof results === 'object' && 'jobId' in results;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="results-card">
        <div className="results-header">
          <div className="results-title">
            <Eye size={20} />
            <h3>Results</h3>
          </div>
          <div className="results-actions">
            <Button 
              variant="secondary" 
              size="small"
              onClick={handleCopy}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <Button 
              variant="secondary" 
              size="small"
              onClick={handleDownload}
            >
              <Download size={16} />
              Download
            </Button>
          </div>
        </div>

        <div className="results-content">
          {isJobResult ? (
            <div className="job-result">
              <div className="job-badge">
                <span className="job-badge-icon">⚡</span>
                <span className="job-badge-text">Job Started</span>
              </div>
              <div className="job-info">
                <div className="job-field">
                  <span className="job-label">Job ID:</span>
                  <code className="job-value mono">{results.jobId}</code>
                </div>
                <p className="job-description">
                  Your request has been queued for processing. Use the job ID to check status.
                </p>
              </div>
            </div>
          ) : typeof results === 'string' ? (
            <pre className="results-text">{results}</pre>
          ) : (
            <pre className="results-json">
              {JSON.stringify(results, null, 2)}
            </pre>
          )}
        </div>

        <div className="results-footer">
          <div className="results-meta">
            <span className="meta-item">
              Generated at {new Date().toLocaleTimeString()}
            </span>
            <span className="meta-divider">•</span>
            <span className="meta-item">
              {typeof results === 'string' 
                ? `${results.length} characters`
                : `${Object.keys(results).length} fields`
              }
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ResultsDisplay;