import { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import {
    Anchor,
    Button,
    Group,
    keys,
    ScrollArea,
    Table,
    Text,
    TextInput,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useFavouritesContext } from '@/contexts/FavouritesContext';
import { useAppContext } from '@/contexts/AppContext';
import { HeartButton } from './HeartButton';
import { Movie } from '@/types';
import classes from './MoviesTable.module.css'

interface RowData {
    id: number
    description: string
    title: string;
    director: string;
    year: string;
    rating: string;
}

interface ThProps {
    children: React.ReactNode;
    reversed: boolean;
    sorted: boolean;
    onSort: () => void;
}

function filterData(data: Movie[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => (typeof item[key] === 'string' ? item[key].toLowerCase() : item[key].toString()).includes(query))
    );
}

export function MoviesTable() {
    const navigate = useNavigate()
    const { state: { movies } } = useAppContext()
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(movies);

    const { dispatch, state: { favourites } } = useFavouritesContext();
    const { state: { user } } = useAppContext();

    useEffect(() => {
        user && dispatch({ type: "FETCH_FAVOURITES" });
    }, [user]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setFilteredData(filterData(movies, value));
    };

    const rows = filteredData.map((row) => (
        <Table.Tr key={row.title}>
            <Table.Td>{row.title}</Table.Td>
            <Table.Td>{row.director}</Table.Td>
            <Table.Td>{row.year}</Table.Td>
            <Table.Td>{row.rating}</Table.Td>
            {user && <Table.Td><HeartButton movie_id={row.id} /></Table.Td>}
        </Table.Tr>
    ));

    return (
        <ScrollArea p={15}>
            {!user &&
                (<Text className={classes.subtitle}>
                    <Anchor component={Link} to="/login">Sign In</Anchor> to add and choose your favourite movies.
                </Text>)}
            <Group justify="space-between" mt="md">
                <TextInput
                    placeholder="Search by any field"
                    mb="md"
                    leftSection={<FaSearch size={16} />}
                    value={search}
                    onChange={handleSearchChange}
                    w={300}
                    ml={10}
                />
                {user && <Button onClick={() => navigate('/add-movie')} > Add Movie</Button>}
            </Group>
            <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} p={10} layout="fixed">
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th>
                            Name
                        </Table.Th>
                        <Table.Th>
                            Director
                        </Table.Th>
                        <Table.Th>
                            Year
                        </Table.Th>
                        <Table.Th>
                            Rating
                        </Table.Th>
                        {user && <Table.Th />}
                    </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={!!user ? 5 : 4}>
                                <Text fw={500} ta="center">
                                    No movies found.
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </ScrollArea >
    );
}