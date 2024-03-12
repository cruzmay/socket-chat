import { sign, verify } from "jsonwebtoken";
import { User } from "../models/User";
import { UserInterface } from "../interfaces";

const generateJWT = (uid: string) => {
  return new Promise((res, rej) => {
    const payload = { uid };
    if (process.env.SECRET) {
      sign(
        payload,
        process.env.SECRET,
        {
          expiresIn: "4h",
        },
        (error, token) => {
          if (error) {
            console.log(error);
            rej("couldn't generate the Token");
          } else {
            res(token);
          }
        }
      );
    }
  });
};
const tsJWT = async (token: string | string[] | undefined) => {
  try {
    if (token && token.length < 10) {
      return null;
    } else {
        const { uid }: any = verify(token as string, process.env.SECRET as string);
        const user: UserInterface | null = await User.findById(uid);
        if (user) {
          if (user.active) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
    }
  } catch (error) {
    return null;
  }
};

export { generateJWT, tsJWT };
