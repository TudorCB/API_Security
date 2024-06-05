import React, { useEffect } from 'react';
import { useAuth } from '../utils/auth';
import SecurityTestResults from './SecurityTestResults';
import VulnerabilityReports from './VulnerabilityReports';
import MonitoringData from './MonitoringData';
import LogAnalysis from './LogAnalysis';

function Dashboard() {
  const { token, signIn } = useAuth();

  useEffect(() => {
    // Check if token exists in local storage and sign in user if it does
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      signIn(storedToken);
    }
  }, [signIn]);

  return (
    <div>
      <h1>Security Dashboard</h1>
      {token ? (
        <>
          <SecurityTestResults />
          <VulnerabilityReports />
          <MonitoringData />
          <LogAnalysis />
        </>
      ) : (
        <p>Please sign in to access the dashboard.</p>
      )}
    </div>
  );
}

export default Dashboard;