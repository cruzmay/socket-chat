import { Request, Response } from "express";
import { LoginRequestInterface, UserInterface, UserRoleEnum,GoogleSignInterface } from "../interfaces";
import { User } from "../models/User";
import { compareSync } from "bcrypt";
import { generateJWT, googleVerify } from "../helpers";

const authPost = async (
  req: Request<{}, {}, LoginRequestInterface>,
  res: Response
) => {
  const { email, password } = req.body;
  try {
    const user: UserInterface | null = await User.findOne({ email });
    if (user) {
      const pass = compareSync(password, user.password);
      if (!user.active) {
        return res.status(400).json({ msg: "user not active" });
      }
      if (!pass) {
        return res.status(400).json({ msg: "wrong password" });
      }
      const token = await generateJWT(user._id);
      res.status(201).json({ user, token });
    } else {
      return res.status(400).json({ msg: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Database Error" });
  }
};

const googleSignIn = async (
  req: Request<{}, {}, GoogleSignInterface>,
  res: Response
) => {
  const { id_token } = req.body;
  console.log(id_token)
  try {
    const payload = await googleVerify(id_token);
    console.log({payload})
    if (payload) {
      const { email, name, img } = payload;

      const user = await User.findOne({ email });
      console.log({user})
      if (!user) {
          const newUser = new User({ email, name, img, password: "!!", google: true, role: UserRoleEnum.user });
          newUser.save()
          const token = await generateJWT(newUser._id);
    
          res.json({
            newUser,
            token
          });
      }
      else {
          const token = await generateJWT(user._id);
          res.json({
            user,
            token
          });
      }
    }

  } catch (error) {
    res.status(400).json({
      msg: "Token couldn't be verified",
    });
  }
};
const getValidUser = async (req: Request, res: Response) => {

  try {
    const { user }: any = req;
    console.log("auth", user)
    const token = await generateJWT(user._id);
    res.json({user, token})
  } catch (error) {
    res.status(400).json({msg: "no user found"})
  }
}

export { authPost, googleSignIn, getValidUser };
