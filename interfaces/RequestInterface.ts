import { Request } from "express";
import { UserInterface } from "./UserInterface";

export interface RequestInterface<T> extends Request {
    uid?: T
    user?: UserInterface
}