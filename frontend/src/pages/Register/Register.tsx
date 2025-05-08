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
  import classes from '../SignIn/SignIn.module.css';
import { Link } from 'react-router-dom';
  
  export function Register() {
    return (
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome!
        </Title>
  
        <Text className={classes.subtitle}>
          Already have an account? <Anchor component={Link} to="/login">Sign in</Anchor>
        </Text>
  
        <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
          <TextInput label="Name" placeholder="Jane Smith" required radius="md" />
          <TextInput label="Email" placeholder="your@email.com" required radius="md" />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" radius="md" />
          <Button fullWidth mt="xl" radius="md">
            Sign up
          </Button>
        </Paper>
      </Container>
    );
  }