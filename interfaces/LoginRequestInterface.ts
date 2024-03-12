import { UserInterface } from "./UserInterface";

export interface LoginRequestInterface extends Pick<UserInterface, "email"|"password"> {}