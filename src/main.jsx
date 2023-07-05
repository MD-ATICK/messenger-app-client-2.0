import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import ContextProvider from './provider/ContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <ContextProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </ContextProvider>
    </BrowserRouter>
  </>,
)
