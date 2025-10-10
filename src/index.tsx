import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';

// Control spacing
const theme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: '0.8rem 1rem',
        },
      },
    },
  },
});

const rootEl = document.getElementById('root');

if (!rootEl) throw new Error('Failed to find the root element');

createRoot(rootEl).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);