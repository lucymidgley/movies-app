import { Anchor, Button, Container, Group, Text, Title } from '@mantine/core';
import classes from './VerifyEmail.module.css';
import { Link } from 'react-router-dom';

export function VerifyEmail() {
    return (
        <Container className={classes.root}>
            <div className={classes.label}>Email Verified!</div>
            <Group justify="center">
                <Anchor component={Link} to="/">Return to home</Anchor>
            </Group>
        </Container>
    );
}