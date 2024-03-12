import { UserInterface } from "./UserInterface"

export interface GetUsersResponseInterface {
    count: number
    users: UserInterface[]
}