import { UserRoleEnum } from "../interfaces"
import { Role } from "../models/role"

export const isRoleValid = async (role: UserRoleEnum):Promise<void> => {
    const rolExist = await Role.findOne({role})
    if(!rolExist) {
      throw new Error(`${role} rol is not registered in the DB`)
    }
  }