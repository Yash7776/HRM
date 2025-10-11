import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'flowbite/dist/flowbite.css';
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer,Zoom } from 'react-toastify';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer
    position="bottom-right"
    transition={Zoom}
    />
    <App />
  </StrictMode>,
)
