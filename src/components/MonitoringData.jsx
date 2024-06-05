import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../utils/auth';

function MonitoringData() {
  const [data, setData] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/monitoring/data', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching monitoring data:', error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div>
      <h2>Monitoring Data</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.metric}: {item.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default MonitoringData;