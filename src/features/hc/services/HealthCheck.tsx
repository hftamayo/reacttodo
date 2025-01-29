import React, { useEffect, useState } from 'react';
import { beOps } from '../../../shared/services/api/apiClient';

export const HealthCheck: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await beOps.checkHealth();
        setStatus(response.status);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      }
    };

    checkHealth();
  }, []);

  return (
    <div>
      {status ? (
        <p>Backend Status: {status}</p>
      ) : (
        <p>Checking backend status...</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};
