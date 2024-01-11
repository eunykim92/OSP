import React, { useEffect, useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Cookies from 'js-cookie';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import MainContainer from './components/MainContainer';
import { dark } from '@mui/material/styles/createPalette';

export default function App() {
  const sessionID = Cookies.get('sessionID');
  if (!sessionID) {
    window.location.href = '/login';
    return;
  }
  const { getUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUser();
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: { mode: darkMode ? 'dark' : 'light' },
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <TopBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <MainContainer />
      </Container>
    </ThemeProvider>
  );
}
