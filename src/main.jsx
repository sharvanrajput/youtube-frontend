import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Toaster } from 'sonner'
import { ThemeProvider } from './components/ThemeProvider'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <App />
        <Toaster position="top-center" />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
)
