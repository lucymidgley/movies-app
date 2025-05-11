import {
    Box,
    Burger,
    Button,
    Drawer,
    Group,
    ScrollArea,
} from '@mantine/core';
import classes from './NavBar.module.css';
import { LuPopcorn } from "react-icons/lu";
import { useAppContext } from '@/contexts/AppContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { useDisclosure } from '@mantine/hooks';


export function NavBar() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
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
                    <span role="button" className={classes.home} onClick={() => navigate('/')}><LuPopcorn /> Film Finder</span>

                    <Group visibleFrom="sm">
                        {!!user ? (
                            <Button onClick={onSignOut}>Sign Out</Button>
                        ) : (
                            <>
                                <Button variant="default" onClick={() => navigate('/login')}>Log in</Button>
                                <Button onClick={() => navigate('/register')}>Sign up</Button>
                            </>)}
                        <ColorSchemeToggle />
                    </Group>
                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>
            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title={<span className={classes.home} ><LuPopcorn /> Film Finder</span>}
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h="calc(100vh - 80px" mx="-md">
                    <Group justify="center" grow pb="xl" px="md">
                        {!!user ? (
                            <Button onClick={() => {
                                toggleDrawer()
                                onSignOut()
                            }}>Sign Out</Button>
                        ) : (
                            <>
                                <Button variant="default" onClick={() => {
                                    navigate('/login')
                                    toggleDrawer()
                                }}>Log in</Button>
                                <Button onClick={() => {
                                    navigate('/register')
                                    toggleDrawer()
                                }}>Sign up</Button>
                            </>)}
                        <ColorSchemeToggle />
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}