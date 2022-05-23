import { Router } from "express";
import { votePost } from "../Controllers/voteController.js";
import votePostmiddleware from "../Middlewares/voteMiddleware.js";

const voteRouter = Router();
voteRouter.post("/choice/:id/vote", votePostmiddleware, votePost);

export default voteRouter;