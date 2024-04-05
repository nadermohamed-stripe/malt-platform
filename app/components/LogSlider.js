import React, { useState, useEffect } from 'react';

function LogSlider() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/cpt1') // endpoint from which you are getting logs
        .then(res => res.json())
        .then(data => {
          setLogs(data);
        })
        .catch(err => console.error(err));
    }
  }, [isOpen]);

  const toggleSlider = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleSlider}>Toggle Log Slider</button>
      {isOpen && (
        <div style={{ backgroundColor: 'black', color: 'white' }}>
          <h1>Logs</h1>
          <ul>
            {logs.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LogSlider;