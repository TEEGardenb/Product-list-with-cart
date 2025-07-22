import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './Context/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
  <CartProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </CartProvider>
)
