import { Router } from "express";
import { loginUser, registerUser, logoutUser, refreshAccessToken} from "../controllers/user.controller.js";
import { checkJWT } from "../middlewares/auth.middlware.js";
const userRouter = Router();

userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/logout').post(checkJWT,logoutUser)
userRouter.route('/refreshAccessToken').post(refreshAccessToken)


export {userRouter}