import { User } from "../models/User"

export const emailExist = async (email: string):Promise<void> => {
    const emailExist = await User.findOne({email})

    if(emailExist) {
      throw new Error(`${email} is already taken`)
    }
  }