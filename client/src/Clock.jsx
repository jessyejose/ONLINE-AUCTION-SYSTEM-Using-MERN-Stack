import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
		color:'#880085'
      }}
    >
      {`${hours}:${minutes}:${seconds}`}
    </div>
  );
};

export default Clock;

