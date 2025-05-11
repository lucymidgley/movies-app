import {
    Button,
    Checkbox,
    Container,
    Group,
    LoadingOverlay,
    Paper,
    PasswordInput,
    Rating,
    Stack,
    Text,
    Textarea,
    TextInput,
    Title,
} from '@mantine/core';
import classes from './AddMovie.module.css';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { DateValue, YearPicker } from '@mantine/dates';
import { useNavigate, useParams } from 'react-router-dom';

export function AddMovie() {
    const { movie_id } = useParams()
    const id = movie_id && Number(movie_id)
    const {
        dispatch,
        state: { loading, error, movies },
    } = useAppContext();
    const navigate = useNavigate()
    console.log(movies)
    const movie = id ? movies.find(m => m.id === id) : undefined
    console.log(movie, movies)
    const [title, setTitle] = useState<string>(movie?.title || '')
    const [description, setDescription] = useState<string>(movie?.title || '')
    const [director, setDirector] = useState<string>(movie?.description || '')
    const [rating, setRating] = useState<number>(movie?.rating || 0)
    const formattedYear = movie?.year ? (new Date(Number(movie.year), 1, 1)) : undefined
    const [year, setYear] = useState<DateValue | undefined>(formattedYear || undefined)
    const [image, setImage] = useState<string>(movie?.image || '')

    useEffect(() => () => dispatch({ type: "CLEAN_ALL" }), [dispatch]);

    const onSubmit = () => {
        if (!title || !description) return
        if (!!movie) {
            dispatch({ type: "UPDATE_MOVIE", movie: { ...movie, title, description, director, rating, year: year && year.toString().substring(0, 4) || '', image } });
        }
        else {
            dispatch({ type: "ADD_MOVIE", title, description, director, rating, year: year && year.toString().substring(0, 4) || '', image });
        }
    }

    return (
        <Container size={420} my={40}>
            {error && <ErrorMessage error={error} />}
            <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'pink', type: 'bars' }}
            />
            <Title ta="center" className={classes.title}>
                {!!movie ? 'Update' : 'Add'} Movie
            </Title>

            {!movie && (<Text className={classes.subtitle}>
                Fill in the form to add a new movie.
            </Text>)}

            <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
                <Stack justify="space-between" pb={10}>
                    <TextInput label="Movie Title" placeholder="Movie title" required radius="md" value={title} onChange={e => setTitle(e.target.value)} />
                    <Textarea label="Description" placeholder="Description" required radius="md" value={description} onChange={e => setDescription(e.target.value)} />
                    <TextInput label="Director" placeholder="Director" radius="md" value={director} onChange={e => setDirector(e.target.value)} />
                    <YearPicker value={year} onChange={setYear} />
                    <TextInput label="Image" placeholder="Image URL" radius="md" value={image} onChange={e => setImage(e.target.value)} />
                    <Group>
                        <span>Rating</span>
                        <Rating value={rating} onChange={setRating} count={10} color='indigo' />
                    </Group>
                </Stack>
                <Group >
                    <Button type='submit' radius="md" onClick={onSubmit}>
                        {!!movie ? 'Update' : 'Add Movie'}
                    </Button>
                    <Button radius="md" onClick={() => navigate(-1)}>
                        Cancel
                    </Button>
                </Group>
            </Paper>
        </Container>
    );
}