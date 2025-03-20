import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add diagnostic message to console
console.log('Application starting...');
console.log('Environment:', process.env.NODE_ENV);

// Add global error handler to diagnose deployment issues
window.onerror = (message, source, lineno, colno, error) => {
  console.error('Application error:', { message, source, lineno, colno, error });
  
  // Display visible error message on the page
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif;">
        <h2 style="color: #f44336;">App Error</h2>
        <p>Sorry, there was an error loading the application:</p>
        <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${message}\nAt: ${source}:${lineno}</pre>
        <p>Please check the console for more details.</p>
        <button onclick="window.location.reload()" 
          style="padding: 8px 16px; background: #2196f3; color: white; border: none; 
          border-radius: 4px; cursor: pointer;">
          Reload App
        </button>
      </div>
    `;
  }
  
  return false;
};

// Add unhandled promise rejection handler
window.onunhandledrejection = (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
};

// Function to show basic content if React fails
function createBasicAppFallback() {
  console.log('Creating fallback content...');
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; text-align: center;">
        <h1 style="color: #2196f3;">Finance Application</h1>
        <p>This is a fallback version of the application.</p>
        <p>The main application could not load properly.</p>
        <button onclick="window.location.reload()" 
          style="padding: 8px 16px; background: #2196f3; color: white; border: none; 
          border-radius: 4px; cursor: pointer; margin-top: 20px;">
          Try Again
        </button>
      </div>
    `;
  }
}

// Add timeout to detect if app fails to render
setTimeout(() => {
  const rootElement = document.getElementById('root');
  if (rootElement && rootElement.children.length === 0) {
    console.error('App failed to render content after timeout');
    createBasicAppFallback();
  }
}, 5000);

try {
  // Create the React root and render the app
  console.log('Creating React root...');
  const root = ReactDOM.createRoot(document.getElementById('root'));
  
  console.log('Rendering app...');
  root.render(<App />);
  console.log('App rendered successfully');
} catch (error) {
  console.error('Error rendering app:', error);
  createBasicAppFallback();
} 