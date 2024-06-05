import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/auth';

function SecurityTestResults() {
  const [results, setResults] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/security/tests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching security test results:', error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div>
      <h2>Security Test Results</h2>
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default SecurityTestResults;