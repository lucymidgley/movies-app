import { useFavouritesContext } from '@/contexts/FavouritesContext';
import { Movie } from '@/types';
import { UnstyledButton } from '@mantine/core';
import { FC } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export const HeartButton: FC<{ movie_id: Movie['id'] }> = ({ movie_id }) => {
    const { dispatch, state: { favourites } } = useFavouritesContext();
    const favourite = favourites.find(f => f.movie_id === movie_id)
    console.log(favourite, movie_id)
    if (favourite) {
        return (<UnstyledButton onClick={() => dispatch({ type: "DELETE_FAVOURITE", id: favourite.id })}>
            <FaHeart />
        </UnstyledButton>)
    }
    return (
        <UnstyledButton onClick={() => dispatch({ type: "ADD_FAVOURITE", movie_id })} >
            <FaRegHeart />
        </UnstyledButton>)
}
