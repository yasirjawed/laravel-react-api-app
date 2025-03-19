import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import './index.css'
import { ContextProvider } from './contexts/ContextProvider.jsx';

const root = createRoot(document.getElementById('root')); // Ensure this matches the ID in index.html
root.render(
  <StrictMode>
    <ContextProvider>
        <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
