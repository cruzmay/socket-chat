import { Router } from "express";
import { check } from "express-validator";
import { authPost, getValidUser, googleSignIn } from "../controllers";
import { validateFields, validateJWT } from "../middlewares";

const router = Router();

router.post(
  "/login",
  [
    check("email", "should be an email").isEmail(),
    check("password", "password should be entered").notEmpty(),
    validateFields,
  ],
  authPost
);
router.post(
  "/google",
  [
    check("id_token", "should not been empty").notEmpty(),
  ],
  googleSignIn
);
router.get("/", validateJWT, getValidUser)

export { router as authRouter };
