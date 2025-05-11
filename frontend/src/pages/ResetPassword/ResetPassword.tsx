import {
    Anchor,
    Box,
    Button,
    Center,
    Container,
    Group,
    LoadingOverlay,
    Paper,
    PasswordInput,
    Text,
    Title,
} from '@mantine/core';
import classes from './ResetPassword.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';

export function ResetPassword() {
    const { passwordToken } = useParams()
    const [password, setPassword] = useState<string>('')
    const {
        dispatch,
        state: { error, loading },
    } = useAppContext();
    const onSubmit = () => {
        if (!password) return
        dispatch({ type: "RESET_PASSWORD", password, passwordToken: passwordToken || '' });
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
                    Reset Password
                </Title>
                <Text c="dimmed" fz="sm" ta="center">
                    Enter your new password
                </Text>

                <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                    <PasswordInput label="Password" placeholder="Your password" required mt="md" radius="md" value={password} onChange={e => setPassword(e.target.value)} />
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