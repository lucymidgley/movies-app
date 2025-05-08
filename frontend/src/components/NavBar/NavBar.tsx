import { Autocomplete, Button, Group } from '@mantine/core';
import classes from './HeaderSearch.module.css';
import { FaSearch } from "react-icons/fa";


export function NavBar() {
    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
                    <Autocomplete
                        className={classes.search}
                        placeholder="Search"
                        leftSection={<FaSearch size={16} />}
                        visibleFrom="xs"
                    />
                    <Button >Sign Out</Button>
                </Group>
            </div>
        </header>
    )
}