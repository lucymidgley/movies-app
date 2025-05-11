import {
  Anchor,
  Button,
  Container,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from '../SignIn/SignIn.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';

export function Register() {
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const {
    dispatch,
    state: { error, loading },
  } = useAppContext();

  useEffect(() => () => dispatch({ type: "CLEAN_ALL" }), [dispatch]);

  const onSubmit = () => {
    if (!email || !password || !name) return
    dispatch({ type: "SIGN_UP", email, password, name });
  }

  return (
    <Container size={420} my={40}>
      {error && <ErrorMessage error={error} />}
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'pink', type: 'bars' }}
      />
      <Title ta="center" className={classes.title}>
        Welcome!
      </Title>

      <Text className={classes.subtitle}>
        Already have an account? <Anchor component={Link} to="/">Sign in</Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <TextInput label="Name" placeholder="Jane Smith" required radius="md" value={name} onChange={e => setName(e.target.value)} />
        <TextInput label="Email" placeholder="your@email.com" required radius="md" value={email} onChange={e => setEmail(e.target.value)} />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" radius="md" value={password} onChange={e => setPassword(e.target.value)} />
        <Button type='submit' fullWidth mt="xl" radius="md" onClick={onSubmit}>
          Sign up
        </Button>
      </Paper>
    </Container>
  );
}