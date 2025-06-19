
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { supabase } from '@/lib/supabaseClient.js';

// You can perform an initial check or action with Supabase here if needed
// For example, logging if the client is initialized (optional)
if (supabase) {
  console.log("Supabase client initialized successfully!");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
