import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './index.css'


createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<App />
</React.StrictMode>
)