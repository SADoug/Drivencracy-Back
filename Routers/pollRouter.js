import { Router } from "express";
import { pollget, pollpost } from "../Controllers/pollController.js";
import pollPostmiddleware from "../Middlewares/pollPostmiddleware.js";

const pollRouter = Router();
pollRouter.post("/poll", pollPostmiddleware, pollpost);
pollRouter.get("/poll", pollget);


export default pollRouter;