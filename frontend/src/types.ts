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
export type SignInResponse = {
   user: User
   token: string
}