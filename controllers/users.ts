import { Response, Request } from "express";
import { User } from "../models/User";
import { updatePassword } from "../helpers";
import {
  UserInterface,
  GetUsersResponseInterface,
  GetUsersReqQuerysInt,
  PutUsersRequestParams,
  PutUserRequestBody,
  PutUserResponseInterface,
  PostUserRequestBody,
  DeleteUserRequestParams,
  DeleteUserResponseInterface,
  PostUserResponseInterface,
  RequestInterface
} from "../interfaces";

const usersGet = async (
  req: Request<{}, any, any, GetUsersReqQuerysInt>,
  res: Response<GetUsersResponseInterface>
): Promise<void> => {
  const { limit, from } = req.query;

  const query: Partial<UserInterface> = { active: true };

  const [count, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({ count, users });
};

const usersPut = async (
  req: Request<PutUsersRequestParams, {}, PutUserRequestBody, {}>,
  res: Response<PutUserResponseInterface | undefined | null>
): Promise<void> => {
  const id: string | undefined = req.params.id;
  const { _id, password, google, ...rest } = req.body;

  if (password) {
    updatePassword(rest, password);
  }

  const usuario = await User.findByIdAndUpdate(id, rest);

  res.json(usuario);
};
const usersPost = async (
  req: Request<{}, {}, PostUserRequestBody>,
  res: Response<PostUserResponseInterface>
): Promise<void> => {
  const { name, email, role, password } = req.body;
  const user = new User<PostUserRequestBody>({ name, email, role, password });

  updatePassword(user, password);

  await user.save();

  res.status(201).json(user);
};
const usersDelete = async (
  req: RequestInterface<DeleteUserRequestParams>,
  res: Response<DeleteUserResponseInterface | undefined | null>
) => {
  const { id } = req.params;
  const uid = req.uid
  const userAuth = req.user
  if(id !== uid ) {
    const user = await User.findByIdAndUpdate<UserInterface>(id, {
      active: false,
    });
    res.json({user, userAuth});
  } else {
     return res.status(401).json({ msg: "Users can't remove theyself" })
  }
};

export { usersGet, usersPut, usersPost, usersDelete };
