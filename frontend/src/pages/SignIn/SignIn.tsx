import {
    Anchor,
    Button,
    Checkbox,
    Container,
    Group,
    Paper,
    PasswordInput,
    Text,
    TextInput,
    Title,
  } from '@mantine/core';
  import classes from './SignIn.module.css';
import { Link } from 'react-router-dom';
  
  export function SignIn() {
    return (
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
  
        <Text className={classes.subtitle}>
          Do not have an account yet? <Anchor component={Link} to="/register">Create account</Anchor>
        </Text> 
  
        <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required radius="md" />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" radius="md" />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component={Link} size="sm" to="/forgot-password">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" radius="md">
            Sign in
          </Button>
        </Paper>
      </Container>
    );
  }