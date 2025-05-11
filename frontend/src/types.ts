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
export type SignInResponse = {
    user: User
    token: string
}