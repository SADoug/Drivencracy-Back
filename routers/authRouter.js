import { Router } from "express";
import { postpoll} from "./../controllers/authController.js"

import validatepostpoll from "../middwares/signInValidationMiddware.js";
const authRouter = Router();

authRouter.post("/postpoll", validatepostpoll, postpoll);


export default authRouter;