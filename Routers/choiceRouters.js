import { Router } from "express";
import { choiceget, choicepost } from "../Controllers/choiceController.js";
import choicePostmiddleware from "../Middlewares/choiceMiddleware.js";

const choiceRouter = Router();
choiceRouter.post("/choice", choicePostmiddleware, choicepost);
choiceRouter.get("/poll/:id/choice", choiceget);

export default choiceRouter;