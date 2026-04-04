import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider.tsx'
import { UserProvider } from './components/UserContext.tsx'
import { SocketProvider } from './components/Socket.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <SocketProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </SocketProvider>
    </UserProvider>
  </StrictMode>
)