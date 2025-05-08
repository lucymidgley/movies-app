import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { useAppContext } from './contexts/AppContext';
import { useEffect } from 'react';
import { api } from './api';
import { Routes, Route } from 'react-router-dom';
import { SignIn } from './pages/SignIn/SignIn';
import { HomePage } from './pages/Home.page';
import { Register } from './pages/Register/Register';

export default function App() {
  const { dispatch, state: { user } } = useAppContext();
  useEffect(() => {
    const getLogin = async (): Promise<void> => {
      const currentLogin = await api.users.show();
      console.log(currentLogin)
      dispatch({ type: "SET_USER", user: currentLogin });
    };
    getLogin();
  }, []);

  if (!!user) {
    return (<MantineProvider theme={theme}>
      <Routes >
        <Route path="/" element={<HomePage />} />
      </Routes >
    </MantineProvider >)
  }

  return (
    <MantineProvider theme={theme}>
      <Routes >
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </MantineProvider >
  );
}
