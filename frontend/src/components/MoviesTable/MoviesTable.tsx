import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import { HiSelector } from "react-icons/hi";
import {
    Center,
    Group,
    keys,
    ScrollArea,
    Table,
    Text,
    TextInput,
    UnstyledButton,
} from '@mantine/core';
import classes from './TableSort.module.css';

interface RowData {
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

function Th({ children, reversed, sorted, onSort }: ThProps) {
    const Icon = sorted ? (reversed ? FaChevronUp : FaChevronDown) : HiSelector;
    return (
        <Table.Th className={classes.th}>
            <UnstyledButton onClick={onSort} className={classes.control}>
                <Group justify="space-between">
                    <Text fw={500} fz="sm">
                        {children}
                    </Text>
                    <Center className={classes.icon}>
                        <Icon size={16} />
                    </Center>
                </Group>
            </UnstyledButton>
        </Table.Th>
    );
}

function filterData(data: RowData[], search: string) {
    const query = search.toLowerCase().trim();
    return data.filter((item) =>
        keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
    );
}

function sortData(
    data: RowData[],
    payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
    const { sortBy } = payload;

    if (!sortBy) {
        return filterData(data, payload.search);
    }

    return filterData(
        [...data].sort((a, b) => {
            if (payload.reversed) {
                return b[sortBy].localeCompare(a[sortBy]);
            }

            return a[sortBy].localeCompare(b[sortBy]);
        }),
        payload.search
    );
}

const data = [
    {
        "title": "Spirited Away",
        "description": "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
        "director": "Hayao Miyazaki",
        "year": '2001',
        "rating": '9.5'
    },
    {
        "title": "Parasite",
        "description": "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        "director": "Bong Joon-ho",
        "year": '2019',
        "rating": '9.0'
    },
    {
        "title": "The Shawshank Redemption",
        "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        "director": "Frank Darabont",
        "year": '1994',
        "rating": '9.3'
    },
    {
        "title": "Pulp Fiction",
        "description": "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        "director": "Quentin Tarantino",
        "year": '1994',
        "rating": '8.9'
    },
    {
        "title": "Seven Samurai",
        "description": "A poor village under attack by bandits hires seven ronin to protect them.",
        "director": "Akira Kurosawa",
        "year": '1954',
        "rating": '9.1'
    }
];

export function TableSort() {
    const [search, setSearch] = useState('');
    const [sortedData, setSortedData] = useState(data);
    const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
    const [reverseSortDirection, setReverseSortDirection] = useState(false);

    const setSorting = (field: keyof RowData) => {
        const reversed = field === sortBy ? !reverseSortDirection : false;
        setReverseSortDirection(reversed);
        setSortBy(field);
        setSortedData(sortData(data, { sortBy: field, reversed, search }));
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
        setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
    };

    const rows = sortedData.map((row) => (
        <Table.Tr key={row.title}>
            <Table.Td>{row.title}</Table.Td>
            <Table.Td>{row.director}</Table.Td>
            <Table.Td>{row.year}</Table.Td>
            <Table.Td>{row.rating}</Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea>
            <TextInput
                placeholder="Search by any field"
                mb="md"
                leftSection={<FaSearch size={16} />}
                value={search}
                onChange={handleSearchChange}
            />
            <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} layout="fixed">
                <Table.Tbody>
                    <Table.Tr>
                        <Th
                            sorted={sortBy === 'title'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('title')}
                        >
                            Name
                        </Th>
                        <Th
                            sorted={sortBy === 'director'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('director')}
                        >
                            Director
                        </Th>
                        <Th
                            sorted={sortBy === 'year'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('year')}
                        >
                            Year
                        </Th>
                        <Th
                            sorted={sortBy === 'rating'}
                            reversed={reverseSortDirection}
                            onSort={() => setSorting('rating')}
                        >
                            Year
                        </Th>
                    </Table.Tr>
                </Table.Tbody>
                <Table.Tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <Table.Tr>
                            <Table.Td colSpan={Object.keys(data[0]).length}>
                                <Text fw={500} ta="center">
                                    Nothing found
                                </Text>
                            </Table.Td>
                        </Table.Tr>
                    )}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
}