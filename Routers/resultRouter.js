import { Router } from "express";
import { resultpost } from "../Controllers/resultController";

const resultRouter = Router();
resultRouter.post("/poll/:id/result", resultpost);


export default resultRouter;