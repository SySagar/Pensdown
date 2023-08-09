import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Apptheme from './theme/Apptheme.tsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Apptheme>
    <Toaster position='top-right'/>
    <App />
    </Apptheme>
  </React.StrictMode>,
)
