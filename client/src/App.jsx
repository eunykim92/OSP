import React, { useEffect, useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Cookies from 'js-cookie';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import MainContainer from './components/MainContainer';

export default function App() {
  const sessionID = Cookies.get('sessionID');
  if (!sessionID) {
    window.location.href = '/login';
    return;
  }
  const { getUser, user } = useAuth();

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

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <TopBar />
      <MainContainer />
    </Container>
  );
}
