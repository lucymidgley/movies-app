import {
    Box,
    Button,
    Group,
} from '@mantine/core';
import classes from './NavBar.module.css';
import { LuPopcorn } from "react-icons/lu";
import { useAppContext } from '@/contexts/AppContext';
import { useEffect } from 'react';


export function NavBar() {
    const { dispatch } = useAppContext();

    useEffect(() => () => dispatch({ type: "CLEAN_ALL" }), [dispatch]);

    const onSubmit = () => {
        dispatch({ type: "SIGN_OUT" });
    }

    return (
        <Box pb={120}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <LuPopcorn />

                    <Group visibleFrom="sm">
                        <Button onClick={onSubmit}>Sign Out</Button>
                    </Group>
                </Group>
            </header>
        </Box>
    );
}