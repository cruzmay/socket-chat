import { UserInterface } from "../interfaces"
import {genSaltSync, hashSync} from "bcrypt"

export const updatePassword = (item: Partial<UserInterface>, password: string):void => {
    const salt = genSaltSync()
    item.password = hashSync( password, salt)
}