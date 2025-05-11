import { Button, Group, Image, Rating, Text, TextInput, Title } from '@mantine/core';
import classes from './ShowMovie.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { useFavouritesContext } from '@/contexts/FavouritesContext';
import { NotFound } from '../NotFound/NotFound';
import { HeartButton } from '@/components/MoviesTable/HeartButton';

export function MovieShow() {
    const { movie_id } = useParams()
    const id = movie_id && Number(movie_id)
    const {
        state: { movies, user },
    } = useAppContext();
    const { state: { favourites } } = useFavouritesContext()
    const navigate = useNavigate()
    const movie = id ? movies.find(m => m.id === id) : undefined
    if (!movie) {
        return <NotFound />
    }
    return (
        <div className={classes.wrapper}>
            <div className={classes.body}>
                <Title className={classes.title}>{movie.title}</Title>
                <Text fw={500} fz="lg" mb={5}>
                    {movie.director}
                </Text>
                <Text fw={500} fz="lg" mb={5}>
                    {movie.year}
                </Text>
                <Rating count={10} color='blue' value={movie.rating} readOnly />
                <Text fz="sm" c="dimmed">
                    {movie.description}
                </Text>
                <HeartButton movie_id={movie.id} />

                {!!user ? (
                    <Group>
                        <Button onClick={() => navigate(`/movies/${movie.id}/update`)} radius="md" size="md">
                            Edit
                        </Button>
                        <Button onClick={() => navigate(-1)} variant='outline' radius="md" size="md">
                            Back
                        </Button>
                    </Group>) : (
                    <Button radius="md" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                )}
            </div>
            <Image src={movie.image} className={classes.image} />
        </div>
    );
}