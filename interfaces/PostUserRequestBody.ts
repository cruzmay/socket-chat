import { UserInterface } from "./UserInterface";

export interface PostUserRequestBody
  extends Pick<UserInterface, "email" | "name" | "password" | "role"> {}
