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
import { MovieShow } from './pages/ShowMovie/ShowMovie';
import { VerifyEmail } from './pages/VerifyEmail/VerifyEmail';
import { ForgotPassword } from './pages/ForgotPassword/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword/ResetPassword';

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
            <Route path="/movies/create" element={<AddMovie />} />
            <Route path="/movies/:movie_id" element={<MovieShow />} />
            <Route path="/movies/:movie_id/update" element={<AddMovie />} />
            <Route path="/verified" element={<VerifyEmail />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword/:passwordToken" element={<ResetPassword />} />
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
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:passwordToken" element={<ResetPassword />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:movie_id" element={<MovieShow />} />
        <Route path="/verified" element={<VerifyEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MantineProvider >
  );
}
