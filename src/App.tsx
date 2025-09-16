import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

interface ApiInfo {
  name: string;
  version: string;
  description: string;
  environment: string;
}

interface HealthCheck {
  status: string;
  message: string;
  timestamp: string;
}

function App(): React.ReactElement {
  const [count, setCount] = useState(0);
  const [apiInfo, setApiInfo] = useState<ApiInfo | null>(null);
  const [health, setHealth] = useState<HealthCheck | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchApiInfo = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/info');
      const data = await response.json() as ApiInfo;
      setApiInfo(data);
    } catch (error) {
      console.error('Failed to fetch API info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHealth = async (): Promise<void> => {
    try {
      const response = await fetch('/api/health');
      const data = await response.json() as HealthCheck;
      setHealth(data);
    } catch (error) {
      console.error('Failed to fetch health check:', error);
    }
  };

  useEffect(() => {
    fetchApiInfo();
    fetchHealth();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Spec-Kit Project Test</h1>
      <h2>Vite + React + Node.js</h2>
      
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <div className="card">
        <h3>Server Integration</h3>
        <button onClick={fetchApiInfo} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Refresh API Info'}
        </button>
        <button onClick={fetchHealth}>
          Check Server Health
        </button>
        
        {apiInfo && (
          <div className="api-info">
            <h4>API Information</h4>
            <p><strong>Name:</strong> {apiInfo.name}</p>
            <p><strong>Version:</strong> {apiInfo.version}</p>
            <p><strong>Description:</strong> {apiInfo.description}</p>
            <p><strong>Environment:</strong> {apiInfo.environment}</p>
          </div>
        )}
        
        {health && (
          <div className="health-check">
            <h4>Server Health</h4>
            <p><strong>Status:</strong> <span className={health.status === 'ok' ? 'status-ok' : 'status-error'}>{health.status}</span></p>
            <p><strong>Message:</strong> {health.message}</p>
            <p><strong>Timestamp:</strong> {new Date(health.timestamp).toLocaleString()}</p>
          </div>
        )}
      </div>

      <p className="read-the-docs">
        This project demonstrates React + Vite frontend with Node.js backend integration.
        It's designed to work well with AI tools like spec-kit and Codex.
      </p>
    </>
  );
}

export default App;
