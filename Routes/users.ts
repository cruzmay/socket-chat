import { Router } from "express"
import {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
} from "../controllers"
import { check } from "express-validator"

import {validateFields, validateJWT, hasRole}  from "../middlewares"
import { isRoleValid, emailExist, userExist } from "../helpers"
import { UserRoleEnum } from "../interfaces"

const router = Router();

router.get("/", usersGet);
router.put("/:id",[
  check("id", "is not a valid ID").isMongoId(),
  check("id").custom(userExist),
  check("email").custom(emailExist),
  validateFields
], usersPut);
router.post("/",[
  check("name", "name is required").not().isEmpty(),
  check("email", "not valid email").isEmail(),
  check("email").custom(emailExist),
  check("password", "should be 6 characters length minimum").isLength({ min: 6}),
  check("role").custom(isRoleValid),
  validateFields
], usersPost);
router.delete("/:id",[
  validateJWT,
  hasRole(UserRoleEnum.admin),
  // validateRole,
  check("id", "is not a valid ID").isMongoId(),
  check("id").custom(userExist),
  validateFields
],  usersDelete);

export { router as userRouter }
