import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { useAppContext } from './contexts/AppContext';
import { useEffect } from 'react';
import { api } from './api';
import { Routes, Route } from 'react-router-dom';
import { SignIn } from './pages/SignIn/SignIn';
import { HomePage } from './pages/Home.page';
import { Register } from './pages/Register/Register';
import { NotFound } from './pages/NotFound/NotFound';
import { NavBar } from './components/NavBar/NavBar';
import { AddMovie } from './pages/AddMovie/AddMovie';
import { FavouritesProvider } from './contexts/FavouritesContext';

export default function App() {
  const { dispatch, state: { user } } = useAppContext();
  useEffect(() => {
    const getLogin = async (): Promise<void> => {
      const currentLogin = await api.users.show();
      dispatch({ type: "SET_USER", user: currentLogin });
    };
    getLogin();
  }, []);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  if (!!user) {
    return (
      <MantineProvider theme={theme}>
        <FavouritesProvider>
          <NavBar />
          <Routes >
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/movie/:movie_id" element={<div>Movie info</div>} />
            <Route path="/movie/:movie_id/update" element={<AddMovie />} />
          </Routes >
        </FavouritesProvider>
      </MantineProvider >)
  }

  return (
    <MantineProvider theme={theme}>
      <NavBar />
      <Routes >
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MantineProvider >
  );
}
