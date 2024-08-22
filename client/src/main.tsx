import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';

// Create a custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Customize these colors as needed
        },
        secondary: {
            main: '#dc004e',
        },
    },
    typography: {
        fontFamily: 'Pokémon', // Add your custom font family here
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </StrictMode>
);