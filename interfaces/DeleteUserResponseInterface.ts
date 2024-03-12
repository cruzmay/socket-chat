import { UserInterface } from "./UserInterface";

export interface DeleteUserResponseInterface {
    user?: UserInterface | undefined | null,
    userAuth?: UserInterface | undefined | null,
    msg?: string
}