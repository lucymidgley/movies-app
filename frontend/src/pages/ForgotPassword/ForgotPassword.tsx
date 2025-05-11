import {
    Anchor,
    Box,
    Button,
    Center,
    Container,
    Group,
    LoadingOverlay,
    Paper,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import classes from './ForgotPassword.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';

export function ForgotPassword() {
    const [email, setEmail] = useState<string>('')
    const {
        dispatch,
        state: { error, loading },
    } = useAppContext();
    const onSubmit = () => {
        if (!email) return
        dispatch({ type: "FORGOT_PASSWORD", email });
    }
    return (
        <>
            {error && <ErrorMessage error={error} />}
            <Container size={460} my={30}>
                <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                    loaderProps={{ color: 'pink', type: 'bars' }}
                />
                <Title className={classes.title} ta="center">
                    Forgot your password?
                </Title>
                <Text c="dimmed" fz="sm" ta="center">
                    Enter your email to get a reset link
                </Text>

                <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                    <TextInput label="Your email" placeholder="me@email.dev" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Group justify="space-between" mt="lg" className={classes.controls}>
                        <Anchor c="dimmed" size="sm" className={classes.control}>
                            <Center inline>
                                <FaArrowLeft size={12} />
                                <Box ml={5}> <Anchor component={Link} to="/">Return to home</Anchor></Box>
                            </Center>
                        </Anchor>
                        <Button onClick={onSubmit} className={classes.control}>Reset password</Button>
                    </Group>
                </Paper>
            </Container>
        </>
    );
}