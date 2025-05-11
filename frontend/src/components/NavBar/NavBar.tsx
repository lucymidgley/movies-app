import {
    Box,
    Button,
    Group,
} from '@mantine/core';
import classes from './NavBar.module.css';
import { LuPopcorn } from "react-icons/lu";
import { useAppContext } from '@/contexts/AppContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export function NavBar() {
    const { dispatch, state: { user } } = useAppContext();

    const navigate = useNavigate()
    useEffect(() => () => dispatch({ type: "CLEAN_ALL" }), [dispatch]);

    const onSignOut = () => {
        dispatch({ type: "SIGN_OUT" });
    }

    return (
        <Box pb={5}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <span><LuPopcorn /> Film Finder</span>

                    {!!user ? (<Group visibleFrom="sm">
                        <Button onClick={onSignOut}>Sign Out</Button>
                    </Group>) : (
                        <Group visibleFrom="sm">
                            <Button variant="default" onClick={() => navigate('/login')}>Log in</Button>
                            <Button onClick={() => navigate('/register')}>Sign up</Button>
                        </Group>
                    )}
                </Group>
            </header>
        </Box>
    );
}