import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Asegúrate de que App.jsx esté en la misma carpeta (src)
import './index.css' // Asegúrate de que index.css esté en la misma carpeta (src)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)