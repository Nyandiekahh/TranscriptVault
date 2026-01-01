import { useState, useEffect, useCallback } from 'react';
import { getJobStatus, getCrawlResults } from '../services/supadataService';

/**
 * Custom hook for polling job status
 * Automatically polls job status until completion or failure
 */
export const useJobPolling = (jobId, type = 'transcript', interval = 3000) => {
  const [status, setStatus] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isPolling, setIsPolling] = useState(false);

  const pollStatus = useCallback(async () => {
    if (!jobId) return;

    setIsPolling(true);
    
    try {
      let jobStatus;
      
      if (type === 'transcript') {
        jobStatus = await getJobStatus(jobId);
      } else if (type === 'crawl') {
        jobStatus = await getCrawlResults(jobId);
      }

      setStatus(jobStatus.status);

      if (jobStatus.status === 'completed') {
        setResult(jobStatus.content || jobStatus.results);
        setIsPolling(false);
        return true; // Stop polling
      } else if (jobStatus.status === 'failed') {
        setError(jobStatus.error || 'Job failed');
        setIsPolling(false);
        return true; // Stop polling
      }
      
      return false; // Continue polling
    } catch (err) {
      console.error('Polling error:', err);
      setError(err.message);
      setIsPolling(false);
      return true; // Stop polling on error
    }
  }, [jobId, type]);

  useEffect(() => {
    if (!jobId) return;

    let timeoutId;
    let shouldContinue = true;

    const poll = async () => {
      const shouldStop = await pollStatus();
      
      if (!shouldStop && shouldContinue) {
        timeoutId = setTimeout(poll, interval);
      }
    };

    poll();

    return () => {
      shouldContinue = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [jobId, interval, pollStatus]);

  return {
    status,
    result,
    error,
    isPolling,
  };
};