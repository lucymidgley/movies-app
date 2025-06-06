export type User = {
    id: number
    email: string
    name: string
}
export type UserCreateParams = {
    email: string
    name: string
    password: string
}
export type Movie = {
    id: number
    title: string
    description: string
    director: string
    rating: number
    year: string
    image: string
}
export type MovieCreateParams = {
    title: string
    description: string
    director: string
    rating: number
    year: string
    image: string
}
export type Favourite = {
    id: number
    user_id: User['id']
    movie_id: Movie['id']
}
export type SignInResponse = {
    user: User
}