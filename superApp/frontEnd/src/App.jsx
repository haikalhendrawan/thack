import { useState } from 'react';
import Router from "./routes";
import { BrowserRouter } from 'react-router-dom';

import { HelmetProvider } from 'react-helmet-async';
// provider
import ThemeProvider from './theme';
import {AuthProvider} from './context/AuthProvider';
// components
import ScrollToTop from './components/scroll-to-top';


function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <AuthProvider>
            <Router />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
