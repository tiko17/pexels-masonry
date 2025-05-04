import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Enhanced performance monitoring
reportWebVitals((metric) => {
  // Add timestamp for tracking when the metric was recorded
  const timestamp = new Date().toISOString();
  
  // Format the value to 1 decimal place
  const formattedValue = Math.round(metric.value * 10) / 10;
  
  // Color coding based on metric type and value
  let status = '🟢'; // Default to green
  
  switch (metric.name) {
    case 'TTFB':
      status = formattedValue < 100 ? '🟢' : formattedValue < 200 ? '🟡' : '🔴';
      break;
    case 'FCP':
      status = formattedValue < 1800 ? '🟢' : formattedValue < 3000 ? '🟡' : '🔴';
      break;
    case 'LCP':
      status = formattedValue < 2500 ? '🟢' : formattedValue < 4000 ? '🟡' : '🔴';
      break;
    case 'FID':
      status = formattedValue < 100 ? '🟢' : formattedValue < 300 ? '🟡' : '🔴';
      break;
    case 'CLS':
      status = formattedValue < 0.1 ? '🟢' : formattedValue < 0.25 ? '🟡' : '🔴';
      break;
  }

  console.log(
    `%c${status} ${metric.name}: ${formattedValue}ms`,
    'font-size: 14px; font-weight: bold;'
  );
  console.log(
    `%c  └─ ID: ${metric.id}\n  └─ Timestamp: ${timestamp}`,
    'color: #666; font-size: 12px;'
  );
});
