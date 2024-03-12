import { User } from "../models/User"

export const userExist = async (id: string):Promise<void> => {
  const user = await User.findById(id)
  if(!user) {
    throw new Error(`user: ${id} do not exist`)
  }
}
