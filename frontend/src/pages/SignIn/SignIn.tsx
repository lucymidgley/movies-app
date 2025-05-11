import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './SignIn.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';

export function SignIn() {
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const {
    dispatch,
    state: { error, loading },
  } = useAppContext();

  useEffect(() => () => dispatch({ type: "CLEAN_ALL" }), [dispatch]);

  const onSubmit = () => {
    if (!email || !password) return
    dispatch({ type: "SIGN_IN", email, password });
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
        Welcome back!
      </Title>

      <Text className={classes.subtitle}>
        Do not have an account yet? <Anchor component={Link} to="/register">Create account</Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required radius="md" value={email} onChange={e => setEmail(e.target.value)} />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" radius="md" value={password} onChange={e => setPassword(e.target.value)} />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component={Link} size="sm" to="/forgot-password">
            Forgot password?
          </Anchor>
        </Group>
        <Button type='submit' fullWidth mt="xl" radius="md" onClick={onSubmit}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}