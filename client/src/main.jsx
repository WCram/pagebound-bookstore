import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { BorrowProvider } from './context/BorrowContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <BorrowProvider>
          <App />
        </BorrowProvider>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
