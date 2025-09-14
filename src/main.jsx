import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster 
        position="top-right" 
        reverseOrder={false} 
        toastOptions={{
          duration: 3000,
        }}
      />
    </Provider>
  </React.StrictMode>
);
