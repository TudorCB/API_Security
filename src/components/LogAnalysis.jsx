import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/auth';

function LogAnalysis() {
  const [logs, setLogs] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/logging/logs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching log analysis data:', error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div>
      <h2>Log Analysis</h2>
      <ul>
        {logs.map(log => (
          <li key={log.id}>{log.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default LogAnalysis;