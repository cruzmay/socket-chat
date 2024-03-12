import { Schema, model  } from "mongoose"
import { UserRoleEnum } from "../interfaces"

const userRole = new Schema<UserRoleEnum>({
    role: {
        type: String,
        required: [ true, "role not valid"]
    }
})

export const Role = model("role", userRole)