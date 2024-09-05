
export interface UserCreate {
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly phone?: string
}