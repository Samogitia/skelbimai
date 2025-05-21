import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useNavigate, BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthorizationProvider } from '../context/authorizationProvider.jsx'

createRoot(document.getElementById('root')).render(
//   <StrictMode>
    	<BrowserRouter>
   		<AuthorizationProvider>
    			<App />
    		</AuthorizationProvider>
    	</BrowserRouter>
//   </StrictMode>,
)
