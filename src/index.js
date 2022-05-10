import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './utils/AuthProvider';

const container =   document.getElementById('app');
const root = createRoot(container);

root.render(
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path="/*" element={<App />} />
            </Routes>
        </AuthProvider>    
  </BrowserRouter>
);


